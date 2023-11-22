import type { Metadata } from 'next'
import { Montserrat, NTR } from "next/font/google";
import "./styles/styles.scss"
import Navbar from './components/navBar';
import { Suspense } from 'react';

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: 'Ghibli Websites',
  description: 'Project of using different API with Ghibli Themes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
        {children}
        </Suspense>
        </body>
    </html>
  )
}
