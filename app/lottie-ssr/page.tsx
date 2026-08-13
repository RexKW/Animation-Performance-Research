import LottiePlayer from '@/components/LottiePlayer';
export const dynamic = 'force-dynamic';
// Import the JSON directly. In App Router, this data gets bundled 
// and sent to the client as hydrated data.
import animationData from '@/public/ProgressBar.json'; 

export default function LottieSsrPage() {
  return (
    <main>
      <h1>Lottie - SSR</h1>
      <LottiePlayer animationData={animationData} /> 
    </main>
  );
}