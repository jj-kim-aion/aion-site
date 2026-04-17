import { NextRequest, NextResponse } from "next/server";
import { validateAndConsumeToken } from "@/lib/orders";

const BLOB_URL =
  "https://idvgrnhe5bv9ai1w.public.blob.vercel-storage.com/1-eBook-Building-Super-Agents.md.pdf";

const DOWNLOAD_FILENAME = "Building-Super-Agents-Playbook.pdf";

export async function GET(request: NextRequest) {
  try {
    // Extract token from query params
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    // Validate token presence
    if (!token) {
      console.log("⚠️ Download attempt with missing token");
      return NextResponse.json(
        {
          error: "Download link is invalid or missing",
          message: "Please request a new download link from the store page.",
        },
        { status: 401 }
      );
    }

    console.log(`🔍 Validating token: ${token.substring(0, 8)}...`);

    // Validate and consume token (one-time use)
    let tokenData;
    try {
      tokenData = await validateAndConsumeToken(token);
    } catch (validationError) {
      console.error("❌ Token validation error:", validationError);
      
      return NextResponse.json(
        {
          error: "Token validation failed",
          message: "Token validation service is temporarily unavailable. Please try again in a moment.",
        },
        { status: 500 }
      );
    }

    if (!tokenData) {
      console.log(`⚠️ Invalid or expired token: ${token.substring(0, 8)}...`);
      return NextResponse.json(
        {
          error: "Download link has expired or already been used",
          message:
            "Download links expire after 6 hours or after one use. Please request a new download link from the store page.",
        },
        { status: 401 }
      );
    }

    // Log successful download for analytics
    console.log(
        `✅ Download authorized | Email: ${tokenData.customer_email} | Product: ${tokenData.product_id} | Token consumed: ${token.substring(0, 8)}...`
    );

    // Fetch PDF from blob storage
    console.log(`📥 Fetching PDF from blob storage...`);
    
    let upstream;
    try {
      upstream = await fetch(BLOB_URL);
    } catch (fetchError) {
      console.error("❌ Blob storage fetch error:", fetchError);
      return NextResponse.json(
        {
          error: "File temporarily unavailable",
          message: "Unable to retrieve the file. Please try again in a moment or contact support.",
        },
        { status: 502 }
      );
    }

    if (!upstream.ok) {
      console.error(
        `❌ Blob fetch failed: ${upstream.status} ${upstream.statusText}`
      );
      return NextResponse.json(
        {
          error: "File temporarily unavailable",
          message: "We're having trouble accessing the file. Please try again in a few minutes or contact support.",
        },
        { status: 502 }
      );
    }

    console.log(`✅ PDF fetched successfully, streaming to client...`);

    // Set response headers for download
    const headers = new Headers();
    headers.set(
      "Content-Disposition",
      `attachment; filename="${DOWNLOAD_FILENAME}"`
    );
    headers.set("Content-Type", "application/pdf");
    headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    headers.set("X-Download-Email", tokenData.customer_email); // For analytics

    // Forward content-length if upstream provides it
    const contentLength = upstream.headers.get("content-length");
    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    // Stream the blob body directly to the client
    return new NextResponse(upstream.body, {
      status: 200,
      headers,
    });
    
  } catch (error) {
    console.error("❌ Download route error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Something went wrong on our end. Please try again or contact support.",
      },
      { status: 500 }
    );
  }
}
