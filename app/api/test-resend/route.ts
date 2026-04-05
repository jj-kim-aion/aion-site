import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Diagnostic endpoint to test Resend configuration
 * GET /api/test-resend
 */
export async function GET(request: NextRequest) {
  console.log("🧪 Testing Resend configuration...");
  
  // Check if API key exists
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.error("❌ RESEND_API_KEY is not set in environment");
    return NextResponse.json(
      {
        error: "RESEND_API_KEY not configured",
        message: "Environment variable is missing",
      },
      { status: 500 }
    );
  }
  
  console.log(`✅ RESEND_API_KEY found: ${apiKey.substring(0, 10)}...`);
  
  // Try to send a test email
  try {
    console.log("📧 Attempting to send test email...");
    
    const { data, error } = await resend.emails.send({
      from: "Aion Research <aion@aionresearch.io>",
      to: ["delivered@resend.dev"], // Resend's test inbox
      subject: "Resend Test - Aion Site",
      html: "<p>This is a test email from Aion site to verify Resend configuration.</p>",
    });
    
    if (error) {
      console.error("❌ Resend API error:", error);
      return NextResponse.json(
        {
          error: "Resend API error",
          details: error,
          message: "Check the error details below",
        },
        { status: 500 }
      );
    }
    
    console.log("✅ Test email sent successfully!");
    console.log("Resend email ID:", data?.id);
    
    return NextResponse.json({
      success: true,
      message: "Resend is configured correctly",
      emailId: data?.id,
      details: {
        apiKey: `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}`,
        from: "Aion Research <aion@aionresearch.io>",
        to: "delivered@resend.dev",
      },
    });
    
  } catch (error) {
    console.error("❌ Unexpected error:", error);
    
    return NextResponse.json(
      {
        error: "Unexpected error",
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
