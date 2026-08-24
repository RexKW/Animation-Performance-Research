export const dynamic = 'force-dynamic';

export default function GifSsrPage() {
  return (
    <main>
      <h1>GIF - SSR</h1>
      {/* 
        Using standard <img> to bypass Next.js image optimization. 
        Next.js will send this tag in the initial HTML.
      */}
      <img src="/Animation2.gif" alt="Progress Bar GIF" width={512} height={387} />
    </main>
  );
}