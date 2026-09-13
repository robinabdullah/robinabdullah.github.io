import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import GradientBackground from '@/components/ui/GradientBackground';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Abdullah Saleh Robin - Senior Backend & Full-Stack Engineer',
  description: 'Senior Backend & Full-Stack Engineer with nine years building enterprise applications: backend services, REST APIs and data-intensive systems in .NET with C# and in Java with Spring Boot, with React and Angular front-ends, and applied AI in production. Based in Berlin, Germany.',
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