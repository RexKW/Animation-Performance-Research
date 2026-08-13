'use client';

import Lottie from 'lottie-react';

interface LottiePlayerProps {
  animationData: any;
}

export default function LottiePlayer({ animationData }: LottiePlayerProps) {
  return (
    <Lottie 
      animationData={animationData} 
      autoplay={true}
      loop={true} 
      style={{ width: 400, height: 200 }} 
    />
  );
}