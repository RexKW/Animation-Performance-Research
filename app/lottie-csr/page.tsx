'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Ensure the Lottie library itself doesn't try to load on the server
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function LottieCsrPage() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // The client makes a network request for the JSON AFTER initial load
    fetch('/ProgressBar.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  return (
    <main>
      <h1>Lottie - CSR</h1>
      {animationData ? (
        <Lottie animationData={animationData} autoplay={true} loop={true} />
      ) : (
        <p>Loading animation...</p>
      )}
    </main>
  );
}