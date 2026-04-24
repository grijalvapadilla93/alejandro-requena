import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import { ScrollProvider } from "@/components/scroll-provider";
import { PaintTrail } from "@/components/paint-trail";
import { BfcacheReload } from "@/components/bfcache-reload";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Alejandro Requena | Artista Visual de Jalapa, Guatemala",
  description:
    "Portafolio oficial de Edwin Alejandro Requena Canté. Artista visual jalapaneco, maestro de dibujo y pintura, creador de la academia Art Requena.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate, proxy-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
          })();
        `}} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-surface font-serif">
        <BfcacheReload />
        <PaintTrail />
        <ScrollProvider>
          {children}
        </ScrollProvider>
      </body>
    </html>
  );
}
