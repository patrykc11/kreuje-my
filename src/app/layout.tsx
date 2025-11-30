import type { Metadata } from "next";
import { Open_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kreuje.MY - Projektowanie Wnętrz",
  description: "Profesjonalne projektowanie wnętrz - tworzymy przestrzenie, w których możesz się rozwijać",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${openSans.variable} ${playfairDisplay.variable} antialiased bg-white`}
      >
        <div className="min-h-screen p-3 md:p-5 lg:p-8">
          <div className="w-full min-h-[calc(100vh-1.5rem)] md:min-h-[calc(100vh-2.5rem)] lg:min-h-[calc(100vh-4rem)] rounded-[82px] overflow-hidden border-2 border-amber-800">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
