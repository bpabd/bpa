// src/app/layout.js


'use client'


import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import { SessionProvider } from 'next-auth/react'

// export const metadata = {
//   title: 'Broadcast Producers Association',
//   description: 'The premier association for broadcast professionals in Bangladesh',
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <SessionProvider>
          {children}
          </SessionProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}