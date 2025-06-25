"use client";
import Header from "@/components/layout/header";
import LandingPage from "@/components/layout/landingPage";
import Footer from "@/components/layout/footer";
export default function HomePage() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] px-2 overflow-x-hidden min-h-[100dvh]">
      <Header />
      <LandingPage />
      <Footer />
    </div>
  );
}
