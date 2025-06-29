import "../styles/globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { TanstackQueryProvider } from "@/components/tanstack-query-provider";
import { SessionProvider } from "@/auth/provider";
import { Toaster } from "sonner";

const Rubyk = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["400"],
  style: ["normal"],
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
      <body className={`${Rubyk.variable} antialiased bg-dark`}>
        <TanstackQueryProvider>
          <SessionProvider>{children}</SessionProvider>
        </TanstackQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
