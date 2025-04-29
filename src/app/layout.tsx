import type { Metadata } from "next";
import { Anonymous_Pro, Noto_Sans } from "next/font/google";
import "../styles/globals.css";

const anonymousPro = Anonymous_Pro({
  subsets: ["latin"],
  variable: "--font-anonymous-pro",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Task Flow",
  description: "Tasking made simple",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${anonymousPro.variable} ${notoSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
