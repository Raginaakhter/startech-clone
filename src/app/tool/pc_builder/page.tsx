"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { searchProducts } from "@/data/helpers";
import { useApp } from "@/context/AppContext";

interface SlotConfig {
  id: string;
  name: string;
  category: string;
  required?: boolean;
  keywords: string[];
  wattage?: number;
  icon: string; // SVG icon type
}

const CORE_COMPONENTS: SlotConfig[] = [
  { id: "cpu", name: "CPU", category: "Core Components", required: true, keywords: ["processor", "amd", "intel", "ryzen", "core i5", "core i7"], wattage: 65, icon: "cpu" },
  { id: "cpu_cooler", name: "CPU Cooler", category: "Core Components", keywords: ["cooler", "fan", "deepcool", "corsair", "liquid"], wattage: 15, icon: "fan" },
  { id: "motherboard", name: "Motherboard", category: "Core Components", required: true, keywords: ["motherboard", "msi", "asus", "gigabyte", "b760m", "b650"], wattage: 40, icon: "motherboard" },
  { id: "ram", name: "RAM", category: "Core Components", required: true, keywords: ["ram", "ddr4", "ddr5", "corsair", "g.skill", "kingston"], wattage: 10, icon: "ram" },
  { id: "storage", name: "Storage", category: "Core Components", required: true, keywords: ["ssd", "hdd", "nvme", "samsung", "wd", "kingston"], wattage: 10, icon: "storage" },
  { id: "graphics", name: "Graphics Card", category: "Core Components", keywords: ["graphics card", "rtx", "geforce", "nvidia", "radeon"], wattage: 200, icon: "gpu" },
  { id: "power_supply", name: "Power Supply", category: "Core Components", keywords: ["power supply", "supply", "cv550", "corsair", "antec"], wattage: 0, icon: "psu" },
  { id: "casing", name: "Casing", category: "Core Components", keywords: ["casing", "mid tower", "antec", "deepcool", "nzxt"], wattage: 10, icon: "casing" },
];

const PERIPHERAL_COMPONENTS: SlotConfig[] = [
  { id: "monitor", name: "Monitor", category: "Peripherals & Others", keywords: ["monitor", "dell", "aoc", "lg", "samsung", "hp"], wattage: 30, icon: "monitor" },
  { id: "casing_cooler", name: "Casing Cooler", category: "Peripherals & Others", keywords: ["cooler", "fan"], wattage: 5, icon: "fan" },
  { id: "keyboard", name: "Keyboard", category: "Peripherals & Others", keywords: ["keyboard", "fantech", "royal kludge", "logitech"], wattage: 5, icon: "keyboard" },
  { id: "mouse", name: "Mouse", category: "Peripherals & Others", keywords: ["mouse", "logitech", "razer", "fantech"], wattage: 5, icon: "mouse" },
  { id: "speaker", name: "Speaker & Home Theater", category: "Peripherals & Others", keywords: ["speaker", "jbl", "edifier"], wattage: 20, icon: "speaker" },
  { id: "headphone", name: "Headphone", category: "Peripherals & Others", keywords: ["headphone", "headset", "sony", "jbl", "fantech"], wattage: 5, icon: "headphone" },
  { id: "wifi_adapter", name: "WiFi Adapter / LAN Card", category: "Peripherals & Others", keywords: ["wifi", "adapter", "tp-link"], wattage: 5, icon: "wifi" },
  { id: "antivirus", name: "Anti Virus", category: "Peripherals & Others", keywords: ["antivirus", "kaspersky"], wattage: 0, icon: "shield" },
  { id: "ups", name: "UPS", category: "Peripherals & Others", keywords: ["ups", "offline ups", "online ups"], wattage: 0, icon: "ups" },
];

export default function PCBuilderPage() {
  const { addToCart } = useApp();
  const [selectedItems, setSelectedItems] = useState<Record<string, any>>({});
  const [hideUnconfigured, setHideUnconfigured] = useState(false);
  const [activeSlot, setActiveSlot] = useState<SlotConfig | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate totals
  const totalItemsCount = Object.keys(selectedItems).length;
  const totalPrice = useMemo(() => {
    return Object.values(selectedItems).reduce((sum, item) => sum + (item.price || 0), 0);
  }, [selectedItems]);

  const totalWattage = useMemo(() => {
    let watt = 0;
    const allSlots = [...CORE_COMPONENTS, ...PERIPHERAL_COMPONENTS];
    for (const slot of allSlots) {
      if (selectedItems[slot.id]) {
        watt += slot.wattage || 15;
      }
    }
    return watt;
  }, [selectedItems]);

  const handleOpenSelector = (slot: SlotConfig) => {
    setActiveSlot(slot);
    setSearchQuery("");
    setModalOpen(true);
  };

  const handleSelectProduct = (product: any) => {
    if (!activeSlot) return;
    setSelectedItems((prev) => ({
      ...prev,
      [activeSlot.id]: product,
    }));
    setModalOpen(false);
    setActiveSlot(null);
  };

  const handleRemoveProduct = (slotId: string) => {
    setSelectedItems((prev) => {
      const updated = { ...prev };
      delete updated[slotId];
      return updated;
    });
  };

  const handleAddAllToCart = () => {
    const items = Object.values(selectedItems);
    if (items.length === 0) {
      alert("Please select at least one component to add to cart!");
      return;
    }
    items.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      });
    });
    alert(`Successfully added ${items.length} components to your shopping cart!`);
  };

  // Get products candidate list for active slot
  const candidateProducts = useMemo(() => {
    if (!activeSlot) return [];
    const all = searchProducts("");
    let matched = all.filter((p) => {
      const pName = p.name.toLowerCase();
      const pHref = p.href.toLowerCase();
      return activeSlot.keywords.some((kw) => pName.includes(kw) || pHref.includes(kw));
    });
    if (matched.length === 0) {
      matched = all.slice(0, 10);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      matched = matched.filter((p) => p.name.toLowerCase().includes(q));
    }
    return matched;
  }, [activeSlot, searchQuery]);

  const renderIcon = (type: string) => {
    switch (type) {
      case "cpu":
        return (
          <svg className="w-6 h-6 text-[#3749bb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <rect x="8" y="8" width="8" height="8" rx="1" />
            <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" strokeLinecap="round" />
          </svg>
        );
      case "fan":
        return (
          <svg className="w-6 h-6 text-[#3749bb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 9C12 6 14 4 16.5 4C19 4 20 6 19 8.5C18 11 15 12 12 12Z" />
            <path d="M12 15C12 18 10 20 7.5 20C5 20 4 18 5 15.5C6 13 9 12 12 12Z" />
            <path d="M9 12C6 12 4 10 4 7.5C4 5 6 4 8.5 5C11 6 12 9 12 12Z" />
            <path d="M15 12C18 12 20 14 20 16.5C20 19 18 20 15.5 19C13 18 12 15 12 12Z" />
          </svg>
        );
      case "motherboard":
        return (
          <svg className="w-6 h-6 text-[#3749bb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <rect x="6" y="6" width="5" height="5" />
            <path d="M15 6h3M15 9h3M6 15h4M6 18h4M15 14h3v4h-3z" />
          </svg>
        );
      case "ram":
        return (
          <svg className="w-6 h-6 text-[#3749bb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="2" y="7" width="20" height="7" rx="1" />
            <path d="M5 14v3M9 14v3M13 14v3M17 14v3M5 7V5M19 7V5" />
          </svg>
        );
      case "storage":
        return (
          <svg className="w-6 h-6 text-[#3749bb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="7" cy="12" r="1.5" />
            <line x1="12" y1="12" x2="18" y2="12" />
          </svg>
        );
      case "gpu":
        return (
          <svg className="w-6 h-6 text-[#3749bb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="2" y="6" width="20" height="10" rx="2" />
            <circle cx="8" cy="11" r="2.5" />
            <circle cx="16" cy="11" r="2.5" />
            <path d="M4 16v3M8 16v3" />
          </svg>
        );
      case "psu":
        return (
          <svg className="w-6 h-6 text-[#3749bb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="8" cy="10" r="2" />
            <path d="M14 8h4M14 12h4M7 16h10" />
          </svg>
        );
      case "casing":
        return (
          <svg className="w-6 h-6 text-[#3749bb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <line x1="9" y1="6" x2="15" y2="6" />
            <circle cx="12" cy="10" r="1" />
            <rect x="8" y="14" width="8" height="5" rx="1" />
          </svg>
        );
      case "monitor":
        return (
          <svg className="w-6 h-6 text-[#3749bb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
        );
      case "keyboard":
        return (
          <svg className="w-6 h-6 text-[#3749bb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h12" />
          </svg>
        );
      case "mouse":
        return (
          <svg className="w-6 h-6 text-[#3749bb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="6" y="3" width="12" height="18" rx="6" />
            <line x1="12" y1="3" x2="12" y2="9" />
          </svg>
        );
      case "speaker":
        return (
          <svg className="w-6 h-6 text-[#3749bb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <circle cx="12" cy="7" r="2" />
            <circle cx="12" cy="15" r="3.5" />
          </svg>
        );
      case "headphone":
        return (
          <svg className="w-6 h-6 text-[#3749bb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 14v-3a9 9 0 0 1 18 0v3" />
            <rect x="2" y="14" width="4" height="6" rx="2" fill="currentColor" className="text-[#3749bb]" />
            <rect x="18" y="14" width="4" height="6" rx="2" fill="currentColor" className="text-[#3749bb]" />
          </svg>
        );
      case "wifi":
        return (
          <svg className="w-6 h-6 text-[#3749bb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 12.55a11 11 0 0 1 14.08 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" strokeLinecap="round" />
          </svg>
        );
      case "shield":
        return (
          <svg className="w-6 h-6 text-[#3749bb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case "ups":
        return (
          <svg className="w-6 h-6 text-[#3749bb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="5" y="3" width="14" height="18" rx="2" />
            <path d="M12 7v5l3 2" />
            <circle cx="12" cy="18" r="1" fill="currentColor" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-[#3749bb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="4" y="4" width="16" height="16" rx="2" />
          </svg>
        );
    }
  };

  const renderSlotRow = (slot: SlotConfig) => {
    const item = selectedItems[slot.id];
    if (hideUnconfigured && !item) return null;

    return (
      <div
        key={slot.id}
        className="px-4 py-3 border-b border-[#eee] flex items-center justify-between gap-3 bg-white hover:bg-[#fafafa] transition-colors"
      >
        {/* Left: Icon & Label */}
        <div className="flex items-center gap-3 w-[220px] shrink-0">
          <div className="w-10 h-10 rounded bg-[#eef2f9] flex items-center justify-center shrink-0">
            {renderIcon(slot.icon)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-bold text-[#333]">{slot.name}</span>
              {slot.required && (
                <span className="bg-[#e5e7eb] text-[#4b5563] text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase">
                  Required
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Middle: Selected details OR Empty skeleton bar */}
        <div className="flex-1 px-2">
          {item ? (
            <div className="flex items-center justify-between gap-3 bg-[#f8f9fc] border border-[#e2e8f0] p-2 rounded">
              <div className="flex items-center gap-3 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 object-contain shrink-0 bg-white rounded border border-[#edf2f7] p-1"
                />
                <div className="truncate">
                  <h4 className="text-[12px] font-semibold text-[#1a202c] truncate">{item.name}</h4>
                  <span className="text-[12px] font-bold text-[#ef4a23]">
                    {item.price.toLocaleString("en-BD")}৳
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleRemoveProduct(slot.id)}
                className="text-[#a0aec0] hover:text-[#e53e3e] p-1 cursor-pointer transition-colors"
                title="Remove component"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="w-[65%] h-2.5 bg-[#e2e8f0]/60 rounded-full" />
          )}
        </div>

        {/* Right: Choose button */}
        <div className="shrink-0">
          {!item && (
            <button
              onClick={() => handleOpenSelector(slot)}
              className="border border-[#3749bb] text-[#3749bb] hover:bg-[#3749bb] hover:text-white px-5 py-1.5 rounded text-[12px] font-bold transition-all cursor-pointer shadow-xs"
            >
              Choose
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#f2f4f8] min-h-screen py-5">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Main PC Builder Container Card */}
        <div className="bg-white rounded-lg shadow-sm border border-[#e2e8f0] overflow-hidden">
          {/* Header Bar */}
          <div className="p-4 md:p-5 border-b border-[#e2e8f0] flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left Title & Checkbox */}
            <div>
              <h1 className="text-[18px] md:text-[20px] font-bold text-[#3749bb] flex items-center gap-2">
                <svg className="w-6 h-6 text-[#3749bb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                PC Builder - Build Your Own Computer
              </h1>
              <label className="flex items-center gap-2 mt-2 cursor-pointer text-[12px] text-[#4a5568] select-none">
                <input
                  type="checkbox"
                  checked={hideUnconfigured}
                  onChange={(e) => setHideUnconfigured(e.target.checked)}
                  className="accent-[#3749bb] w-3.5 h-3.5"
                />
                Hide Unconfigured Component
              </label>
            </div>

            {/* Right Action Icons & Wattage/Price Pills */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Action Buttons */}
              <div className="flex items-center gap-2 mr-2">
                {/* Add to Cart */}
                <button
                  onClick={handleAddAllToCart}
                  className="flex flex-col items-center justify-center text-[#ef4a23] hover:text-[#d01919] p-1.5 rounded hover:bg-[#fff5f2] transition-colors cursor-pointer"
                  title="Add All to Cart"
                >
                  <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-[10px] font-semibold">Add to Cart</span>
                </button>

                {/* Save PC */}
                <button
                  onClick={() => {
                    if (totalItemsCount === 0) return alert("Please select components first!");
                    alert("Build configuration saved successfully!");
                  }}
                  className="flex flex-col items-center justify-center text-[#ef4a23] hover:text-[#d01919] p-1.5 rounded hover:bg-[#fff5f2] transition-colors cursor-pointer"
                  title="Save PC"
                >
                  <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  <span className="text-[10px] font-semibold">Save PC</span>
                </button>

                {/* Print */}
                <button
                  onClick={() => window.print()}
                  className="flex flex-col items-center justify-center text-[#ef4a23] hover:text-[#d01919] p-1.5 rounded hover:bg-[#fff5f2] transition-colors cursor-pointer"
                  title="Print"
                >
                  <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <span className="text-[10px] font-semibold">Print</span>
                </button>

                {/* Screenshot */}
                <button
                  onClick={() => alert("Screenshot mode ready!")}
                  className="flex flex-col items-center justify-center text-[#ef4a23] hover:text-[#d01919] p-1.5 rounded hover:bg-[#fff5f2] transition-colors cursor-pointer"
                  title="Screenshot"
                >
                  <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-[10px] font-semibold">Screenshot</span>
                </button>
              </div>

              {/* Est. Wattage Badge */}
              <div className="border-2 border-dashed border-[#ef4a23] rounded p-1.5 px-3 text-center min-w-[90px]">
                <span className="text-[9px] font-bold text-[#4a5568] block leading-tight">EST. WATTAGE</span>
                <span className="text-[13px] font-bold text-[#ef4a23]">{totalWattage}W</span>
              </div>

              {/* Total Price Pill */}
              <div className="bg-[#3749bb] text-white px-4 py-2 rounded text-right min-w-[100px]">
                <span className="text-[14px] font-bold block leading-tight">
                  {totalPrice.toLocaleString("en-BD")}৳
                </span>
                <span className="text-[10px] text-gray-200 block">
                  {totalItemsCount} Items
                </span>
              </div>
            </div>
          </div>

          {/* Core Components Section Header */}
          <div className="bg-[#666666] text-white px-4 py-2 text-[13px] font-bold uppercase tracking-wide">
            Core Components
          </div>
          {CORE_COMPONENTS.map((slot) => renderSlotRow(slot))}

          {/* Peripherals & Others Section Header */}
          <div className="bg-[#666666] text-white px-4 py-2 text-[13px] font-bold uppercase tracking-wide">
            Peripherals &amp; Others
          </div>
          {PERIPHERAL_COMPONENTS.map((slot) => renderSlotRow(slot))}
        </div>

        {/* Bottom Lenovo Laptop Banner */}
        <div className="mt-8 rounded-lg overflow-hidden border border-[#e2e8f0] shadow-sm relative bg-[#070b19] text-white">
          <Link href="/laptop-notebook" className="block w-full">
            <div className="relative min-h-[140px] md:min-h-[180px] flex items-center justify-between p-6 md:p-8 bg-gradient-to-r from-[#030712] via-[#0b1736] to-[#1e3a8a] overflow-hidden group">
              {/* Lenovo Red Tag Logo */}
              <div className="absolute top-4 left-6 bg-[#e11d48] text-white text-[11px] font-bold px-2.5 py-1 tracking-wider uppercase z-10 shadow-md">
                Lenovo
              </div>

              {/* Left Content text */}
              <div className="relative z-10 max-w-[50%] mt-3">
                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white uppercase drop-shadow-md">
                  LENOVO <span className="text-[#38bdf8]">LAPTOPS</span>
                </h2>
                <p className="text-xs md:text-sm text-gray-300 font-medium mt-1 tracking-wide">
                  Smarter Technology for all
                </p>
                <div className="mt-3 inline-flex items-center gap-2 bg-[#e11d48] group-hover:bg-[#be123c] text-white text-[11px] md:text-[12px] font-bold px-4 py-1.5 rounded transition-all shadow-md">
                  <span>Available Now</span>
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>

              {/* Right Laptop Display Images Visual */}
              <div className="relative z-10 flex items-center gap-2 md:gap-4 shrink-0">
                <img
                  src="https://www.startech.com.bd/image/cache/catalog/laptop/lenovo/ideapad-slim-3-15iru8/ideapad-slim-3-15iru8-01-500x500.webp"
                  alt="Lenovo Laptop"
                  className="w-24 md:w-36 h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform -rotate-6 group-hover:scale-105 transition-transform duration-300"
                />
                <img
                  src="https://www.startech.com.bd/image/cache/catalog/laptop/asus/tuf-gaming-a15-fa506nf/tuf-gaming-a15-fa506nf-01-500x500.webp"
                  alt="Lenovo Legion Laptop"
                  className="w-32 md:w-48 h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] transform rotate-3 group-hover:scale-105 transition-transform duration-300 hidden sm:block"
                />
              </div>

              {/* Glowing Background Glow Effects */}
              <div className="absolute right-10 top-1/2 -translate-y-1/2 w-72 h-72 bg-[#38bdf8]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#e11d48]/15 rounded-full blur-3xl pointer-events-none" />
            </div>
          </Link>
        </div>
      </div>

      {/* Modal Popup for selecting component */}
      {modalOpen && activeSlot && (
        <div className="fixed inset-0 bg-black/60 z-[120] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
            {/* Modal Header */}
            <div className="bg-[#3749bb] text-white px-5 py-3.5 flex items-center justify-between">
              <h3 className="font-bold text-[15px] flex items-center gap-2">
                Select {activeSlot.name}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-white/80 hover:text-white p-1 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Search Bar */}
            <div className="p-3.5 border-b border-[#e2e8f0] bg-[#f8fafc]">
              <div className="relative">
                <input
                  type="text"
                  placeholder={`Search ${activeSlot.name}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 pl-9 pr-4 border border-[#cbd5e1] rounded text-[13px] outline-none focus:border-[#3749bb] bg-white"
                />
                <svg className="w-4 h-4 text-[#94a3b8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Modal Item List */}
            <div className="flex-1 overflow-y-auto p-4 divide-y divide-[#edf2f7]">
              {candidateProducts.length > 0 ? (
                candidateProducts.map((product) => (
                  <div
                    key={product.id}
                    className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4 hover:bg-[#f8fafc] p-2 rounded transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 object-contain bg-white border border-[#e2e8f0] p-1 rounded shrink-0"
                      />
                      <div className="truncate">
                        <h4 className="text-[13px] font-bold text-[#2d3748] truncate">{product.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[13px] font-bold text-[#ef4a23]">
                            {product.price.toLocaleString("en-BD")}৳
                          </span>
                          {product.oldPrice && (
                            <span className="text-[11px] text-[#a0aec0] line-through">
                              {product.oldPrice.toLocaleString("en-BD")}৳
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectProduct(product)}
                      className="bg-[#3749bb] hover:bg-[#2b3992] text-white text-[12px] font-bold px-4 py-1.5 rounded transition-colors cursor-pointer shrink-0 shadow-xs"
                    >
                      Add
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center text-[13px] text-[#718096]">
                  No components found. Try a different search.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
