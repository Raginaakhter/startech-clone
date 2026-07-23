"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { featuredProducts } from "@/data/products";

export default function HappyHourPage() {
  // Target time: 8 hours from now
  const [timeLeft, setTimeLeft] = useState(8 * 3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 8 * 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Only take products that have a discount/oldPrice for Happy Hour page
  const happyHourProducts = featuredProducts.filter((p) => p.oldPrice);

  return (
    <div className="max-w-[1300px] mx-auto px-4 w-full" style={{ minHeight: "80vh" }}>
      {/* Hero Banner */}
      <div className="bg-dark-1 rounded-lg p-8 md:p-12 text-center text-white mt-5 relative overflow-hidden border border-neutral-800 shadow-md">
        <div className="absolute inset-0 opacity-10 bg-radial from-primary to-transparent"></div>
        <div className="relative z-10">
          <span className="bg-primary/20 text-primary border border-primary/30 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            Limited Time Only
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white mt-4 uppercase tracking-tight">
            Happy Hour Deals
          </h1>
          <p className="text-sm md:text-base text-gray-300 mt-2 max-w-[600px] mx-auto">
            Grab these exclusive super deals before the clock runs out! Fresh discounts added every day.
          </p>
          
          {/* Countdown Clock */}
          <div className="mt-8 flex flex-col items-center">
            <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Ends In</span>
            <div className="bg-neutral-900 border border-neutral-800 px-6 py-3 rounded-lg text-2xl md:text-4xl font-mono font-bold text-primary mt-2 shadow-inner tracking-widest">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>

      {/* Products list */}
      <div className="mt-10 mb-12">
        <h3 className="text-lg md:text-xl font-bold mb-6 text-text-main">Exclusive Flash Deals</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {happyHourProducts.map((product) => (
            <div key={product.id} className="relative">
              <span className="absolute top-2 right-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full z-10 uppercase tracking-wider shadow-sm">
                Flash
              </span>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
