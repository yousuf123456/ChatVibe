import "./globals.css";

import { StrictMode } from "react";
import { Providers } from "@/components/Providers";
import { Poppins, Nunito, Roboto, Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: "variable",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-nunito",
});

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poppins",
});

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "ChatVibe",
  description: "ChatVibe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StrictMode>
      <html
        lang="en"
        className={`${poppins.variable} ${nunito.variable} ${roboto.variable} ${inter.className}`}
      >
        <body className="h-screen">
          <Providers>{children}</Providers>
        </body>
      </html>
    </StrictMode>
  );
}
