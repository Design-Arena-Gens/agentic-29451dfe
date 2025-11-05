import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '3D Portfolio ? Full-Stack & Designer',
  description: 'Interactive 3D portfolio using Spline & Rive with admin customisation.',
  openGraph: {
    title: '3D Portfolio ? Full-Stack & Designer',
    description: 'Interactive 3D portfolio using Spline & Rive with admin customisation.',
    type: 'website'
  },
  metadataBase: new URL('https://agentic-29451dfe.vercel.app')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
