"use client";
import Header from "@/components/layout/header";
import LandingPage from "@/components/layout/landingPage";
import Footer from "@/components/layout/footer";
export default function HomePage() {
  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <LandingPage />
      <Footer />
    </div>
  );
}
