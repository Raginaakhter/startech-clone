"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { featuredProducts } from "@/data/products";
import { useApp } from "@/context/AppContext";

const BUDGET_OPTIONS = [
  { label: "Up to 40,000৳", maxPrice: 40000 },
  { label: "Up to 50,000৳", maxPrice: 50000 },
  { label: "Up to 60,000৳", maxPrice: 60000 },
  { label: "Up to 80,000৳", maxPrice: 80000 },
  { label: "Up to 100,000৳", maxPrice: 100000 },
  { label: "Up to 150,000৳", maxPrice: 150000 },
  { label: "Up to 200,000৳", maxPrice: 200000 },
  { label: "Above 200,000৳", maxPrice: 9999999 },
];

const PROCESSOR_OPTIONS = [
  { label: "Intel Core i3 / i5 / i7 / i9", keyword: "intel" },
  { label: "AMD Ryzen 3 / 5 / 7", keyword: "ryzen" },
  { label: "Apple M-Series (M1 / M2 / M3 / M4)", keyword: "macbook" },
  { label: "No Preference (Any Processor)", keyword: "all" },
];

const USAGE_OPTIONS = [
  { label: "Daily Office & Study Work", keyword: "slim" },
  { label: "Gaming & Heavy Graphics", keyword: "gaming" },
  { label: "Slim & Lightweight Ultrabook", keyword: "ultrabook" },
  { label: "Professional Content Creation & Video Editing", keyword: "pro" },
  { label: "All Types", keyword: "all" },
];

const SCREEN_OPTIONS = [
  { label: '13.3" to 14" (Compact & Portable)', size: "14" },
  { label: '15.6" (Standard Size)', size: "15.6" },
  { label: '16" to 17.3" (Large Display)', size: "16" },
  { label: "Any Screen Size", size: "all" },
];

const BRAND_OPTIONS = [
  { label: "Lenovo", brand: "lenovo" },
  { label: "ASUS", brand: "asus" },
  { label: "HP", brand: "hp" },
  { label: "MSI", brand: "msi" },
  { label: "Acer", brand: "acer" },
  { label: "Dell", brand: "dell" },
  { label: "Apple MacBook", brand: "macbook" },
  { label: "All Brands", brand: "all" },
];

export default function LaptopFinderPage() {
  const router = useRouter();
  const { addToCart } = useApp();

  // Active Wizard Step (1 to 5)
  const [currentStep, setCurrentStep] = useState(1);

  // Selected filters
  const [selectedBudgetIndex, setSelectedBudgetIndex] = useState(2); // default Up to 60,000৳
  const [selectedProcessor, setSelectedProcessor] = useState("all");
  const [selectedUsage, setSelectedUsage] = useState("all");
  const [selectedScreen, setSelectedScreen] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");

  const [showResults, setShowResults] = useState(false);

  // Laptop products dataset
  const laptopProducts = useMemo(() => {
    // Generate an extended list of laptop models for realistic finder output
    const rawLaptops = featuredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes("laptop") ||
        p.name.toLowerCase().includes("macbook") ||
        p.name.toLowerCase().includes("ideapad") ||
        p.name.toLowerCase().includes("vivobook") ||
        p.name.toLowerCase().includes("tuf")
    );

    // If dataset has few laptops, generate fallback laptops to provide rich results
    const fullList = [
      ...rawLaptops,
      {
        id: 101,
        name: "Lenovo IdeaPad Slim 3 15IRU8 Core i5 13th Gen 15.6\" FHD Laptop",
        price: 56999,
        oldPrice: 62000,
        image: "https://www.startech.com.bd/image/cache/catalog/laptop/lenovo/ideapad-slim-3-15iru8/ideapad-slim-3-15iru8-01-200x200.webp",
        href: "/lenovo-ideapad-slim-3-15iru8",
      },
      {
        id: 102,
        name: "HP 15s-eq2143au Ryzen 5 5625U 15.6\" FHD Laptop",
        price: 48500,
        oldPrice: 52000,
        image: "https://www.startech.com.bd/image/cache/catalog/laptop/hp/15s-eq2143au/15s-eq2143au-01-200x200.webp",
        href: "/hp-15s-eq2143au-laptop",
      },
      {
        id: 103,
        name: "ASUS Vivobook 15 X1504VA Core i5 13th Gen 15.6\" FHD Laptop",
        price: 59500,
        oldPrice: 63000,
        image: "https://www.startech.com.bd/image/cache/catalog/laptop/asus/vivobook-15-x1504va/vivobook-15-x1504va-01-200x200.webp",
        href: "/asus-vivobook-15-laptop",
      },
      {
        id: 104,
        name: "Acer Aspire 3 A315-24P AMD Ryzen 5 7520U 15.6\" FHD Laptop",
        price: 44999,
        oldPrice: 49000,
        image: "https://www.startech.com.bd/image/cache/catalog/laptop/acer/aspire-3-a315-24p/aspire-3-a315-24p-01-200x200.webp",
        href: "/acer-aspire-3-laptop",
      },
      {
        id: 105,
        name: "ASUS TUF Gaming A15 FA506NF Ryzen 5 7535HS 15.6\" FHD Laptop",
        price: 62500,
        oldPrice: 67000,
        image: "https://www.startech.com.bd/image/cache/catalog/laptop/asus/tuf-gaming-a15-fa506nf/tuf-gaming-a15-fa506nf-01-200x200.webp",
        href: "/asus-tuf-gaming-a15-fa506nf",
      },
      {
        id: 106,
        name: "Apple MacBook Air 13.3-Inch M1 Chip 8GB RAM 256GB SSD",
        price: 88500,
        oldPrice: 95000,
        image: "https://www.startech.com.bd/image/cache/catalog/laptop/apple/macbook-air-m1/macbook-air-m1-01-200x200.webp",
        href: "/apple-macbook-air-m1",
      },
      {
        id: 107,
        name: "MSI Thin GF63 Core i7 12th Gen RTX 3050 15.6\" 144Hz Gaming Laptop",
        price: 84500,
        oldPrice: 92000,
        image: "https://www.startech.com.bd/image/cache/catalog/laptop/msi/thin-gf63/thin-gf63-01-200x200.webp",
        href: "/msi-thin-gf63-laptop",
      },
      {
        id: 108,
        name: "Dell Vostro 3520 Core i3 12th Gen 15.6\" FHD Laptop",
        price: 41500,
        oldPrice: 45000,
        image: "https://www.startech.com.bd/image/cache/catalog/laptop/dell/vostro-3520/vostro-3520-01-200x200.webp",
        href: "/dell-vostro-3520-laptop",
      },
    ];

    return fullList;
  }, []);

  // Filter laptops based on user criteria
  const matchedLaptops = useMemo(() => {
    const maxB = BUDGET_OPTIONS[selectedBudgetIndex]?.maxPrice || 9999999;

    return laptopProducts.filter((laptop) => {
      // Budget check
      if (laptop.price > maxB) return false;

      // Processor check
      if (selectedProcessor !== "all") {
        if (!laptop.name.toLowerCase().includes(selectedProcessor)) return false;
      }

      // Usage check
      if (selectedUsage !== "all") {
        if (selectedUsage === "gaming" && !laptop.name.toLowerCase().includes("gaming") && !laptop.name.toLowerCase().includes("tuf")) return false;
      }

      // Brand check
      if (selectedBrand !== "all") {
        if (!laptop.name.toLowerCase().includes(selectedBrand)) return false;
      }

      return true;
    });
  }, [laptopProducts, selectedBudgetIndex, selectedProcessor, selectedUsage, selectedBrand]);

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return { prefix: "What's your ", highlight: "budget", suffix: " ?" };
      case 2:
        return { prefix: "Which ", highlight: "processor", suffix: " do you prefer ?" };
      case 3:
        return { prefix: "What will you ", highlight: "use it", suffix: " for ?" };
      case 4:
        return { prefix: "Preferred ", highlight: "screen size", suffix: " ?" };
      case 5:
        return { prefix: "Preferred ", highlight: "brand", suffix: " ?" };
      default:
        return { prefix: "What's your ", highlight: "budget", suffix: " ?" };
    }
  };

  const titleInfo = getStepTitle();
  const formatPrice = (price: number) => price.toLocaleString("en-BD") + "৳";

  return (
    <div className="bg-[#f2f4f8] min-h-screen py-8 font-sans">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Wizard Container Box */}
        <div className="bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-6 md:p-10 shadow-sm max-w-[850px] mx-auto min-h-[580px] flex flex-col justify-between relative">
          
          {/* Header Step Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1e293b]">
              {titleInfo.prefix}
              <span className="text-[#ef4a23] underline decoration-2 decoration-[#ef4a23]/40 underline-offset-4">
                {titleInfo.highlight}
              </span>
              {titleInfo.suffix}
            </h1>

            {/* Progress Stepper Bars */}
            <div className="flex items-center justify-center gap-2 mt-5">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentStep === step
                      ? "w-8 bg-[#3749bb]"
                      : currentStep > step
                      ? "w-8 bg-[#3749bb]/40"
                      : "w-8 bg-[#cbd5e1]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Body Content Area with Side Prev/Next Nav Controls */}
          <div className="relative flex items-center justify-center flex-1 my-4">
            
            {/* Prev Button */}
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className={`absolute left-0 md:-left-16 z-20 w-12 h-14 bg-white rounded-lg shadow-sm border border-[#e2e8f0] flex flex-col items-center justify-center transition-all cursor-pointer ${
                currentStep === 1 ? "opacity-30 cursor-not-allowed" : "hover:border-[#ef4a23] hover:shadow-md"
              }`}
            >
              <svg className="w-5 h-5 text-[#ef4a23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-[11px] font-bold text-[#ef4a23] mt-0.5">Prev</span>
            </button>

            {/* Next Button */}
            <button
              onClick={handleNextStep}
              className="absolute right-0 md:-right-16 z-20 w-12 h-14 bg-white rounded-lg shadow-sm border border-[#e2e8f0] flex flex-col items-center justify-center hover:border-[#ef4a23] hover:shadow-md transition-all cursor-pointer"
            >
              <svg className="w-5 h-5 text-[#ef4a23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-[11px] font-bold text-[#ef4a23] mt-0.5">Next</span>
            </button>

            {/* Step Options List Container */}
            <div className="w-full max-w-[500px] flex flex-col gap-3 py-2 px-6 max-h-[340px] overflow-y-auto custom-scrollbar">
              
              {/* STEP 1: Budget */}
              {currentStep === 1 &&
                BUDGET_OPTIONS.map((opt, idx) => (
                  <label
                    key={idx}
                    onClick={() => setSelectedBudgetIndex(idx)}
                    className={`bg-white rounded-xl p-3.5 border flex items-center gap-3.5 cursor-pointer transition-all shadow-xs ${
                      selectedBudgetIndex === idx
                        ? "border-[#3749bb] ring-2 ring-[#3749bb]/20 font-bold"
                        : "border-[#e2e8f0] hover:border-[#cbd5e1]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="budget"
                      checked={selectedBudgetIndex === idx}
                      onChange={() => setSelectedBudgetIndex(idx)}
                      className="accent-[#3749bb] w-4 h-4"
                    />
                    <span className="text-[14px] text-[#1e293b] font-medium">{opt.label}</span>
                  </label>
                ))}

              {/* STEP 2: Processor */}
              {currentStep === 2 &&
                PROCESSOR_OPTIONS.map((opt, idx) => (
                  <label
                    key={idx}
                    onClick={() => setSelectedProcessor(opt.keyword)}
                    className={`bg-white rounded-xl p-3.5 border flex items-center gap-3.5 cursor-pointer transition-all shadow-xs ${
                      selectedProcessor === opt.keyword
                        ? "border-[#3749bb] ring-2 ring-[#3749bb]/20 font-bold"
                        : "border-[#e2e8f0] hover:border-[#cbd5e1]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="processor"
                      checked={selectedProcessor === opt.keyword}
                      onChange={() => setSelectedProcessor(opt.keyword)}
                      className="accent-[#3749bb] w-4 h-4"
                    />
                    <span className="text-[14px] text-[#1e293b] font-medium">{opt.label}</span>
                  </label>
                ))}

              {/* STEP 3: Usage */}
              {currentStep === 3 &&
                USAGE_OPTIONS.map((opt, idx) => (
                  <label
                    key={idx}
                    onClick={() => setSelectedUsage(opt.keyword)}
                    className={`bg-white rounded-xl p-3.5 border flex items-center gap-3.5 cursor-pointer transition-all shadow-xs ${
                      selectedUsage === opt.keyword
                        ? "border-[#3749bb] ring-2 ring-[#3749bb]/20 font-bold"
                        : "border-[#e2e8f0] hover:border-[#cbd5e1]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="usage"
                      checked={selectedUsage === opt.keyword}
                      onChange={() => setSelectedUsage(opt.keyword)}
                      className="accent-[#3749bb] w-4 h-4"
                    />
                    <span className="text-[14px] text-[#1e293b] font-medium">{opt.label}</span>
                  </label>
                ))}

              {/* STEP 4: Screen Size */}
              {currentStep === 4 &&
                SCREEN_OPTIONS.map((opt, idx) => (
                  <label
                    key={idx}
                    onClick={() => setSelectedScreen(opt.size)}
                    className={`bg-white rounded-xl p-3.5 border flex items-center gap-3.5 cursor-pointer transition-all shadow-xs ${
                      selectedScreen === opt.size
                        ? "border-[#3749bb] ring-2 ring-[#3749bb]/20 font-bold"
                        : "border-[#e2e8f0] hover:border-[#cbd5e1]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="screen"
                      checked={selectedScreen === opt.size}
                      onChange={() => setSelectedScreen(opt.size)}
                      className="accent-[#3749bb] w-4 h-4"
                    />
                    <span className="text-[14px] text-[#1e293b] font-medium">{opt.label}</span>
                  </label>
                ))}

              {/* STEP 5: Brand Preference */}
              {currentStep === 5 &&
                BRAND_OPTIONS.map((opt, idx) => (
                  <label
                    key={idx}
                    onClick={() => setSelectedBrand(opt.brand)}
                    className={`bg-white rounded-xl p-3.5 border flex items-center gap-3.5 cursor-pointer transition-all shadow-xs ${
                      selectedBrand === opt.brand
                        ? "border-[#3749bb] ring-2 ring-[#3749bb]/20 font-bold"
                        : "border-[#e2e8f0] hover:border-[#cbd5e1]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="brand"
                      checked={selectedBrand === opt.brand}
                      onChange={() => setSelectedBrand(opt.brand)}
                      className="accent-[#3749bb] w-4 h-4"
                    />
                    <span className="text-[14px] text-[#1e293b] font-medium">{opt.label}</span>
                  </label>
                ))}
            </div>
          </div>

          {/* Bottom Show Matched Laptops Primary Button */}
          <div className="text-center mt-4">
            <button
              onClick={() => {
                const maxB = BUDGET_OPTIONS[selectedBudgetIndex]?.maxPrice || 9999999;
                router.push(`/tool/finder/products?maxPrice=${maxB}&processor=${selectedProcessor}&brand=${selectedBrand}`);
              }}
              className="bg-[#3749bb] hover:bg-[#2b3992] text-white font-bold text-base px-8 py-3.5 rounded-xl transition-all cursor-pointer shadow-md hover:shadow-lg w-full max-w-[500px]"
            >
              Show Matched Laptops ({matchedLaptops.length})
            </button>
          </div>
        </div>

        {/* Results Showcase Section */}
        {showResults && (
          <div className="mt-10 bg-white rounded-2xl p-6 md:p-8 border border-[#e2e8f0] shadow-sm animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#1e293b]">
                  Matched Laptops ({matchedLaptops.length} Results Found)
                </h2>
                <p className="text-xs text-[#64748b] mt-0.5">
                  Filtered by budget ({BUDGET_OPTIONS[selectedBudgetIndex].label})
                </p>
              </div>

              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentStep(1);
                }}
                className="text-xs font-bold text-[#3749bb] hover:underline cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>

            {/* Laptop Product Grid */}
            {matchedLaptops.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {matchedLaptops.map((laptop) => (
                  <div
                    key={laptop.id}
                    className="border border-[#e2e8f0] rounded-xl p-4 flex flex-col justify-between bg-white hover:shadow-md transition-shadow group relative"
                  >
                    <div>
                      <div className="h-44 flex items-center justify-center p-3 mb-3 bg-[#f8fafc] rounded-lg">
                        <img
                          src={laptop.image}
                          alt={laptop.name}
                          className="max-h-36 max-w-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <h4 className="text-[13px] font-bold text-[#1e293b] line-clamp-2 mb-2 leading-snug">
                        {laptop.name}
                      </h4>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-base font-bold text-[#ef4a23]">{formatPrice(laptop.price)}</span>
                        {laptop.oldPrice && (
                          <span className="text-xs text-[#94a3b8] line-through">{formatPrice(laptop.oldPrice)}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => {
                          addToCart(laptop);
                          alert(`Added "${laptop.name}" to cart!`);
                        }}
                        className="flex-1 bg-[#3749bb] hover:bg-[#2b3992] text-white text-xs font-bold py-2 rounded transition-colors"
                      >
                        Buy Now
                      </button>
                      <Link
                        href={laptop.href || "#"}
                        className="border border-[#cbd5e1] hover:border-[#3749bb] text-[#475569] hover:text-[#3749bb] text-xs font-bold px-3 py-2 rounded transition-colors text-center"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-[#64748b]">
                <p className="text-sm font-semibold">No laptops matched your exact combination.</p>
                <button
                  onClick={() => setSelectedBudgetIndex(7)}
                  className="mt-3 bg-[#3749bb] text-white text-xs font-bold px-4 py-2 rounded"
                >
                  Expand Budget Filter
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
