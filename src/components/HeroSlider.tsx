"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { heroBanners, sideBanners } from "@/data/products";

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroBanners.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + heroBanners.length) % heroBanners.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="pt-5">
      <div className="max-w-[1300px] mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_315px] gap-4">
          
          {/* Main Slider */}
          <div className="relative rounded-lg overflow-hidden bg-dark-1 w-full">
            <div
              className="w-full flex transition-transform duration-500"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {heroBanners.map((banner) => (
                <div key={banner.id} className="w-full min-w-full shrink-0">
                  <Link href={banner.href} className="block w-full">
                    <img
                      src={banner.image}
                      alt={banner.alt}
                      width={982}
                      height={500}
                      className="w-full h-auto aspect-[982/500] object-cover block"
                    />
                  </Link>
                </div>
              ))}
            </div>

            {/* Arrows */}
            <button 
              className="absolute top-1/2 -translate-y-1/2 left-3 w-10 h-10 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center cursor-pointer transition-colors z-10" 
              onClick={prev}
            >
              <i className="material-icons">chevron_left</i>
            </button>
            <button 
              className="absolute top-1/2 -translate-y-1/2 right-3 w-10 h-10 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center cursor-pointer transition-colors z-10" 
              onClick={next}
            >
              <i className="material-icons">chevron_right</i>
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {heroBanners.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                    idx === current ? "bg-white scale-120" : "bg-white/50"
                  }`}
                  onClick={() => setCurrent(idx)}
                />
              ))}
            </div>
          </div>

          {/* Side Banners */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
            {sideBanners.map((banner) => (
              <Link 
                key={banner.id} 
                href={banner.href} 
                className="rounded-lg overflow-hidden block w-full hover:shadow-md transition-shadow"
              >
                <img
                  src={banner.image}
                  alt={banner.alt}
                  width={315}
                  height={252}
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-[1.03]"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Marquee */}
        <div className="bg-white py-2.5 mt-3.5 rounded-sm overflow-hidden text-[13px] text-primary font-medium shadow-xs">
          {React.createElement(
            "marquee",
            { direction: "left" },
            "All our branches are open. Additionally, our online activities are open and operational. Call 16793 for any queries."
          )}
        </div>
      </div>
    </section>
  );
}
