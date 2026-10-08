import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Weather Forecast App',
  description: 'Get real-time weather and 5-day forecast',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}