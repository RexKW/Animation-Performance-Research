'use client';
import dynamic from 'next/dynamic';

// Dynamically import the image tag so it only renders on the client
const CsrGif = dynamic(
  () => Promise.resolve(() => <img src="/ProgressBar.gif" alt="Progress Bar GIF" width={400} height={400} />),
  { ssr: false }
);

export default function GifCsrPage() {
  return (
    <main>
      <h1>GIF - CSR</h1>
      <CsrGif />
    </main>
  );
}