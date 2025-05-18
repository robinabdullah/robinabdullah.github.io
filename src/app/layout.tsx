import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import GradientBackground from '@/components/ui/GradientBackground';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Portfolio | Robin Abdullah',
  description: 'Personal portfolio website showcasing my skills and projects.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <GradientBackground />
        {children}
      </body>
    </html>
  );
}