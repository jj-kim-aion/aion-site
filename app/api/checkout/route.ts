import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getProductByInternalId } from "@/lib/data";

export async function POST(request: NextRequest) {
  try {
    const { email, productId } = await request.json();

    if (!email || !productId) {
      return NextResponse.json(
        { error: "Email and Product ID are required" },
        { status: 400 }
      );
    }

    // productId from EmailModal is selectedProduct.id (number)
    const product = await getProductByInternalId(Number(productId));

    if (!product) {
      console.error(`Checkout API: Product with internal ID ${productId} not found.`);
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Use environment variable placeholders as per blueprint
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.product_summary,
            },
            unit_amount: Math.round(product.price * 100), // Stripe expects amounts in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email,
      success_url: `${baseUrl}/checkout/success?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/store?canceled=true`,
      metadata: {
        email,
        productId: product.product_id, // String identifier for metadata
        internalId: product.id.toString(), // Numeric internal ID
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
