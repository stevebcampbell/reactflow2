import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from '@/components/header';
import { ConditionalLayout } from '@/components/conditional-layout';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next.js + Radix UI + React Flow',
  description:
    'A modern web application starter with beautiful UI components and flow diagrams',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <div className="h-full flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 min-h-0">
            <ConditionalLayout>{children}</ConditionalLayout>
          </div>
        </div>
      </body>
    </html>
  );
}
