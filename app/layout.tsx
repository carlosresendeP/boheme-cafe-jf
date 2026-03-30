import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bohemecafe.com.br"),
  title: "Bohème Café | Café e Conforto em Juiz de Fora",
  description: "Bohème Café - Caféteria premium no coração de São Mateus, Juiz de Fora. Onde o conforto encontra a arte do sabor.",
  keywords: ["café", "cafeteria", "são mateus", "juiz de fora", "café especial", "doces", "conforto", "boheme"],
  authors: [{ name: "Bohème Café" }],
  openGraph: {
    title: "Bohème Café | Café e Conforto em Juiz de Fora",
    description: "Bohème Café - Caféteria premium no coração de São Mateus, Juiz de Fora. Onde o conforto encontra a arte do sabor.",
    url: "https://bohemecafe.com.br",
    siteName: "Bohème Café",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bohème Café",
    description: "Bohème Café - Caféteria premium no coração de São Mateus.",
  },
};  

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >

      <body className="min-h-full flex flex-col">
      <Header />
        {children}
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
