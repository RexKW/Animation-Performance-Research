import fs from 'fs';
import path from 'path';
export const dynamic = 'force-dynamic';

export default function SvgSsrPage() {
  // Read the file securely on the server
  const svgPath = path.join(process.cwd(), 'public', 'Animation2.svg');
  const svgContent = fs.readFileSync(svgPath, 'utf8');

  return (
    <main>
      <h1>SVG - SSR</h1>
      {/* Injects the <svg> tags directly into the initial HTML payload */}
      <div dangerouslySetInnerHTML={{ __html: svgContent }} className='w-[512px] h-[387px]'/>
    </main>
  );
}