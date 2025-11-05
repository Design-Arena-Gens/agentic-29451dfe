"use client";
import { useRef } from 'react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';

export function RiveShowcase({ riveUrl }: { riveUrl: string }) {
  const { RiveComponent } = useRive({
    src: riveUrl,
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center })
  });

  return (
    <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5">
      <RiveComponent />
    </div>
  );
}
