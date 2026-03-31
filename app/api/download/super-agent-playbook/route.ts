import { NextResponse } from "next/server";

const BLOB_URL =
  "https://idvgrnhe5bv9ai1w.public.blob.vercel-storage.com/1-eBook-Building-Super-Agents.md.pdf";

const DOWNLOAD_FILENAME = "Building-Super-Agents-Playbook.pdf";

export async function GET() {
  // TODO: Add Stripe/LemonSqueezy payment verification here
  // Example:
  //   const session = await verifyPayment(request);
  //   if (!session.paid) {
  //     return NextResponse.json({ error: "Payment required" }, { status: 402 });
  //   }
  const isVerified = true; // Placeholder — always passes until payment is wired

  if (!isVerified) {
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 402 }
    );
  }

  try {
    const upstream = await fetch(BLOB_URL);

    if (!upstream.ok) {
      console.error(
        `Blob fetch failed: ${upstream.status} ${upstream.statusText}`
      );
      return NextResponse.json(
        { error: "File temporarily unavailable" },
        { status: 502 }
      );
    }

    const headers = new Headers();
    headers.set(
      "Content-Disposition",
      `attachment; filename="${DOWNLOAD_FILENAME}"`
    );
    headers.set("Content-Type", "application/pdf");

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
    console.error("Download route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
