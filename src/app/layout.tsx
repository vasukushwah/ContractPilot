import type { Metadata } from "next";
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import ReduxProvider from '@/components/ReduxProvider';
import store from '@/store';


const geistSans = Geist({
    variable: '--font-geist-sans', 
    subsets: ['latin'],
  });
  
  const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
  });

export const metadata: Metadata = {
    title: "ContractPilot - Streamline Your Contracts",
    description:
        "Generate and manage contracts effortlessly with ContractPilot. Create, edit, and download contracts with ease.",
    keywords: [
        "contract",
        "generator",
        "legal",
        "documents",
        "create",
        "edit",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning={true}>        <ReduxProvider>
          {children}
          <Toaster />
        </ReduxProvider>
        </body>
      </html>      
  );
}
