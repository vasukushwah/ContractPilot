import type { Metadata } from 'next';
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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const metadata: Metadata = {
    title: 'ContractPilot - Streamline Your Contracts',
    description: 'Generate and manage contracts effortlessly with ContractPilot. Create, edit, and download contracts with ease.',
    keywords: ['contract', 'generator', 'legal', 'documents', 'create', 'edit'],
  };

  return (
   
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning={true}>
        <ReduxProvider>
          {children}
          <Toaster />
        </ReduxProvider>
        </body>
      </html>
  );
}
