'use client';
import { useEffect, useState } from 'react';

export default function SvgCsrPage() {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    // The client fetches the SVG file after page load
    fetch('/Animation2.svg')
      .then((res) => res.text())
      .then((data) => setSvgContent(data));
  }, []);

  return (
    <main>
      <h1>SVG - CSR</h1>
      <div style={{ width: 512, height: 387, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {svgContent ? (
        <div dangerouslySetInnerHTML={{ __html: svgContent }}  className='w-[512px] h-[387px]'/>
      ) : (
        <p>Loading SVG...</p>
      )}
      </div>
      
    </main>
  );
}