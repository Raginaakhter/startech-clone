"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";

// Utility to generate structured mock specs for comparison
function getProductSpecs(name: string) {
  const n = name.toLowerCase();

  if (n.includes("air fryer") || n.includes("fryer")) {
    const isPigeon = n.includes("pigeon");
    return {
      "General Information": [
        { label: "Basket Capacity", value: isPigeon ? "8L" : "3.2 Liter" },
        { label: "Heating Capacity", value: isPigeon ? "2000W" : "1300 W" },
        { label: "Basket Coating", value: isPigeon ? "Non-stick" : "Non-stick coating" },
        { label: "Number of Baskets", value: "1" },
        { label: "Visible Window", value: isPigeon ? "Yes" : "N/A" },
        { label: "Control Panel", value: isPigeon ? "One-touch Digital Control" : "Knob Remote control" },
        { label: "Display", value: isPigeon ? "Yes" : "N/A" },
        { label: "Cooking function", value: isPigeon ? "Air Fry, Roast, Bake, Grill & Reheat" : "12 cooking methods" },
        { label: "Air Frying Technology", value: isPigeon ? "N/A" : "RapidAir technology" },
        { label: "Temperature Range", value: isPigeon ? "Up to 200°C" : "200°C" },
        { label: "Timerr", value: "Yes" },
        { label: "App Control", value: isPigeon ? "N/A" : "HomeID" }
      ].filter(s => s.value !== "N/A"),
      "Power Supply": [
        { label: "Power Consumption", value: isPigeon ? "2000W" : "1300 W" },
        { label: "Voltage", value: "220 - 240 V" }
      ],
      "Physical Information": [
        { label: "Color", value: "Black" },
        { label: "Cable Length", value: "0.8 m" },
        { label: "Material", value: "Plastic" },
        { label: "Dimension", value: "352 x 257 x 273 mm" },
        { label: "Weight", value: "2.85 kg" }
      ],
      "Warranty Information": [
        { label: "Warranty", value: isPigeon ? "3 Years Service Warranty by Pigeon. The Pigeon warranty card must be kept for any warranty claim for warranty, Call Pigeon at 01898805551, 01898805552 (Star Tech will not bear warranty claims)." : "2 Years Official Warranty by Philips. The Philips warranty card must be kept for any warranty claim for warranty, Call Philips at 01898805551, 01898805552 (Star Tech will not bear warranty claims)." }
      ]
    };
  }

  if (n.includes("gimbal") || n.includes("stabilizer") || n.includes("zhiyun")) {
    return {
      "General": [
        { label: "Dimension", value: "181.7*107.7*56.3 (W*D*H)" },
        { label: "Weight", value: "370g (with battery)" }
      ],
      "Battery": [
        { label: "Energy", value: "Max: 15h Min: 10h" },
        { label: "Voltage", value: "Max: 8.8V Standard: 7.7V Min: 6.5V" },
        { label: "Operating Temperature", value: "Max: 45°C Standard: 25°C Min: -10°C" },
        { label: "Charging Time", value: "Max: 2.5h" }
      ],
      "Gimbal": [
        { label: "Mechanical Range", value: "Tilt Mechanical Range- Max: 254°, Standard: 338°, Min: -84° Roll Mechanical Range- Max: 163°, Standard: 338°, Min: -175° Pan Mechanical Range- Max: 235°, Standard: 331°, Min: -96°" }
      ],
      "Warranty": [
        { label: "Warranty", value: "no warranty" }
      ]
    };
  }

  // Fallback generic specs
  return {
    "General Information": [
      { label: "Brand", value: name.split(" ")[0] || "Generic" },
      { label: "Color", value: "Black/Grey" },
      { label: "Features", value: "High Performance" }
    ],
    "Warranty Information": [
      { label: "Warranty", value: "1 Year Official Warranty" }
    ]
  };
}

export default function ComparePage() {
  const { compareList, toggleCompare, addToCart } = useApp();
  const router = useRouter();

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-BD") + "৳";
  };

  const handleBuyNow = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    addToCart(product);
    router.push("/checkout");
  };

  // State to manage which accordions are open
  // By default, open them all like the screenshot implies
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: prev[section] === false ? true : false
    }));
  };

  const isSectionOpen = (section: string) => {
    return openSections[section] !== false; // Default true
  };

  // Build the dynamic comparison matrix
  // 1. Gather all unique section names across all compared products
  const productSpecsData = compareList.map(p => getProductSpecs(p.name));
  const allSections = Array.from(new Set(productSpecsData.flatMap(specs => Object.keys(specs))));

  // 2. For each section, gather all unique label names
  const sectionLabels: Record<string, string[]> = {};
  allSections.forEach(section => {
    const labels = new Set<string>();
    productSpecsData.forEach(specs => {
      if (specs[section]) {
        specs[section].forEach((s: any) => labels.add(s.label));
      }
    });
    sectionLabels[section] = Array.from(labels);
  });

  return (
    <div className="bg-[#f2f4f8] min-h-screen pb-10">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-[1140px] mx-auto px-4 py-3 flex items-center gap-2 text-[13px] text-gray-500">
          <Link href="/" className="hover:text-primary transition-colors flex items-center">
            <i className="material-icons text-[16px]">home</i>
          </Link>
          <span>/</span>
          <span className="text-gray-800">Product Comparison</span>
        </div>
      </div>

      <div className="max-w-[1140px] mx-auto px-4 mt-6">
        <div className="bg-white p-6 rounded shadow-sm border border-gray-200">

          {/* Header */}
          <div className="flex justify-between items-start mb-6 border-b border-gray-200 pb-4">
            <div>
              <h1 className="text-[22px] font-semibold text-[#333] mb-1">Product Comparison</h1>
              <p className="text-[13px] text-gray-500">Find and select products to see the differences and similarities between them</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded text-[#333] text-[13px] font-semibold hover:bg-gray-50 transition-colors">
                <i className="material-icons text-[18px]">print</i>
                Print
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 bg-[#3749bb] text-white rounded text-[13px] font-semibold hover:bg-[#2b3992] transition-colors">
                <i className="material-icons text-[18px]">share</i>
                Share
              </button>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr>
                  <th className="w-[20%] p-4 align-top border-r border-gray-200">
                    <span className="text-[13px] text-[#333] font-medium">You can add Max 4 Products</span>
                  </th>
                  {/* Render exactly 4 columns */}
                  {[0, 1, 2, 3].map((index) => {
                    const product = compareList[index];
                    return (
                      <th key={index} className="w-[20%] p-4 align-top border-r border-gray-200 last:border-r-0 relative group">
                        {product ? (
                          <div className="flex flex-col items-center">
                            <div className="relative w-full mb-3 flex items-center bg-[#f2f4f8] border border-gray-200 rounded text-gray-500 text-[13px] px-3 h-10 overflow-hidden cursor-pointer">
                              <span className="truncate flex-1">Search and Select Pr...</span>
                              <i className="material-icons text-[16px] absolute right-3 hover:text-red-500" onClick={() => toggleCompare(product)}>close</i>
                            </div>
                            <div className="h-[160px] flex items-center justify-center mb-3">
                              <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
                            </div>
                            <h3 className="text-[14px] font-bold text-[#333] text-center leading-snug mb-2 line-clamp-2 min-h-[40px]">
                              {product.name}
                            </h3>
                            <div className="text-[18px] font-bold text-[#ef4a23]">
                              {formatPrice(product.price)}
                            </div>
                            {product.oldPrice && (
                              <div className="text-[13px] text-gray-400 line-through">
                                {formatPrice(product.oldPrice)}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex flex-col h-full">
                            <div className="relative w-full mb-3 flex items-center bg-white border border-gray-200 rounded text-gray-500 text-[13px] px-3 h-10 cursor-pointer">
                              <span className="truncate flex-1">Search and Select Pro...</span>
                              <i className="material-icons text-[16px] absolute right-3">search</i>
                            </div>
                            <div className="flex-1 flex items-center justify-center min-h-[160px]">
                              <p className="text-[13px] text-gray-400 text-center px-4">Find and select product to compare</p>
                            </div>
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {/* Basic Info Rows */}
                <tr className="border-t border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4 text-[13px] text-gray-500 font-medium border-r border-gray-200">Model</td>
                  {[0, 1, 2, 3].map(i => (
                    <td key={i} className="p-4 text-[13px] text-[#333] border-r border-gray-200 last:border-r-0">
                      {compareList[i] ? compareList[i].name.split(" ")[1] || "N/A" : ""}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4 text-[13px] text-gray-500 font-medium border-r border-gray-200">Brand</td>
                  {[0, 1, 2, 3].map(i => (
                    <td key={i} className="p-4 text-[13px] text-[#333] border-r border-gray-200 last:border-r-0">
                      {compareList[i] ? compareList[i].name.split(" ")[0] : ""}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4 text-[13px] text-gray-500 font-medium border-r border-gray-200">Availability</td>
                  {[0, 1, 2, 3].map(i => (
                    <td key={i} className="p-4 text-[13px] text-[#333] border-r border-gray-200 last:border-r-0">
                      {compareList[i] ? "In Stock" : ""}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4 text-[13px] text-gray-500 font-medium border-r border-gray-200">Rating</td>
                  {[0, 1, 2, 3].map(i => (
                    <td key={i} className="p-4 text-[13px] text-[#333] border-r border-gray-200 last:border-r-0">
                      {compareList[i] ? (
                        <div className="flex items-center gap-1">
                          <i className="material-icons text-[#ef4a23] text-[16px]">star</i>
                          <span className="font-bold text-[#ef4a23]">0/5</span>
                          <span className="text-gray-500">(0 Reviews)</span>
                        </div>
                      ) : ""}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4 text-[13px] text-gray-500 font-medium border-r border-gray-200 align-top">Summary</td>
                  {[0, 1, 2, 3].map(i => (
                    <td key={i} className="p-4 text-[12px] text-[#333] border-r border-gray-200 last:border-r-0 align-top">
                      {compareList[i] ? (
                        <div className="flex flex-col gap-2">
                          {productSpecsData[i] && productSpecsData[i]["General Information"]?.slice(0, 4).map((spec: any, j: number) => (
                            <p key={j} className="leading-snug">{spec.label}: {spec.value}</p>
                          ))}
                        </div>
                      ) : ""}
                    </td>
                  ))}
                </tr>

                {/* Dynamic Spec Sections */}
                {allSections.map((section, sIdx) => {
                  const isOpen = isSectionOpen(section);
                  return (
                    <React.Fragment key={sIdx}>
                      {/* Section Header */}
                      <tr className="bg-[#f5f6fb]">
                        <td
                          colSpan={5}
                          className="p-3 text-[16px] text-[#3749bb] font-medium cursor-pointer"
                          onClick={() => toggleSection(section)}
                        >
                          <div className="flex items-center justify-between">
                            {section}
                            <i className="material-icons text-[20px]">{isOpen ? "expand_less" : "expand_more"}</i>
                          </div>
                        </td>
                      </tr>
                      {/* Section Content Rows */}
                      {isOpen && sectionLabels[section].map((label, lIdx) => (
                        <tr key={lIdx} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-4 text-[13px] text-gray-500 font-medium border-r border-gray-200 align-top w-[20%]">
                            {label}
                          </td>
                          {[0, 1, 2, 3].map(i => {
                            let value = "";
                            if (compareList[i] && productSpecsData[i] && productSpecsData[i][section]) {
                              const match = productSpecsData[i][section].find((s: any) => s.label === label);
                              if (match) value = match.value;
                            }
                            return (
                              <td key={i} className="p-4 text-[13px] text-[#333] border-r border-gray-200 last:border-r-0 align-top w-[20%] whitespace-pre-wrap">
                                {value}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}

                {/* Footer Action Row */}
                <tr className="bg-gray-50 border-t-2 border-gray-200">
                  <td className="p-4 border-r border-gray-200"></td>
                  {[0, 1, 2, 3].map(i => (
                    <td key={i} className="p-4 border-r border-gray-200 last:border-r-0 align-middle">
                      {compareList[i] ? (
                        <div className="flex justify-center">
                          <button
                            onClick={(e) => handleBuyNow(e, compareList[i])}
                            className="bg-[#3749bb] hover:bg-[#2b3992] text-white px-8 py-2.5 rounded text-[13px] font-bold transition-colors w-[140px]"
                          >
                            Buy Now
                          </button>
                        </div>
                      ) : null}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
