"use client";
import { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { featuredProducts } from "@/data/products";
import { useApp } from "@/context/AppContext";

interface FinderLaptop {
  id: string | number;
  name: string;
  price: number;
  oldPrice?: number | null;
  saveBadge?: string;
  image: string;
  href: string;
  specs: {
    processor: string;
    ramStorage: string;
    display: string;
    features: string;
  };
}

const ALL_FINDER_LAPTOPS: FinderLaptop[] = [
  {
    id: "walton-n41",
    name: "Walton Prelude N41 Pro Celeron N4120 14\" FHD Laptop",
    price: 27500,
    oldPrice: 33900,
    saveBadge: "Save: 6,400৳",
    image: "https://www.startech.com.bd/image/cache/catalog/laptop/walton/prelude-n41-pro/prelude-n41-pro-01-200x200.webp",
    href: "/walton-prelude-n41-pro-laptop",
    specs: {
      processor: "Processor: Intel Celeron N4120 (4MB Cache, 1.10 GHz up to 2.60 GHz)",
      ramStorage: "RAM: 8GB DDR4, Storage: 256GB SSD",
      display: "Display: 14\" FHD (1920x1080)",
      features: "Features: Bangla Keyboard, Type-C",
    },
  },
  {
    id: "walton-n50",
    name: "Walton Prelude N50 Pro Pentium Silver N5030 14\" FHD Laptop",
    price: 29000,
    oldPrice: 34500,
    saveBadge: "Save: 5,500৳",
    image: "https://www.startech.com.bd/image/cache/catalog/laptop/walton/prelude-n50-pro/prelude-n50-pro-01-200x200.webp",
    href: "/walton-prelude-n50-pro-laptop",
    specs: {
      processor: "Processor: Intel Pentium Silver N5030 (4MB Cache, 1.10 GHz up to 3.10 GHz)",
      ramStorage: "RAM: 8GB DDR4, Storage: 256GB SSD",
      display: "Display: 14\" FHD (1920x1080)",
      features: "Features: Bangla Keyboard, Type-C",
    },
  },
  {
    id: "chuwi-i3",
    name: "Chuwi CoreBook X Core i3 10th Gen 14\" FHD Laptop",
    price: 45000,
    oldPrice: null,
    saveBadge: undefined,
    image: "https://www.startech.com.bd/image/cache/catalog/laptop/chuwi/corebook-x/corebook-x-01-200x200.webp",
    href: "/chuwi-corebook-x-laptop",
    specs: {
      processor: "Processor: Intel Core i3-10100Y (4MB Cache, 1.3GHz-3.9GHz)",
      ramStorage: "RAM: 8GB LPDDR4, Storage: 256GB M.2 2242 PCIe NVMe SSD",
      display: "Display: 14\" FHD (1920 x 1080) IPS Display",
      features: "Features: 4K Display Expansion, Wi-Fi 6, Bluetooth 5.2",
    },
  },
  {
    id: "acer-aspire-3-n4500",
    name: "Acer Aspire 3 A315-45 Celeron N4500 12GB RAM 15.6\" HD Laptop",
    price: 45800,
    oldPrice: null,
    saveBadge: undefined,
    image: "https://www.startech.com.bd/image/cache/catalog/laptop/acer/aspire-3-a315/aspire-3-a315-01-200x200.webp",
    href: "/acer-aspire-3-n4500-laptop",
    specs: {
      processor: "Processor: Intel Celeron N4500 (4M Cache, 1.10 GHz, up to 2.80 GHz)",
      ramStorage: "RAM: 12GB DDR4 3200MHz, Storage: 512GB SSD",
      display: "Display: 15.6\" HD, 60Hz",
      features: "Features: Two built-in stereo speakers, Type-C port",
    },
  },
  {
    id: "walton-pasion-bx510u",
    name: "Walton Passion BX510U Core i5 10th Gen 15.6\" FHD Laptop",
    price: 46500,
    oldPrice: null,
    saveBadge: undefined,
    image: "https://www.startech.com.bd/image/cache/catalog/laptop/walton/passion-bx510u/passion-bx510u-01-200x200.webp",
    href: "/walton-passion-bx510u-laptop",
    specs: {
      processor: "Processor: Intel Core i5-10210U (6M Cache, 1.60 GHz up to 4.20 GHz)",
      ramStorage: "RAM: 8GB 2666MHz, Storage: 512GB SATA III M.2 2280 SSD",
      display: "Display: 15.6\" FHD (1920 x 1080)",
      features: "Features: Built-in touchpad, Type-C",
    },
  },
  {
    id: "smart-flairedge-i5",
    name: "Smart Flairedge Core i5 13th Gen 15.6\" FHD Laptop",
    price: 59500,
    oldPrice: null,
    saveBadge: undefined,
    image: "https://www.startech.com.bd/image/cache/catalog/laptop/smart/flairedge-i5/flairedge-i5-01-200x200.webp",
    href: "/smart-flairedge-i5-laptop",
    specs: {
      processor: "Processor: Intel Core i5-1315U (12MB Smart Cache, Up to 4.5 GHz)",
      ramStorage: "RAM: 8GB DDR4, Storage: 512GB NVMe PCIe SSD",
      display: "Display: 15.6\" FHD (1920x1080) Anti-Glare",
      features: "Features: Backlit Keyboard, Wi-Fi 6, Type-C",
    },
  },
  {
    id: "asus-vivobook-go-15",
    name: "Asus Vivobook Go 15 E1504FA Intel N150 15.6\" FHD Laptop",
    price: 61500,
    oldPrice: null,
    saveBadge: undefined,
    image: "https://www.startech.com.bd/image/cache/catalog/laptop/asus/vivobook-go-15-e1504fa/vivobook-go-15-e1504fa-01-200x200.webp",
    href: "/asus-vivobook-go-15-laptop",
    specs: {
      processor: "Processor: Intel N150 (6MB Cache, up to 3.6 GHz)",
      ramStorage: "RAM: 8GB LPDDR5, Storage: 512GB M.2 NVMe PCIe 4.0 SSD",
      display: "Display: 15.6\" FHD (1920 x 1080), 60Hz, IPS, 250nits",
      features: "Features: Privacy Shutter, Backlit Keyboard, Military Grade",
    },
  },
  {
    id: "asus-vivobook-go-cool-silver",
    name: "Asus Vivobook Go 15 E1504FA Intel N150 15.6\" FHD Laptop Cool Silver",
    price: 61500,
    oldPrice: null,
    saveBadge: undefined,
    image: "https://www.startech.com.bd/image/cache/catalog/laptop/asus/vivobook-go-15-e1504fa/vivobook-go-15-e1504fa-cool-silver-01-200x200.webp",
    href: "/asus-vivobook-go-15-cool-silver-laptop",
    specs: {
      processor: "Processor: Intel N150 (6MB Cache, up to 3.6 GHz)",
      ramStorage: "RAM: 8GB LPDDR5, Storage: 512GB M.2 NVMe PCIe 4.0 SSD",
      display: "Display: 15.6\" FHD (1920 x 1080), 60Hz, IPS, 250nits",
      features: "Features: Privacy Shutter, Backlit Keyboard, Military Grade",
    },
  },
  {
    id: "acer-aspire-15-ryzen3",
    name: "Acer Aspire 15 A515-42 Ryzen 3 7320U 8GB 15.6\" FHD Laptop",
    price: 63500,
    oldPrice: null,
    saveBadge: undefined,
    image: "https://www.startech.com.bd/image/cache/catalog/laptop/acer/aspire-15-a515-42/aspire-15-a515-42-01-200x200.webp",
    href: "/acer-aspire-15-ryzen-3-laptop",
    specs: {
      processor: "Processor: Ryzen 3 7320U (4MB L3 Cache, up to 4.1GHz)",
      ramStorage: "RAM: 8GB DDR4 3200MHz, Storage: 512GB PCIe Gen4 NVMe SSD",
      display: "Display: 15.6\" FHD (1920 x 1080) IPS LED Display, 60 Hz",
      features: "Features: Stereo Speaker, Wi-Fi 6, HD WebCam, Bluetooth 5.2",
    },
  },
  {
    id: "dell-15-dc15250",
    name: "Dell 15 DC15250 Core 3 100U 15.6\" FHD Laptop",
    price: 64000,
    oldPrice: null,
    saveBadge: undefined,
    image: "https://www.startech.com.bd/image/cache/catalog/laptop/dell/15-dc15250/15-dc15250-01-200x200.webp",
    href: "/dell-15-dc15250-laptop",
    specs: {
      processor: "Processor: Intel Core 3 100U (6 cores, up to 4.7 GHz)",
      ramStorage: "RAM: 8GB DDR4 3200MHz, Storage: 512GB M.2 PCIe NVMe SSD",
      display: "Display: 15.6\" FHD, 120Hz, WVA, IPS, Anti-Glare, 250 nits",
      features: "Features: Full-Size Keyboard, Type-C, Wi-Fi 6",
    },
  },
  {
    id: "hp-15-fd0807tu",
    name: "HP 15-fd0807TU Intel Core i3 13th Gen 15.6\" FHD Laptop",
    price: 65990,
    oldPrice: null,
    saveBadge: undefined,
    image: "https://www.startech.com.bd/image/cache/catalog/laptop/hp/15-fd0807tu/15-fd0807tu-01-200x200.webp",
    href: "/hp-15-fd0807tu-laptop",
    specs: {
      processor: "Processor: Intel Core i3 13th Gen (10MB, Up to 4.5 GHz)",
      ramStorage: "RAM: 8GB DDR4 3200MHz, Storage: 512GB PCIe NVMe M.2 SSD",
      display: "Display: 15.6\" FHD (1920 x 1080), Anti-glare, 62.5% sRGB, 250nits",
      features: "Features: Privacy Shutter, Type-C, Wi-Fi 6, Bluetooth 5.4",
    },
  },
  {
    id: "hp-15-fd0808tu",
    name: "HP 15-fd0808TU Intel Core i3 13th Gen 15.6\" FHD Laptop Copilot+PC",
    price: 65990,
    oldPrice: null,
    saveBadge: undefined,
    image: "https://www.startech.com.bd/image/cache/catalog/laptop/hp/15-fd0808tu/15-fd0808tu-01-200x200.webp",
    href: "/hp-15-fd0808tu-laptop",
    specs: {
      processor: "Processor: Intel Core i3 13th Gen (10MB, Up to 4.5 GHz)",
      ramStorage: "RAM: 8GB DDR4 3200MHz, Storage: 512GB PCIe NVMe M.2 SSD",
      display: "Display: 15.6\" FHD (1920 x 1080), IPS, 250nits",
      features: "Features: Privacy Shutter, Type-C, Wi-Fi 6, Backlit Keyboard, Copilot Key",
    },
  },
  {
    id: "acer-aspire-lite-al15",
    name: "Acer Aspire Lite AL15-41 AMD Ryzen 3 7320U 15.6\" FHD Laptop",
    price: 66000,
    oldPrice: null,
    saveBadge: undefined,
    image: "https://www.startech.com.bd/image/cache/catalog/laptop/acer/aspire-lite-al15-41/aspire-lite-al15-41-01-200x200.webp",
    href: "/acer-aspire-lite-al15-41-laptop",
    specs: {
      processor: "Processor: Ryzen 3 7320U (up to 4.1 GHz)",
      ramStorage: "RAM: 8GB DDR4 3200MHz, Storage: 512GB PCIe NVMe SSD",
      display: "Display: 15.6\" FHD (1920x1080) LED Display",
      features: "Features: Stereo Speaker, Ethernet (RJ45)",
    },
  },
  {
    id: "walton-passion-bk710u",
    name: "Walton Passion BK710U Core i7 10th Gen 15.6\" FHD Laptop",
    price: 67500,
    oldPrice: 77750,
    saveBadge: "Save: 10,250৳",
    image: "https://www.startech.com.bd/image/cache/catalog/laptop/walton/passion-bk710u/passion-bk710u-01-200x200.webp",
    href: "/walton-passion-bk710u-laptop",
    specs: {
      processor: "Processor: Intel Core i7-10510U (8MB Cache, 1.80GHz up to 4.9GHz)",
      ramStorage: "RAM: 8GB 2666MHz, Storage: 512GB SATA III M.2 2280 SSD",
      display: "Display: 15.6\" FHD (1920 x 1080)",
      features: "Features: Built-in array microphone, Type-C",
    },
  },
  {
    id: "hp-15-fd0176tu",
    name: "HP 15-fd0176TU Intel Core i3 13th Gen 15.6\" FHD Laptop",
    price: 71000,
    oldPrice: null,
    saveBadge: undefined,
    image: "https://www.startech.com.bd/image/cache/catalog/laptop/hp/15-fd0176tu/15-fd0176tu-01-200x200.webp",
    href: "/hp-15-fd0176tu-laptop",
    specs: {
      processor: "Processor: Intel Core i3 13th Gen (10MB, Up to 4.5 GHz)",
      ramStorage: "RAM: 16GB DDR4 3200MHz, Storage: 512GB PCIe NVMe M.2 SSD",
      display: "Display: 15.6\" FHD (1920 x 1080), Anti-glare, 62.5% sRGB, 250nits",
      features: "Features: Privacy Shutter, Type-C, Wi-Fi 6, Bluetooth 5.4",
    },
  },
  {
    id: "lenovo-ideapad-slim-3",
    name: "Lenovo IdeaPad Slim 3 15IRU8 Core i5 13th Gen 15.6\" FHD Laptop",
    price: 56999,
    oldPrice: 62000,
    saveBadge: "1,500৳ Discount on Online Order",
    image: "https://www.startech.com.bd/image/cache/catalog/laptop/lenovo/ideapad-slim-3-15iru8/ideapad-slim-3-15iru8-01-200x200.webp",
    href: "/lenovo-ideapad-slim-3-15iru8",
    specs: {
      processor: "Processor: Intel Core i5 13th Gen 1335U (12MB Cache, Up to 4.6 GHz)",
      ramStorage: "RAM: 8GB LPDDR5, Storage: 512GB M.2 PCIe 4.0 SSD",
      display: "Display: 15.6\" FHD (1920x1080) Anti-Glare IPS",
      features: "Features: Privacy Shutter, Dolby Audio, Type-C",
    },
  },
  {
    id: "asus-tuf-gaming-a15",
    name: "ASUS TUF Gaming A15 FA506NF Ryzen 5 7535HS 15.6\" FHD Laptop",
    price: 62500,
    oldPrice: 67000,
    saveBadge: "Save: 4,500৳",
    image: "https://www.startech.com.bd/image/cache/catalog/laptop/asus/tuf-gaming-a15-fa506nf/tuf-gaming-a15-fa506nf-01-200x200.webp",
    href: "/asus-tuf-gaming-a15-fa506nf",
    specs: {
      processor: "Processor: AMD Ryzen 5 7535HS (19MB Cache, up to 4.55 GHz)",
      ramStorage: "RAM: 8GB DDR5 4800MHz, Storage: 512GB M.2 NVMe SSD",
      display: "Display: 15.6\" FHD (1920 x 1080) 144Hz IPS",
      features: "Features: NVIDIA GeForce RTX 2050 4GB GPU, RGB Backlit",
    },
  },
  {
    id: "apple-macbook-air-m1",
    name: "Apple MacBook Air 13.3-Inch M1 Chip 8GB RAM 256GB SSD",
    price: 88500,
    oldPrice: 95000,
    saveBadge: "Save: 6,500৳",
    image: "https://www.startech.com.bd/image/cache/catalog/laptop/apple/macbook-air-m1/macbook-air-m1-01-200x200.webp",
    href: "/apple-macbook-air-m1",
    specs: {
      processor: "Processor: Apple M1 chip 8-core CPU with 4 performance cores",
      ramStorage: "RAM: 8GB Unified Memory, Storage: 256GB SSD",
      display: "Display: 13.3\" Retina Display with True Tone (2560 x 1600)",
      features: "Features: Touch ID, Magic Keyboard, Thunderbolt 3",
    },
  },
  {
    id: "msi-thin-gf63",
    name: "MSI Thin GF63 Core i7 12th Gen RTX 3050 15.6\" 144Hz Gaming Laptop",
    price: 84500,
    oldPrice: 92000,
    saveBadge: "Save: 7,500৳",
    image: "https://www.startech.com.bd/image/cache/catalog/laptop/msi/thin-gf63/thin-gf63-01-200x200.webp",
    href: "/msi-thin-gf63-laptop",
    specs: {
      processor: "Processor: Intel Core i7-12650H (24MB Cache, Up to 4.7 GHz)",
      ramStorage: "RAM: 8GB DDR4 3200MHz, Storage: 512GB NVMe PCIe SSD",
      display: "Display: 15.6\" FHD (1920x1080), 144Hz, IPS-Level",
      features: "Features: NVIDIA GeForce RTX 3050 4GB GPU, Red Backlit",
    },
  },
  {
    id: "dell-vostro-3520",
    name: "Dell Vostro 3520 Core i3 12th Gen 15.6\" FHD Laptop",
    price: 41500,
    oldPrice: 45000,
    saveBadge: "Save: 3,500৳",
    image: "https://www.startech.com.bd/image/cache/catalog/laptop/dell/vostro-3520/vostro-3520-01-200x200.webp",
    href: "/dell-vostro-3520-laptop",
    specs: {
      processor: "Processor: Intel Core i3-1215U (10MB Cache, Up to 4.4 GHz)",
      ramStorage: "RAM: 8GB DDR4, Storage: 256GB M.2 PCIe NVMe SSD",
      display: "Display: 15.6\" FHD (1920 x 1080) 120Hz 250 nits",
      features: "Features: Waves MaxxAudio Pro, Spill-resistant keyboard",
    },
  },
];

function FinderProductsScreen() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { cart, addToCart, toggleCompare, isInCompare } = useApp();

  const maxPriceParam = searchParams.get("maxPrice");
  const processorParam = searchParams.get("processor") || "all";
  const brandParam = searchParams.get("brand") || "all";

  // Filter, Sort and Pagination State
  const [sortBy, setSortBy] = useState("price-low");
  const [showPerPage, setShowPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  // Popup Modal States matching user's screenshots
  const [cartModalProduct, setCartModalProduct] = useState<FinderLaptop | null>(null);
  const [compareModalProduct, setCompareModalProduct] = useState<FinderLaptop | null>(null);

  // Cart quantity & cart total calculations
  const cartQuantity = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  // Filter data
  const filteredProducts = useMemo(() => {
    let list = [...ALL_FINDER_LAPTOPS];

    if (maxPriceParam) {
      const maxP = Number(maxPriceParam);
      list = list.filter((p) => p.price <= maxP);
    }

    if (processorParam && processorParam !== "all") {
      list = list.filter((p) => p.name.toLowerCase().includes(processorParam.toLowerCase()));
    }

    if (brandParam && brandParam !== "all") {
      list = list.filter((p) => p.name.toLowerCase().includes(brandParam.toLowerCase()));
    }

    // Sort
    if (sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [maxPriceParam, processorParam, brandParam, sortBy]);

  // Pagination calculation
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / showPerPage) || 1;
  const startIndex = (currentPage - 1) * showPerPage;
  const paginatedList = filteredProducts.slice(startIndex, startIndex + showPerPage);
  const showingFrom = totalItems > 0 ? startIndex + 1 : 0;
  const showingTo = Math.min(startIndex + showPerPage, totalItems);

  const formatPrice = (price: number) => price.toLocaleString("en-BD") + "৳";

  const handleBuyNow = (product: FinderLaptop) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setCartModalProduct(product);
  };

  const handleCompare = (product: FinderLaptop) => {
    toggleCompare(product);
    setCompareModalProduct(product);
  };

  return (
    <div className="bg-[#f2f4f8] min-h-screen py-4 font-sans">
      <div className="max-w-[1340px] mx-auto px-3">
        
        {/* Breadcrumb Bar */}
        <div className="text-[12px] text-[#64748b] flex items-center gap-1.5 mb-3">
          <Link href="/" className="hover:text-[#3749bb] flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </Link>
          <span>/</span>
          <Link href="/tool/finder" className="hover:text-[#3749bb]">Laptop Finder</Link>
          <span>/</span>
          <span className="text-[#111827] font-semibold">Products</span>
        </div>

        {/* Top Header Control Bar */}
        <div className="bg-white rounded-lg p-3 border border-[#e5e7eb] shadow-xs flex items-center justify-between mb-4">
          <Link
            href="/tool/finder"
            className="bg-[#3749bb] hover:bg-[#2b3992] text-white text-[12px] font-bold px-4 py-2 rounded transition-colors"
          >
            Need Help?
          </Link>

          <div className="flex items-center gap-4">
            {/* Show Per Page Dropdown */}
            <div className="flex items-center gap-1.5 text-[12px]">
              <span className="text-[#6b7280]">Show:</span>
              <select
                value={showPerPage}
                onChange={(e) => {
                  setShowPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="h-8 border border-[#d1d5db] rounded px-2 text-[12px] bg-white outline-none focus:border-[#3749bb] cursor-pointer"
              >
                <option value={20}>20</option>
                <option value={40}>40</option>
                <option value={60}>60</option>
              </select>
            </div>

            {/* Sort By Dropdown */}
            <div className="flex items-center gap-1.5 text-[12px]">
              <span className="text-[#6b7280]">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-8 border border-[#d1d5db] rounded px-2 text-[12px] bg-white outline-none focus:border-[#3749bb] cursor-pointer font-medium"
              >
                <option value="price-low">Price (Low &gt; High)</option>
                <option value="price-high">Price (High &gt; Low)</option>
                <option value="name">Name (A &gt; Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 5-Column Responsive Product Grid */}
        {paginatedList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-6">
            {paginatedList.map((product) => {
              const inComp = isInCompare(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg border border-[#e5e7eb] p-3 flex flex-col justify-between hover:shadow-md transition-all group relative"
                >
                  {/* Save Badge Header */}
                  {product.saveBadge && (
                    <span className="absolute top-2 left-2 bg-[#6b21a8] text-white text-[9px] font-bold px-2 py-0.5 rounded z-10">
                      {product.saveBadge}
                    </span>
                  )}

                  <div>
                    {/* Image */}
                    <div className="h-40 flex items-center justify-center p-2 mb-2 bg-white relative overflow-hidden">
                      <Link href={product.href} className="w-full h-full flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-36 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-[12px] font-bold text-[#111827] line-clamp-2 leading-snug mb-2 min-h-[34px]">
                      <Link href={product.href} className="hover:text-[#ef4a23] transition-colors">
                        {product.name}
                      </Link>
                    </h3>

                    {/* Specs Bullet List */}
                    <ul className="text-[10px] text-[#4b5563] space-y-1 mb-3 leading-tight border-t border-[#f3f4f6] pt-2">
                      <li className="flex items-start gap-1">
                        <span className="text-[#9ca3af] shrink-0">•</span>
                        <span>{product.specs.processor}</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="text-[#9ca3af] shrink-0">•</span>
                        <span>{product.specs.ramStorage}</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="text-[#9ca3af] shrink-0">•</span>
                        <span>{product.specs.display}</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <span className="text-[#9ca3af] shrink-0">•</span>
                        <span>{product.specs.features}</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    {/* Price Tag */}
                    <div className="flex items-baseline gap-1.5 mb-2.5">
                      <span className="text-[14px] font-bold text-[#ef4a23]">{formatPrice(product.price)}</span>
                      {product.oldPrice && (
                        <span className="text-[11px] text-[#9ca3af] line-through">
                          {formatPrice(product.oldPrice)}
                        </span>
                      )}
                    </div>

                    {/* Buy Now Button */}
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="w-full bg-[#e0e7ff] hover:bg-[#3749bb] text-[#3749bb] hover:text-white border border-[#3749bb]/30 text-[11px] font-bold py-1.5 rounded transition-all cursor-pointer flex items-center justify-center gap-1.5 mb-1.5"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>Buy Now</span>
                    </button>

                    {/* Add to Compare */}
                    <button
                      onClick={() => handleCompare(product)}
                      className={`w-full text-[10px] py-1 flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                        inComp ? "text-[#ef4a23] font-bold" : "text-[#6b7280] hover:text-[#3749bb]"
                      }`}
                    >
                      <span>➕</span>
                      <span>{inComp ? "Added to Compare" : "Add to Compare"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-10 text-center border border-[#e5e7eb] mb-6">
            <h3 className="text-base font-bold text-[#111827] mb-1">No products match your filter criteria.</h3>
            <p className="text-xs text-[#6b7280] mb-4">Try resetting your filters or expanding your budget range.</p>
            <Link
              href="/tool/finder"
              className="bg-[#3749bb] text-white text-xs font-bold px-4 py-2 rounded inline-block"
            >
              Reset Laptop Finder Filters
            </Link>
          </div>
        )}

        {/* Bottom Pagination & Counter */}
        {totalPages > 0 && (
          <div className="bg-white rounded-lg border border-[#e5e7eb] p-3 flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-[11px] font-bold border border-[#d1d5db] rounded text-[#4b5563] hover:bg-[#f3f4f6] disabled:opacity-40 cursor-pointer disabled:cursor-default"
              >
                PREV
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 text-[11px] font-bold rounded text-center transition-colors cursor-pointer ${
                    currentPage === page
                      ? "bg-[#ef4a23] text-white border border-[#ef4a23]"
                      : "border border-[#d1d5db] text-[#374151] hover:bg-[#f3f4f6]"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-[11px] font-bold border border-[#d1d5db] rounded text-[#4b5563] hover:bg-[#f3f4f6] disabled:opacity-40 cursor-pointer disabled:cursor-default"
              >
                NEXT
              </button>
            </div>

            <span className="text-[11px] text-[#6b7280]">
              Showing {showingFrom} to {showingTo} of {totalItems} ({totalPages} Pages)
            </span>
          </div>
        )}
      </div>

      {/* 1. Buy Now Cart Modal Popup (Matching User Screenshot 1) */}
      {cartModalProduct && (
        <div className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl p-6 w-[580px] max-w-[95vw] relative flex flex-col justify-between min-h-[170px] border border-[#e5e7eb] animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setCartModalProduct(null)}
              className="absolute top-3 right-3 text-[#9ca3af] hover:text-[#374151] p-1 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-start justify-between gap-4 mb-6 mt-1">
              {/* Green checkmark and success message */}
              <div className="flex items-start gap-3 flex-1">
                <div className="w-6 h-6 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-[14px] text-[#1e293b] leading-snug">
                  You have added <span className="text-[#ef4a23] font-bold">{cartModalProduct.name}</span> to your shopping cart!
                </p>
              </div>

              {/* Right side summary box matching screenshot */}
              <div className="border border-[#e2e8f0] rounded p-3 text-[13px] text-[#475569] min-w-[160px] bg-[#fafafa]">
                <div className="flex justify-between items-center mb-1">
                  <span>Cart quantity:</span>
                  <strong className="text-[#111827] font-bold">{cartQuantity}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span>Cart Total:</span>
                  <strong className="text-[#111827] font-bold">{cartTotal.toLocaleString("en-BD")}</strong>
                </div>
              </div>
            </div>

            {/* Bottom Action Buttons matching screenshot */}
            <div className="flex items-center gap-3">
              <Link
                href="/checkout/cart"
                onClick={() => setCartModalProduct(null)}
                className="bg-[#3749bb] hover:bg-[#2b3992] text-white px-6 py-2.5 rounded text-[13px] font-bold transition-colors text-center"
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                onClick={() => setCartModalProduct(null)}
                className="border border-[#3749bb] text-[#3749bb] hover:bg-[#f8fafc] px-6 py-2.5 rounded text-[13px] font-bold transition-colors cursor-pointer text-center"
              >
                Confirm Order
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 2. Add to Compare Modal Popup (Matching User Screenshot 2) */}
      {compareModalProduct && (
        <div className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl p-6 w-[560px] max-w-[95vw] relative flex flex-col justify-between min-h-[160px] border border-[#e5e7eb] animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setCompareModalProduct(null)}
              className="absolute top-3 right-3 text-[#9ca3af] hover:text-[#374151] p-1 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-start gap-3 mb-6 mt-1">
              {/* Green Checkmark */}
              <div className="w-6 h-6 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-[14px] text-[#1e293b] leading-snug">
                Success: You have added <span className="text-[#ef4a23] font-bold">{compareModalProduct.name}</span> to your product comparison!
              </p>
            </div>

            {/* Bottom Action Buttons matching screenshot */}
            <div className="flex items-center gap-3">
              <Link
                href="/compare"
                onClick={() => setCompareModalProduct(null)}
                className="bg-[#3749bb] hover:bg-[#2b3992] text-white px-6 py-2.5 rounded text-[13px] font-bold transition-colors text-center"
              >
                Compare Now
              </Link>
              <button
                onClick={() => setCompareModalProduct(null)}
                className="border border-[#3749bb] text-[#3749bb] hover:bg-[#f8fafc] px-6 py-2.5 rounded text-[13px] font-bold transition-colors cursor-pointer text-center"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FinderProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#f2f4f8] min-h-screen py-10 flex items-center justify-center">
          <h3 className="text-[#6b7280] text-sm">Loading Matched Laptops...</h3>
        </div>
      }
    >
      <FinderProductsScreen />
    </Suspense>
  );
}
