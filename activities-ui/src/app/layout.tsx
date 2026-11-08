import type { Metadata } from "next";
import Script from "next/script";
import { Rubik } from "next/font/google";
import Providers from "./Providers";
import "./globals.css";

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "Samurai",
  description: "Samurai operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={rubik.variable}>
      <body className={rubik.className}>
        <Script id="sidebar-collapsed" strategy="beforeInteractive">
          {`try{if(localStorage.getItem("samurai-sidebar-collapsed")==="1")document.documentElement.dataset.sidebar="collapsed"}catch(e){}`}
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
