'use client';
import { useEffect, useState } from 'react';

export default function SvgCsrPage() {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    // The client fetches the SVG file after page load
    fetch('/ProgressBar.svg')
      .then((res) => res.text())
      .then((data) => setSvgContent(data));
  }, []);

  return (
    <main>
      <h1>SVG - CSR</h1>
      {svgContent ? (
        <div dangerouslySetInnerHTML={{ __html: svgContent }} />
      ) : (
        <p>Loading SVG...</p>
      )}
    </main>
  );
}