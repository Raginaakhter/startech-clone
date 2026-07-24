"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { getRelatedProducts } from "@/data/helpers";

function getDetailedSpecs(name: string) {
  const n = name.toLowerCase();
  
  if (n.includes("c931") || n.includes("supercomputer") || n.includes("dgx")) {
    return {
      "Basic Information": [
        { label: "Processor", value: "20-core ARM, 10 Cortex-X925 + 10 Cortex-A725 ARM\nTensor Performance: 1 petaFLO P AI Performance (FP4, Sparse)\nNVIDIA DGX Spark Platform" },
        { label: "RAM", value: "128GB LPDDR5x, Unified System Memory\nMemory Interface: 256-bit\nMemory Bandwidth: 273 GB/s" },
        { label: "Graphics Card", value: "NVIDIA Grace Blackwell Architecture\nGraphic Memory: Share 128GB unified Memory\nMultiple Display: 4 independent displays" },
        { label: "Storage", value: "4TB NVMe M.2 With Self-encryption\nExpansion Slot: 1x M.2 M Key 1TB/4TB SSD with self-encryption" },
        { label: "Power Supply", value: "240W USB-C with external power adapter" },
        { label: "Network & Wireless Connectivity", value: "WiFi 7, BT 5.3" },
        { label: "Operating System", value: "NVIDIA DGX OS" },
        { label: "Security Management", value: "Discrete TPM 2.0, TCG certified; HP Wolf Pro Security Edition" }
      ],
      "Input Devices": [
        { label: "External I/O Ports", value: "USB: 4x USB 3.2 Type C (up to 20Gb/s)\n1x HDMI 2.1a\nNVENC/NVDEC: 1x/1x\nEthernet: 1x RJ-45 Connector 10GbE\nConnectX-7 Smart NIC\nAudio: HDMI Multichannel Audio output\nDisplayPort: 3 via USB-C\nAntenna: 2\nQSFP: 2" }
      ],
      "Physical Details": [
        { label: "Dimension", value: "151 x 151 x 52 mm" },
        { label: "Weight", value: "1.2 kg" },
        { label: "Color", value: "Black" }
      ],
      "Warranty Information": [
        { label: "Warranty", value: "3 Years" }
      ]
    };
  }

  // Fallback for any product
  return {
    "Basic Information": [
      { label: "Brand", value: name.split(" ")[0] || "Generic" },
      { label: "Features", value: "High Performance Build" }
    ],
    "Physical Details": [
      { label: "Color", value: "Black" },
      { label: "Condition", value: "Brand New" }
    ],
    "Warranty Information": [
      { label: "Warranty", value: "1 Year Official Warranty" }
    ]
  };
}

export default function ProductDetailView({ product }: { product: any }) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist, toggleCompare, isInCompare } = useApp();
  
  const specs = getDetailedSpecs(product.name);
  const related = getRelatedProducts(product.id, 4);

  const formatPrice = (price: number) => price.toLocaleString("en-BD") + "৳";
  const inWish = isInWishlist(product.id);
  const inComp = isInCompare(product.id);

  // Scroll to tabs helper
  const scrollToTab = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-[#f2f4f8] pb-10 font-sans">
      {/* Top Header / Breadcrumbs */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-[1140px] mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[13px] text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors flex items-center">
              <i className="material-icons text-[16px]">home</i>
            </Link>
            <span>/</span>
            <Link href="#" className="hover:text-primary transition-colors">{product.name.split(" ")[0]}</Link>
            <span>/</span>
            <span className="text-gray-800 line-clamp-1 max-w-[300px]">{product.name}</span>
          </div>

          <div className="flex items-center gap-5 text-[13px] font-medium text-[#333]">
            <div className="flex items-center gap-2">
              <span>Share:</span>
              <div className="flex gap-1">
                <i className="material-icons text-[16px] text-gray-400 hover:text-[#3749bb] cursor-pointer">facebook</i>
                <i className="material-icons text-[16px] text-gray-400 hover:text-[#3749bb] cursor-pointer">link</i>
              </div>
            </div>
            
            <button
              onClick={() => toggleWishlist(product)}
              className={`flex items-center gap-1.5 hover:text-[#3749bb] transition-colors ${inWish ? "text-[#3749bb]" : ""}`}
            >
              <i className="material-icons text-[18px]">{inWish ? "bookmark" : "bookmark_border"}</i>
              Save
            </button>
            <button
              onClick={() => toggleCompare(product)}
              className={`flex items-center gap-1.5 hover:text-[#3749bb] transition-colors ${inComp ? "text-[#3749bb]" : ""}`}
            >
              <i className="material-icons text-[18px]">library_add</i>
              Add to Compare
            </button>
          </div>
        </div>
      </div>

      {/* Main Product Intro */}
      <div className="max-w-[1140px] mx-auto px-4 mt-6">
        <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-8">
          
          {/* Left: Images */}
          <div className="w-full md:w-[40%] flex flex-col items-center">
            <div className="w-full h-[350px] flex items-center justify-center p-4">
              <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="flex gap-3 justify-center mt-4">
              {/* Fake thumbnails */}
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-[50px] h-[50px] border ${i === 1 ? 'border-primary' : 'border-gray-200'} rounded p-1 cursor-pointer flex items-center justify-center`}>
                  <img src={product.image} alt="thumb" className="max-w-full max-h-full object-contain" />
                </div>
              ))}
            </div>
            {/* Banner Add placeholder */}
            <div className="w-full mt-6 rounded overflow-hidden">
              <img src="https://www.startech.com.bd/image/cache/catalog/home/banner/2026/washing-machine-offer-web-banner-982x500.webp" alt="Ad" className="w-full h-auto object-cover border border-gray-200 rounded" />
            </div>
          </div>

          {/* Right: Details */}
          <div className="w-full md:w-[60%] flex flex-col">
            <h1 className="text-[22px] font-medium text-[#3749bb] leading-snug mb-3">{product.name}</h1>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4 text-[13px]">
              <span className="bg-[#f5f6fb] px-3 py-1.5 rounded-full text-gray-500">
                Price: <strong className="text-[#333] ml-1">{formatPrice(product.price)}</strong>
              </span>
              <span className="bg-[#f5f6fb] px-3 py-1.5 rounded-full text-gray-500">
                Status: <strong className="text-[#333] ml-1">In Stock</strong>
              </span>
              <span className="bg-[#f5f6fb] px-3 py-1.5 rounded-full text-gray-500">
                Product Code: <strong className="text-[#333] ml-1">ST-{product.id}</strong>
              </span>
              <span className="bg-[#f5f6fb] px-3 py-1.5 rounded-full text-gray-500">
                Brand: <strong className="text-[#333] ml-1">{product.name.split(" ")[0]}</strong>
              </span>
            </div>

            {/* Key Features */}
            <div className="mt-2 mb-4">
              <h3 className="text-[15px] font-bold text-[#333] mb-3">Key Features</h3>
              <div className="flex flex-col gap-2 text-[14px] text-[#333]">
                <p>Model: <strong className="font-medium text-gray-700">{product.name.split(" ")[1] || "ST-PRO"}</strong></p>
                {specs["Basic Information"]?.slice(0, 3).map((s: any, idx: number) => (
                  <p key={idx}>{s.label}: <strong className="font-medium text-gray-700">{s.value.split('\n')[0]}</strong></p>
                ))}
              </div>
              <button 
                onClick={() => scrollToTab("description-tab")}
                className="text-[#ef4a23] text-[14px] font-medium mt-4 hover:underline border-b border-dashed border-[#ef4a23] pb-0.5 inline-block w-max cursor-pointer"
              >
                View More Info
              </button>
            </div>

            {/* Price Block / Buy Action */}
            <div className="mt-2 bg-[#f5f6fb] p-6 rounded text-center">
              <h2 className="text-[24px] font-bold text-[#333] mb-4">{formatPrice(product.price)}</h2>
              <button 
                onClick={() => {
                  addToCart(product);
                  router.push("/checkout/cart");
                }}
                className="bg-[#3749bb] hover:bg-[#2b3992] text-white px-10 py-3 rounded text-[15px] font-bold transition-colors w-full md:w-auto cursor-pointer"
              >
                Buy Now
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Grid: Content & Sidebar */}
      <div className="max-w-[1140px] mx-auto px-4 mt-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Left: Main Content (Tabs) */}
          <div className="flex-1 w-full relative">
            
            {/* Sticky Tabs Bar */}
            <div className="bg-white rounded-md shadow-sm border border-gray-100 flex overflow-x-auto sticky top-0 z-10">
              {['Specification', 'Description', 'Questions (0)', 'Reviews (0)'].map((tab, idx) => (
                <button 
                  key={tab}
                  onClick={() => scrollToTab(`${tab.split(' ')[0].toLowerCase()}-tab`)}
                  className={`px-5 py-3.5 text-[14px] font-bold whitespace-nowrap transition-colors border-r border-gray-100 cursor-pointer
                    ${idx === 0 ? 'bg-[#ef4a23] text-white' : 'text-[#333] hover:text-[#ef4a23]'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Specification Section */}
            <div id="specification-tab" className="bg-white rounded-md shadow-sm border border-gray-100 mt-4 overflow-hidden scroll-mt-14">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-[18px] font-bold text-[#333]">Specification</h2>
              </div>
              <div className="p-4">
                {Object.entries(specs).map(([groupName, fields]) => (
                  <div key={groupName} className="mb-6 last:mb-0">
                    <h3 className="bg-[#f5f6fb] px-4 py-2.5 text-[14px] font-bold text-[#3749bb] rounded-t">{groupName}</h3>
                    <div className="border border-t-0 border-[#f5f6fb] rounded-b">
                      {(fields as any[]).map((field: any, idx: number) => (
                        <div key={idx} className="flex border-b border-[#f5f6fb] last:border-0 hover:bg-gray-50 transition-colors">
                          <div className="w-[30%] p-3 text-[14px] text-gray-500 border-r border-[#f5f6fb]">{field.label}</div>
                          <div className="w-[70%] p-3 text-[14px] text-[#333] whitespace-pre-wrap leading-relaxed">{field.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description Section */}
            <div id="description-tab" className="bg-white rounded-md shadow-sm border border-gray-100 mt-4 scroll-mt-14">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-[18px] font-bold text-[#333]">Description</h2>
              </div>
              <div className="p-5 text-[14px] text-[#333] leading-loose">
                <h3 className="text-[16px] font-bold mb-3">{product.name}</h3>
                <p className="mb-4">
                  The {product.name} is a high-performance solution designed to meet your rigorous demands. Built with premium materials and cutting-edge technology, it offers unparalleled reliability and efficiency. Whether you are using it for professional workloads or enthusiast-level applications, this product delivers exceptional results.
                </p>
                <p className="mb-4">
                  With its sleek design and versatile features, it seamlessly integrates into any setup. It provides robust capabilities while maintaining an intuitive user experience. Safety and security are built-in, ensuring you can operate with complete peace of mind.
                </p>
                <h4 className="text-[15px] font-bold mb-2">Buy {product.name} from Star Tech</h4>
                <p>
                  In Bangladesh, you can get original {product.name} From Star Tech. We have a large collection of latest {product.name.split(" ")[0]} products to purchase. Order Online Or Visit your Nearest <span className="text-[#ef4a23] hover:underline cursor-pointer">Star Tech Shop</span> to get yours at lowest price. The {product.name} comes with 1 year warranty.
                </p>
              </div>
            </div>
            
            {/* Price FAQ Block */}
            <div className="bg-white rounded-md shadow-sm border border-gray-100 mt-4">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-[18px] font-bold text-[#333]">What is the price of {product.name} in Bangladesh?</h2>
              </div>
              <div className="p-5 text-[14px] text-[#333] leading-loose">
                The latest price of {product.name} in Bangladesh is {formatPrice(product.price)}. You can buy the {product.name} at best price from our website or visit any of our showrooms.
              </div>
            </div>

            {/* Questions Section */}
            <div id="questions-tab" className="bg-white rounded-md shadow-sm border border-gray-100 mt-4 scroll-mt-14">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-[18px] font-bold text-[#333]">Questions (0)</h2>
                  <p className="text-[13px] text-gray-500 mt-1">Have question about this product? Get specific details about this product from expert.</p>
                </div>
                <button className="border border-[#3749bb] text-[#3749bb] hover:bg-gray-50 px-5 py-2 rounded text-[14px] font-semibold transition-colors cursor-pointer">
                  Ask Question
                </button>
              </div>
              <div className="p-16 flex flex-col items-center justify-center text-center">
                <div className="w-[60px] h-[60px] bg-[#f5f6fb] rounded-full flex items-center justify-center text-[#3749bb] mb-4">
                  <i className="material-icons text-[24px]">chat</i>
                </div>
                <p className="text-[14px] text-gray-500">There are no questions asked yet. Be the first one to ask a question.</p>
              </div>
            </div>

            {/* Reviews Section */}
            <div id="reviews-tab" className="bg-white rounded-md shadow-sm border border-gray-100 mt-4 scroll-mt-14">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-[18px] font-bold text-[#333]">Reviews (0)</h2>
                  <p className="text-[13px] text-gray-500 mt-1">Get specific details about this product from customers who own it.</p>
                </div>
                <button className="border border-[#3749bb] text-[#3749bb] hover:bg-gray-50 px-5 py-2 rounded text-[14px] font-semibold transition-colors cursor-pointer">
                  Write a Review
                </button>
              </div>
              <div className="p-16 flex flex-col items-center justify-center text-center">
                <div className="w-[60px] h-[60px] bg-[#f5f6fb] rounded-full flex items-center justify-center text-[#3749bb] mb-4">
                  <i className="material-icons text-[24px]">assignment</i>
                </div>
                <p className="text-[14px] text-gray-500">This product has no reviews yet. Be the first one to write a review.</p>
              </div>
            </div>

          </div>

          {/* Right: Sidebar (Similar Products) */}
          <div className="w-full lg:w-[300px] shrink-0 sticky top-[70px]">
            <div className="bg-white rounded-md shadow-sm border border-gray-100">
              <div className="p-4 text-center">
                <h3 className="text-[16px] font-bold text-[#3749bb]">Similar Product</h3>
              </div>
              <div className="flex flex-col">
                {related.map((prod) => (
                  <div key={prod.id} className="p-4 border-t border-gray-100 hover:shadow-md transition-shadow group flex items-start gap-3">
                    <div className="w-[80px] h-[80px] shrink-0 flex items-center justify-center bg-white p-1">
                      <Link href={prod.href || `/product/${prod.id}`}>
                        <img src={prod.image} alt={prod.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" />
                      </Link>
                    </div>
                    <div className="flex flex-col">
                      <Link 
                        href={prod.href || `/product/${prod.id}`}
                        className="text-[13px] text-[#333] hover:text-[#ef4a23] font-medium leading-snug line-clamp-3 mb-2"
                      >
                        {prod.name}
                      </Link>
                      <div className="text-[15px] font-bold text-[#ef4a23] mb-2">{formatPrice(prod.price)}</div>
                      <button 
                        onClick={() => toggleCompare(prod)}
                        className="flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-[#3749bb] font-medium transition-colors cursor-pointer"
                      >
                        <i className="material-icons text-[14px]">library_add</i>
                        Add to Compare
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
