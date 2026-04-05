import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createToken } from "@/lib/tokens";
import { getDownloadEmailHTML, getDownloadEmailText } from "@/lib/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

// Product metadata for email customization
const PRODUCT_NAMES: Record<string, string> = {
  "super-agent-playbook": "Building Super Agents Playbook",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, productId } = body;

    // Validation
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Valid email address is required" },
        { status: 400 }
      );
    }

    if (!productId || typeof productId !== "string") {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const productName = PRODUCT_NAMES[productId];
    if (!productName) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Generate secure token
    const token = createToken(email, productId);

    // Build download URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` :
                    "http://localhost:3000";
    
    const downloadUrl = `${baseUrl}/api/download/super-agent-playbook?token=${token}`;

    // Send email via Resend
    try {
      const { data, error } = await resend.emails.send({
        from: "Aion Research <aion@aionresearch.io>",
        to: [email],
        replyTo: "tech@aionresearch.io",
        subject: "Your Aion Super Agents Playbook Download",
        html: getDownloadEmailHTML(productName, downloadUrl, email),
        text: getDownloadEmailText(productName, downloadUrl, email),
      });

      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json(
          { error: "Failed to send email. Please try again." },
          { status: 500 }
        );
      }

      console.log(`Download link sent to ${email} | Token: ${token} | Resend ID: ${data?.id}`);

      return NextResponse.json({
        success: true,
        message: "Download link sent to your email",
      });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      return NextResponse.json(
        { error: "Failed to send email. Please check your email address and try again." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Request link error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
