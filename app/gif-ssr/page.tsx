export default function GifSsrPage() {
  return (
    <main>
      <h1>GIF - SSR</h1>
      {/* 
        Using standard <img> to bypass Next.js image optimization. 
        Next.js will send this tag in the initial HTML.
      */}
      <img src="/ProgressBar.gif" alt="Progress Bar GIF" width={400} height={400} />
    </main>
  );
}