"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CompareDrawer from "@/components/CompareDrawer";
import FloatingButtons from "@/components/FloatingButtons";

export default function AppShell({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);

  return (
    <>
      <Header
        onCartOpen={() => setCartOpen(true)}
        onCompareOpen={() => setCompareOpen(true)}
      />
      <Navigation />

      <main className="bg-body-bg min-h-screen pb-12">
        {children}
      </main>

      <Footer />

      <FloatingButtons
        onCartOpen={() => setCartOpen(true)}
        onCompareOpen={() => setCompareOpen(true)}
      />

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <CompareDrawer isOpen={compareOpen} onClose={() => setCompareOpen(false)} />
    </>
  );
}
