import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createDownloadToken } from "@/lib/orders";
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

    // Generate secure token in Supabase
    let token: string;
    try {
      console.log(`📝 Creating token for ${email}...`);
      // For manual requests, we don't have an order ID, so we use "MANUAL"
      const tokenData = await createDownloadToken("MANUAL", email, productId);
      token = tokenData.token;
      console.log(`✅ Token created successfully: ${token.substring(0, 8)}...`);
    } catch (tokenError) {
      console.error("❌ Token creation failed:", tokenError);
      
      return NextResponse.json(
          {error: "Failed to generate download link. Please try again in a moment."},
        { status: 500 }
      );
    }

    // Build download URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` :
                    "http://localhost:3000";
    
    const downloadUrl = `${baseUrl}/api/download/super-agent-playbook?token=${token}`;

    // Send email via Resend
    try {
      console.log(`📧 Sending download email to ${email}...`);
      
      const { data, error } = await resend.emails.send({
        from: "Aion Research <research@aionlabs.io>",
        to: [email],
        replyTo: "research@aionlabs.io",
        subject: "Your Aion Super Agents Playbook Download",
        html: getDownloadEmailHTML(productName, downloadUrl, email, "MANUAL"),
        text: getDownloadEmailText(productName, downloadUrl, email, "MANUAL"),
      });

      if (error) {
        console.error("❌ Resend error:", JSON.stringify(error, null, 2));
        
        // Return detailed error for debugging
        return NextResponse.json(
          { 
            error: "Failed to send email", 
            message: error.message || "Unknown Resend error",
            details: error,
            hint: "Check Resend dashboard for domain verification and API key permissions"
          },
          { status: 500 }
        );
      }

      console.log(`✅ Email sent successfully | Recipient: ${email} | Token: ${token.substring(0, 8)}... | Resend ID: ${data?.id}`);

      // Return success response
      return NextResponse.json({
        success: true,
        message: "Download link sent to your email",
        token, // Useful for testing
        downloadUrl, // For direct testing
      });
      
    } catch (emailError) {
      console.error("❌ Email sending error:", emailError);
      return NextResponse.json(
        { error: "Failed to send email. Please check your email address and try again." },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error("❌ Request link error:", error);
    
    // Handle JSON parsing errors specifically
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
