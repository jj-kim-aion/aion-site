import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-edge">
      <div className="text-center">
        <p className="font-mono text-caption text-mirai-glow/60 mb-4">
          // 404
        </p>
        <h1 className="text-display-lg font-light mb-4">
          Signal lost
        </h1>
        <p className="text-body-md text-ash mb-10">
          This page doesn&rsquo;t exist — or hasn&rsquo;t been built yet.
        </p>
        <Link href="/" className="btn-primary">
          <span>Return to base</span>
        </Link>
      </div>
    </div>
  );
}
