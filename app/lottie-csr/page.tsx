'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Ensure the Lottie library itself doesn't try to load on the server
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function LottieCsrPage() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // The client makes a network request for the JSON AFTER initial load
    fetch('/Animation2.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  return (
    <main className='flex flex-col justify-center items-center'>
      <h1 className='text-4xl'>Lottie - CSR</h1>
      <div style={{ width: 512, height: 387, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {animationData ? (
          <Lottie animationData={animationData} autoplay loop style={{ width: 512, height: 387 }} />
        ) : (
          <p>Loading animation...</p>
        )}
      </div>
    </main>
  );
}