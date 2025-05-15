import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Dino Store",
  description: "Na Dino Store, você encontra camisetas exclusivas e criativas com estampas de dinossauros para todos os gostos, dos ferozes T-Rex aos simpáticos estegossauros. Qualidade, conforto e muita personalidade em cada peça.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}