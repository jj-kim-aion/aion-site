import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { Resend } from "resend";
import { createDownloadToken, createOrder, generateOrderId } from "@/lib/orders";
import { getDownloadEmailHTML, getDownloadEmailText } from "@/lib/email-template";
import { getProductByInternalId } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import Stripe from "stripe";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const {email, productId, internalId} = session.metadata || {};
    console.log(`🔔 Received checkout.session.completed event for email ${email}`);

    if (!email || !productId) {
      console.error("Missing metadata in checkout session:", session.id);
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    // Fetch product from Supabase using internalId if available, fallback to productId (string identifier)
    let product = null;
    if (internalId) {
      product = await getProductByInternalId(Number(internalId));
    }

    // Secondary fallback to string identifier if internalId didn't work
    if (!product) {
      const {data, error} = await supabase
          .from("products")
          .select("*")
          .eq("product_id", productId)
          .single();
      if (data) product = data;
    }

    if (!product) {
      console.error("Product not found for webhook:", productId, internalId);
      return NextResponse.json({error: "Product not found"}, {status: 400});
    }

    try {
      // 1. Create Order in Supabase
      const orderId = generateOrderId();
      const order = await createOrder({
        order_id: orderId,
        stripe_session_id: session.id,
        customer_email: email,
        product_id: product.product_id,
        product_ref_id: product.id, // Use the bigint ID for fast joins
        amount_total: session.amount_total || 0,
        currency: session.currency || "usd",
        status: "completed",
      });

      // 2. Generate secure token in Supabase
      const tokenData = await createDownloadToken(
          orderId,
          email,
          product.product_id,
          order.id,
          product.id
      );
      const token = tokenData.token;

      // Build download URL
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

      const downloadUrl = `${baseUrl}/api/download/${product.product_id}?token=${token}`;

      // Send email
      console.log(`📧 Sending fulfillment email to ${email}...`);
      const { data, error: emailError } = await resend.emails.send({
        from: "Aion Research <research@aionlabs.io>",
        to: [email],
        subject: `Your ${product.name} Download`,
        html: getDownloadEmailHTML(product.name, downloadUrl, email, orderId),
        text: getDownloadEmailText(product.name, downloadUrl, email, orderId),
      });

      if (emailError) {
        console.error(`❌ Resend error for ${email}:`, emailError);
        // We throw to trigger the 500 and potentially a Stripe retry
        throw new Error(`Email failed: ${JSON.stringify(emailError)}`);
      }

      console.log(`✅ Fulfillment complete for ${email}. Message ID: ${data?.id}`);
    } catch (error) {
      console.error("❌ Error in fulfillment logic:", error);
      return NextResponse.json({ error: "Fulfillment failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
