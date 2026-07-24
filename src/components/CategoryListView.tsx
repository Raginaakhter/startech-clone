"use client";
import { useState, useEffect, useMemo } from "react";
import { getProductsByCategory } from "@/data/helpers";
import { navigationData } from "@/data/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

// ── Generate dynamic specs based on product name ──
function generateSpecs(name: string): string[] {
  const n = name.toLowerCase();

  if (n.includes("drone")) {
    const specs = [];
    if (n.includes("4k") || n.includes("hd")) specs.push("4K HD Camera");
    else if (n.includes("8k")) specs.push("8K UHD Camera");
    else specs.push("Image Sensor: 1/2.3-inch CMOS");
    if (n.includes("combo") || n.includes("controller")) specs.push("RC 2 Controller Included");
    if (n.includes("mini") || n.includes("toy")) {
      specs.push("Foldable and Durable Design");
      specs.push("Flight Time: 13-15 minutes");
      specs.push("2.4G Remote Control");
      specs.push("Distance: 80-100 meters");
    } else {
      specs.push("Max Flight Time: 34-46 min");
      specs.push("Lightweight Design");
      specs.push("10 km Video Transmission, 3-axis");
      specs.push("Camera Stabilization");
      specs.push("38 kph (Level 5) Wind Resistance,");
      specs.push("Intelligent Modes");
    }
    return specs;
  }

  if (n.includes("air fryer") || n.includes("fryer")) {
    return [
      "Capacity: 4-6 Liters",
      n.includes("dual") ? "Dual Basket Design" : "Single Basket",
      "Rated Power: 1500W",
      n.includes("digital") ? "Digital Touch Control" : "Smart Touch Control Panel",
      "Dishwasher-Safe Parts",
      "Auto Shut-off, Timer",
    ];
  }

  if (n.includes("laptop") || n.includes("notebook") || n.includes("macbook")) {
    return [
      'Display: 15.6" FHD IPS',
      "RAM: 8GB DDR4",
      "Storage: 512GB SSD",
      "Battery: Up to 7 Hours",
      n.includes("gaming") ? "Dedicated GPU" : "Integrated Graphics",
    ];
  }

  if (n.includes("monitor")) {
    return [
      "Panel: IPS Display",
      n.includes("4k") || n.includes("qhd") ? "Resolution: QHD/4K" : "Resolution: FHD 1920x1080",
      n.includes("gaming") ? "Refresh Rate: 165Hz+" : "Refresh Rate: 75Hz",
      "Response Time: 1-5ms",
      "Ports: HDMI, DisplayPort",
    ];
  }

  if (n.includes("pc") || n.includes("desktop") || n.includes("computer")) {
    return [
      n.includes("i5") ? "Processor: Intel Core i5" : n.includes("ryzen") ? "Processor: AMD Ryzen 5" : "Processor: Intel/AMD",
      "RAM: 8GB DDR4",
      "Storage: 256GB SSD",
      "Graphics: Integrated",
    ];
  }

  if (n.includes("phone") || n.includes("iphone") || n.includes("galaxy") || n.includes("redmi")) {
    return [
      n.includes("5g") ? "5G Connectivity" : "4G LTE",
      "RAM: 8GB",
      "Storage: 128GB/256GB",
      "Battery: 5000mAh",
    ];
  }

  if (n.includes("ac") || n.includes("conditioner")) {
    return [
      "Capacity: 1.5 Ton",
      "Type: Inverter",
      "Energy Rating: 5 Star",
      "Cooling Capacity: 18000 BTU",
    ];
  }

  if (n.includes("projector")) {
    return [
      "Brightness: 4000 Lumens",
      "Resolution: XGA/FHD",
      "Throw Ratio: 1.94-2.16",
      "Lamp Life: 15000 Hours",
    ];
  }

  if (n.includes("headset") || n.includes("headphone")) {
    return [
      "Driver: 50mm",
      "Surround: 7.1 RGB",
      "Connection: USB/3.5mm",
      "Microphone: Detachable",
    ];
  }

  if (n.includes("mouse")) {
    return [
      "Sensor: HERO 25K",
      "DPI: Up to 25600",
      "Connection: LIGHTSPEED",
      "Battery: 130 Hours",
    ];
  }

  if (n.includes("power supply") || n.includes("cv550")) {
    return [
      "Wattage: 550W",
      "Certification: 80+ Bronze",
      "Type: Non-Modular",
      "Fan: 120mm",
    ];
  }

  if (n.includes("printer")) {
    return [
      "Type: Laser MFP",
      "Speed: 38 ppm",
      "Duplex: Automatic",
      "Connectivity: USB, Ethernet",
    ];
  }

  if (n.includes("chair")) {
    return [
      "Type: Gaming Chair",
      "Material: PU Leather",
      "Max Load: 150kg",
      "Adjustable: Height, Armrest",
    ];
  }

  if (n.includes("power station") || n.includes("ecoflow") || n.includes("marsriva")) {
    return [
      "Capacity: 600Wh",
      "Output: AC/DC/USB",
      "Charging: Solar Compatible",
      "Weight: Portable Design",
    ];
  }

  if (n.includes("sewing")) {
    return [
      "Type: Electric",
      "Stitch Patterns: 24+",
      "Speed: Adjustable",
      "Built-in Light",
    ];
  }

  if (n.includes("keyboard")) {
    return [
      n.includes("mechanical") ? "Type: Mechanical" : "Type: Membrane",
      n.includes("wireless") || n.includes("bluetooth") ? "Connection: Wireless/BT" : "Connection: Wired USB",
      n.includes("rgb") ? "Backlight: RGB" : "Backlight: Single Color",
      n.includes("65%") || n.includes("67") ? "Layout: 65%" : n.includes("tkl") || n.includes("84") ? "Layout: TKL" : "Layout: Full Size",
    ];
  }

  if (n.includes("casing") || n.includes("tower")) {
    return [
      n.includes("mid tower") ? "Form Factor: Mid Tower ATX" : n.includes("full tower") ? "Form Factor: Full Tower" : "Form Factor: ATX",
      n.includes("mesh") ? "Front Panel: Mesh Airflow" : "Front Panel: Tempered Glass",
      n.includes("argb") || n.includes("rgb") ? "Lighting: ARGB" : "Lighting: N/A",
      "Pre-installed Fans: 3-4",
      "Drive Bays: SSD + HDD",
    ];
  }

  if (n.includes("motherboard")) {
    return [
      n.includes("ddr5") ? "Memory: DDR5 Support" : "Memory: DDR4 Support",
      n.includes("micro atx") || n.includes("matx") ? "Form Factor: Micro ATX" : n.includes("mini itx") ? "Form Factor: Mini ITX" : "Form Factor: ATX",
      n.includes("wifi") || n.includes("ax") ? "WiFi: Built-in WiFi 6" : "WiFi: N/A",
      n.includes("b760") ? "Chipset: Intel B760" : n.includes("z790") ? "Chipset: Intel Z790" : n.includes("b650") ? "Chipset: AMD B650" : "Chipset: Latest Gen",
      "PCIe: Gen 4/5 Support",
    ];
  }

  if (n.includes("graphics card") || n.includes("geforce") || n.includes("radeon") || n.includes("rtx")) {
    return [
      n.includes("4060 ti") ? "GPU: RTX 4060 Ti" : n.includes("4060") ? "GPU: RTX 4060" : n.includes("4070") ? "GPU: RTX 4070 SUPER" : "GPU: Latest Gen",
      n.includes("8g") || n.includes("8gb") ? "VRAM: 8GB GDDR6" : n.includes("12g") || n.includes("12gb") ? "VRAM: 12GB GDDR6X" : "VRAM: 8GB+",
      "Interface: PCIe 4.0 x16",
      "Ports: HDMI 2.1, DP 1.4a",
      "Cooling: Dual/Triple Fan",
    ];
  }

  if (n.includes("ram") || n.includes("ddr5") || n.includes("ddr4")) {
    return [
      n.includes("ddr5") ? "Type: DDR5" : "Type: DDR4",
      n.includes("32gb") ? "Capacity: 32GB (2x16GB)" : n.includes("16gb") ? "Capacity: 16GB" : "Capacity: 8GB",
      n.includes("6000") ? "Speed: 6000MHz" : n.includes("5600") ? "Speed: 5600MHz" : n.includes("5200") ? "Speed: 5200MHz" : "Speed: 3200MHz",
      n.includes("rgb") ? "Lighting: RGB" : "Lighting: N/A",
      "Form Factor: DIMM",
    ];
  }

  if (n.includes("ssd") || n.includes("nvme")) {
    return [
      n.includes("1tb") ? "Capacity: 1TB" : n.includes("500gb") ? "Capacity: 500GB" : n.includes("2tb") ? "Capacity: 2TB" : "Capacity: 256GB+",
      n.includes("nvme") || n.includes("m.2") ? "Interface: NVMe M.2" : "Interface: SATA III",
      n.includes("gen 4") || n.includes("pcie 4") ? "PCIe: Gen 4.0" : n.includes("gen 5") ? "PCIe: Gen 5.0" : "PCIe: Gen 3.0/4.0",
      "Read Speed: Up to 7,450 MB/s",
      "Form Factor: M.2 2280",
    ];
  }

  if (n.includes("router") || n.includes("wi-fi") || n.includes("wifi")) {
    return [
      n.includes("wifi 6") || n.includes("ax") ? "Standard: Wi-Fi 6 (802.11ax)" : "Standard: Wi-Fi 5 (802.11ac)",
      n.includes("ax5400") ? "Speed: AX5400" : n.includes("ac1200") ? "Speed: AC1200" : n.includes("ax1800") ? "Speed: AX1800" : "Speed: Dual Band",
      "Ports: Gigabit Ethernet",
      n.includes("mesh") ? "System: Mesh Compatible" : "Antennas: External",
      "Security: WPA3",
    ];
  }

  if (n.includes("switch") || n.includes("sg10") || n.includes("gs1") || n.includes("fs10")) {
    return [
      n.includes("16-port") || n.includes("16 port") ? "Ports: 16-Port" : n.includes("8-port") || n.includes("8 port") ? "Ports: 8-Port" : n.includes("24-port") ? "Ports: 24-Port" : "Ports: Multi-Port",
      n.includes("gigabit") ? "Speed: Gigabit (10/100/1000)" : "Speed: Fast Ethernet",
      n.includes("poe") ? "PoE: PoE+ Support" : "PoE: N/A",
      n.includes("managed") ? "Management: Managed" : "Management: Unmanaged",
      n.includes("rackmount") ? "Form: Desktop/Rackmount" : "Form: Desktop",
    ];
  }

  if (n.includes("smart watch") || n.includes("watch")) {
    return [
      n.includes("amoled") ? "Display: AMOLED" : "Display: LCD/TFT",
      "Health: Heart Rate, SpO2",
      n.includes("gps") ? "GPS: Built-in GPS" : "GPS: Connected GPS",
      "Water Resistance: 5ATM",
      "Battery: 7-14 Days",
    ];
  }

  if (n.includes("speaker")) {
    return [
      n.includes("bluetooth") || n.includes("portable") ? "Type: Bluetooth/Portable" : "Type: Active Bookshelf",
      n.includes("2.0") ? "Channel: 2.0 Stereo" : "Channel: Stereo",
      "Connectivity: Bluetooth 5.0",
      n.includes("waterproof") || n.includes("ip67") ? "Rating: IP67 Waterproof" : "Build: Premium",
      "Power: 20W+ Output",
    ];
  }

  if (n.includes("webcam")) {
    return [
      n.includes("1080p") || n.includes("hd pro") ? "Resolution: 1080p Full HD" : n.includes("4k") ? "Resolution: 4K UHD" : "Resolution: 720p HD",
      "Framerate: 30fps/60fps",
      "Microphone: Dual Built-in",
      "Connection: USB-A/USB-C",
      "Auto Focus: Yes",
    ];
  }

  if (n.includes("cpu cooler") || n.includes("cooler")) {
    return [
      n.includes("liquid") || n.includes("aio") || n.includes("360mm") || n.includes("240mm") ? "Type: Liquid AIO" : "Type: Air Tower",
      n.includes("360mm") ? "Radiator: 360mm" : n.includes("240mm") ? "Radiator: 240mm" : n.includes("120mm") ? "Radiator: 120mm" : "Height: 160mm",
      n.includes("lcd") || n.includes("digital") ? "Display: LCD Status Screen" : "Display: N/A",
      "TDP: Up to 250W",
      "Socket: Intel/AMD Universal",
    ];
  }

  if (n.includes("processor")) {
    return [
      n.includes("ryzen") ? "Platform: AMD AM4/AM5" : "Platform: Intel LGA 1700",
      n.includes("i5") || n.includes("ryzen 5") ? "Cores: 6C/12T" : n.includes("i7") || n.includes("ryzen 7") ? "Cores: 8C/16T" : "Cores: Multi-Core",
      "Cache: 16-32MB L3",
      "TDP: 65W-125W",
      "Integrated Graphics: Varies",
    ];
  }

  if (n.includes("tablet") || n.includes("ipad") || n.includes("tab")) {
    return [
      n.includes("10.9") || n.includes("11") ? 'Display: 10.9" IPS/OLED' : n.includes("12.9") ? 'Display: 12.9" Liquid Retina' : 'Display: 10.1"+ FHD',
      "RAM: 6-8GB",
      n.includes("128gb") ? "Storage: 128GB" : n.includes("64gb") ? "Storage: 64GB" : "Storage: 128GB+",
      n.includes("wifi") ? "Connectivity: WiFi" : "Connectivity: WiFi + LTE",
      "S Pen / Apple Pencil Support",
    ];
  }

  return [
    "Brand: " + (name.split(" ")[0] || "N/A"),
    "Condition: Brand New",
    "Warranty: 1 Year",
    "In Stock",
  ];
}

// ── Find parent category info from navigation ──
function findParentCategory(categoryHref: string): { name: string; href: string } | null {
  for (const topLevel of navigationData) {
    if (topLevel.href === categoryHref) return null;
    if (topLevel.children) {
      for (const child of topLevel.children) {
        if (child.href === categoryHref) return { name: topLevel.name, href: topLevel.href };
        if ((child as any).children) {
          for (const grandchild of (child as any).children) {
            if (grandchild.href === categoryHref) return { name: child.name, href: child.href };
          }
        }
      }
    }
  }
  return null;
}

// ── Find sibling categories (sub-category tags) ──
function findSiblingCategories(categoryHref: string): { name: string; href: string }[] {
  for (const topLevel of navigationData) {
    if (topLevel.children) {
      // Check if category is a direct child
      const isDirectChild = topLevel.children.some((c) => c.href === categoryHref);
      if (isDirectChild) {
        return topLevel.children.map((c) => ({ name: c.name, href: c.href }));
      }
      // Check grandchildren
      for (const child of topLevel.children) {
        if ((child as any).children) {
          const isGrandchild = (child as any).children.some((gc: any) => gc.href === categoryHref);
          if (isGrandchild) {
            return (child as any).children.map((gc: any) => ({ name: gc.name, href: gc.href }));
          }
        }
      }
    }
  }
  return [];
}

// ── Product Card for category listing ──
function CategoryProductCard({ product }: { product: any }) {
  const router = useRouter();
  const { cart, addToCart, toggleCompare, isInCompare } = useApp();
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  const formatPrice = (price: number) => price.toLocaleString("en-BD") + "৳";

  const savings = product.oldPrice ? product.oldPrice - product.price : 0;
  const discountPercent = product.oldPrice
    ? Math.round((savings / product.oldPrice) * 100)
    : 0;

  const inComp = isInCompare(product.id);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setShowCartModal(true);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(product);
    if (!inComp) {
      setShowCompareModal(true);
    }
  };

  const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const specs = useMemo(() => generateSpecs(product.name), [product.name]);

  return (
    <div className="bg-white rounded overflow-hidden border border-gray-200 flex flex-col h-full group relative">
      {/* Save badge */}
      {product.oldPrice && savings > 0 && (
        <span className="absolute top-2 left-2 bg-violet-900 text-white text-[10px] font-medium px-2 py-0.5 rounded z-10">
          Save: {formatPrice(savings)} (-{discountPercent}%)
        </span>
      )}

      {/* Image */}
      <div className="p-5 flex items-center justify-center aspect-square bg-[#f8f8f8] relative overflow-hidden shrink-0">
        <Link href={product.href} className="w-full h-full flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className="max-w-[80%] max-h-[80%] object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="px-4 py-3 flex flex-col flex-1">
        {/* Product name - bold, no underline */}
        <h4 className="text-[14px] font-bold text-[#333] leading-snug mb-3 min-h-[40px]">
          <Link href={product.href} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </h4>

        {/* Specs list - bigger text, more spacing */}
        <ul className="text-[13px] text-gray-600 mb-4 space-y-2 flex-1">
          {specs.slice(0, 4).map((spec, i) => (
            <li key={i} className="flex items-start gap-2 leading-snug">
              <span className="text-gray-400 shrink-0 mt-0.5">•</span>
              <span>{spec}</span>
            </li>
          ))}
        </ul>

        {/* Price - red/primary color */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-[18px] font-bold text-primary">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-[13px] text-gray-400 line-through font-normal">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Buy Now - outlined button with cart icon */}
        <button
          onClick={handleBuyNow}
          className="w-full border border-gray-300 hover:border-primary text-gray-600 hover:text-primary text-[13px] font-medium py-2.5 rounded-sm text-center transition-colors cursor-pointer mb-2 flex items-center justify-center gap-2"
        >
          <i className="material-icons text-[18px]">shopping_cart</i>
          <span>Buy Now</span>
        </button>

        {/* Add to Compare */}
        <button
          onClick={handleCompare}
          className={`w-full text-[12px] py-1 text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${inComp ? "text-primary font-semibold" : "text-gray-500 hover:text-primary"
            }`}
        >
          <i className="material-icons text-[16px]">library_add</i>
          <span>Add to Compare</span>
        </button>
      </div>

      {/* Compare Modal Popup */}
      {showCompareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
          <div className="bg-white rounded shadow-lg p-6 w-[550px] max-w-[95vw] relative flex flex-col justify-center min-h-[160px]">
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowCompareModal(false); }} 
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
            >
              <i className="material-icons text-[20px]">close</i>
            </button>
            <div className="flex items-start gap-3 mb-6 ml-2">
              <div className="text-[#1fb970] mt-0.5 flex-shrink-0">
                <i className="material-icons text-[22px]">check_circle</i>
              </div>
              <p className="text-[#333] text-[15px] leading-relaxed">
                Success: You have added <span className="text-primary">{product.name}</span> to your product comparison!
              </p>
            </div>
            <div className="flex gap-3 ml-10">
              <Link 
                href="/compare" 
                onClick={() => setShowCompareModal(false)}
                className="bg-[#3749bb] hover:bg-[#2b3992] text-white px-5 py-2 rounded text-[13px] font-bold transition-colors text-center"
              >
                Compare Now
              </Link>
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowCompareModal(false); }}
                className="border border-[#3749bb] text-[#3749bb] hover:bg-gray-50 px-5 py-2 rounded text-[13px] font-bold transition-colors cursor-pointer text-center"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal Popup */}
      {showCartModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
          <div className="bg-white rounded shadow-lg p-7 w-[650px] max-w-[95vw] relative flex flex-col justify-center min-h-[220px]">
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowCartModal(false); }} 
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
            >
              <i className="material-icons text-[20px]">close</i>
            </button>

            <div className="flex items-start justify-between mb-8 mt-2">
              <div className="flex items-start gap-3 flex-1 pr-6">
                <div className="text-[#1fb970] mt-0.5 flex-shrink-0">
                  <i className="material-icons text-[22px]">check_circle</i>
                </div>
                <p className="text-[#333] text-[16px] leading-relaxed">
                  You have added <span className="text-primary">{product.name}</span> to your shopping cart!
                </p>
              </div>

              <div className="border border-gray-100 rounded p-4 w-[180px] flex-shrink-0 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-500 text-[13px]">Cart quantity:</span>
                  <span className="font-bold text-[14px] text-[#333]">{cartQuantity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-[13px]">Cart Total:</span>
                  <span className="font-bold text-[14px] text-[#333]">{cartTotal}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 ml-9">
              <Link 
                href="/checkout/cart" 
                onClick={() => setShowCartModal(false)}
                className="bg-[#3749bb] hover:bg-[#2b3992] text-white px-8 py-2.5 rounded text-[14px] font-bold transition-colors text-center"
              >
                View Cart
              </Link>
              <Link
                href="/checkout" 
                onClick={() => setShowCartModal(false)}
                className="border border-[#3749bb] text-[#3749bb] hover:bg-gray-50 px-8 py-2.5 rounded text-[14px] font-bold transition-colors cursor-pointer text-center"
              >
                Confirm Order
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sidebar filter section ──
function FilterSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 py-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-[13px] font-bold text-[#333] cursor-pointer"
      >
        {title}
        <i className="material-icons text-[18px] text-gray-400">
          {open ? "expand_less" : "expand_more"}
        </i>
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

// ── Main Component ──
export default function CategoryListView({ category }: { category: any }) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1050000);
  const [sort, setSort] = useState("default");
  const [show, setShow] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const [availability, setAvailability] = useState({
    inStock: false,
    preOrder: false,
    upComing: false,
  });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const baseList = getProductsByCategory(category);

  // Find parent category & sibling sub-categories
  const parentCategory = useMemo(() => findParentCategory(category.href), [category.href]);
  const siblingCategories = useMemo(() => findSiblingCategories(category.href), [category.href]);

  // Extract brands from products
  const brands = useMemo(() => {
    const brandSet = new Set<string>();
    baseList.forEach((p: any) => {
      const firstWord = p.name.split(" ")[0];
      brandSet.add(firstWord);
    });
    return Array.from(brandSet);
  }, [category]);

  const priceMin = 0;
  const priceMax = 1050000;

  const applyFilters = () => {
    let results = [...baseList];
    if (minPrice > 0) results = results.filter((p: any) => p.price >= minPrice);
    if (maxPrice < priceMax) results = results.filter((p: any) => p.price <= maxPrice);

    if (sort === "price-low") results.sort((a: any, b: any) => a.price - b.price);
    else if (sort === "price-high") results.sort((a: any, b: any) => b.price - a.price);
    else if (sort === "name") results.sort((a: any, b: any) => a.name.localeCompare(b.name));

    setFilteredList(results);
    setCurrentPage(1);
  };

  useEffect(() => {
    setMinPrice(0);
    setMaxPrice(1050000);
    setSort("default");
    setCurrentPage(1);
    setFilteredList(baseList);
  }, [category]);

  const handleSortChange = (val: string) => {
    setSort(val);
    let sorted = [...filteredList];
    if (val === "price-low") sorted.sort((a: any, b: any) => a.price - b.price);
    else if (val === "price-high") sorted.sort((a: any, b: any) => b.price - a.price);
    else if (val === "name") sorted.sort((a: any, b: any) => a.name.localeCompare(b.name));
    else sorted = [...baseList];
    setFilteredList(sorted);
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(filteredList.length / show);
  const paginatedList = filteredList.slice((currentPage - 1) * show, currentPage * show);
  const showingFrom = (currentPage - 1) * show + 1;
  const showingTo = Math.min(currentPage * show, filteredList.length);

  const formatPrice = (price: number) => price.toLocaleString("en-BD") + "৳";

  return (
    <div className="max-w-[1300px] mx-auto px-4 w-full">
      {/* Breadcrumbs */}
      <div className="py-3 text-[12px] text-text-light flex items-center gap-1">
        <i className="material-icons text-[14px]">home</i>
        {parentCategory && (
          <>
            <span>/</span>
            <Link href={parentCategory.href} className="hover:text-primary transition-colors">
              {parentCategory.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="font-semibold text-text-main">{category.name}</span>
      </div>

      {/* Category Header */}
      <div className="mb-3">
        <h1 className="text-[18px] font-bold text-[#333] italic mb-1">
          {category.name} Price in Bangladesh
        </h1>
        <p className="text-[11px] text-gray-500 leading-relaxed">
          <span className="text-primary">{category.name}</span> Price in Bangladesh starts from BDT 5,250 and depending on the features and brand the price may go up to BDT 365,000. At Star Tech you can get the latest {category.name}s from popular brands like DJI. Browse below and order yours now!
        </p>
      </div>

      {/* Sub-category tags */}
      {siblingCategories.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {siblingCategories.map((sub, i) => (
            <Link
              key={i}
              href={sub.href}
              className={`px-3 py-1 text-[11px] rounded-full border transition-colors ${sub.href === category.href
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary"
                }`}
            >
              {sub.name}
            </Link>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-3">
        {/* ── Sidebar Filters ── */}
        <aside className="bg-white rounded border border-gray-200 p-3 h-fit lg:sticky lg:top-[140px]">
          {/* Price Range */}
          <FilterSection title="Price Range">
            <div className="px-1">
              <div className="relative h-4 mb-3 mt-1">
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-gray-200 rounded-full" />
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full"
                  style={{
                    left: `${((minPrice - priceMin) / (priceMax - priceMin)) * 100}%`,
                    right: `${100 - ((maxPrice - priceMin) / (priceMax - priceMin)) * 100}%`,
                  }}
                />
                <input
                  type="range"
                  min={priceMin}
                  max={priceMax}
                  step={500}
                  value={minPrice}
                  onChange={(e) => { setMinPrice(Number(e.target.value)); }}
                  className="absolute w-full top-0 h-4 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <input
                  type="range"
                  min={priceMin}
                  max={priceMax}
                  step={500}
                  value={maxPrice}
                  onChange={(e) => { setMaxPrice(Number(e.target.value)); }}
                  className="absolute w-full top-0 h-4 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-full h-7 border border-gray-300 rounded-sm px-2 outline-none text-[11px] focus:border-primary text-center"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-7 border border-gray-300 rounded-sm px-2 outline-none text-[11px] focus:border-primary text-center"
                />
              </div>
            </div>
          </FilterSection>

          {/* Availability */}
          <FilterSection title="Availability">
            <div className="space-y-1.5">
              {[
                { key: "inStock", label: "In Stock" },
                { key: "preOrder", label: "Pre Order" },
                { key: "upComing", label: "Up Coming" },
              ].map((item) => (
                <label key={item.key} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                  <input
                    type="checkbox"
                    checked={availability[item.key as keyof typeof availability]}
                    onChange={() =>
                      setAvailability({
                        ...availability,
                        [item.key]: !availability[item.key as keyof typeof availability],
                      })
                    }
                    className="accent-primary w-3.5 h-3.5"
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Brand */}
          {brands.length > 1 && (
            <FilterSection title="Brand">
              <div className="space-y-1.5">
                {brands.map((brand, i) => (
                  <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => {
                        if (selectedBrands.includes(brand)) {
                          setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                        } else {
                          setSelectedBrands([...selectedBrands, brand]);
                        }
                      }}
                      className="accent-primary w-3.5 h-3.5"
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </FilterSection>
          )}

          {/* ── Dynamic category-specific filters ── */}
          {(() => {
            const catName = category.name.toLowerCase();

            // UPS / Power Station filters
            if (catName.includes("ups") || catName.includes("power station") || catName.includes("power")) {
              return (
                <>
                  <FilterSection title="Capacity" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["600VA", "650VA", "800VA", "1000VA", "1200VA", "1500VA", "2000VA", "3000VA"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="AC Output Capacity" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["200W", "300W", "500W", "600W", "800W", "1000W", "1800W"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="Battery Capacity" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["7Ah", "9Ah", "12Ah", "20Ah", "28Ah", "40Ah"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="Output Waveform Type" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["Pure Sine Wave", "Modified Sine Wave", "Simulated Sine Wave"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="Features" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["USB Charging", "LCD Display", "Auto Restart", "Surge Protection", "Solar Compatible", "Portable"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                </>
              );
            }

            // Air Fryer filters
            if (catName.includes("air fryer") || catName.includes("fryer")) {
              return (
                <>
                  <FilterSection title="Capacity" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["Up to 4 Litre", "4.1 to 6 Litre", "6.1 to 8 Litre", "Above 8 Litre"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="Wattage" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["Up to 1500W", "1501W to 1800W", "Above 1800W"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="Basket Type" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["Single Basket", "Dual Basket"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="Controls" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["Digital Touch", "Manual Dial"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="Features" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["Dishwasher-Safe Parts", "Nonstick Basket", "Multi-Function", "Transparent Window", "Auto Turn-off"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                </>
              );
            }

            // Laptop filters
            if (catName.includes("laptop") || catName.includes("notebook")) {
              return (
                <>
                  <FilterSection title="Processor" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["Intel Core i3", "Intel Core i5", "Intel Core i7", "Intel Core i9", "AMD Ryzen 5", "AMD Ryzen 7", "Apple M3", "Apple M4"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="RAM" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["4GB", "8GB", "16GB", "32GB", "64GB"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="Storage" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["256GB SSD", "512GB SSD", "1TB SSD", "2TB SSD"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="Display Size" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {['13.3"', '14"', '15.6"', '16"', '17.3"'].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="Features" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["Touchscreen", "Backlit Keyboard", "Fingerprint Reader", "Thunderbolt", "2-in-1 Convertible"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                </>
              );
            }

            // Monitor filters
            if (catName.includes("monitor")) {
              return (
                <>
                  <FilterSection title="Panel Type" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["IPS", "VA", "TN", "OLED"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="Resolution" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["FHD (1080p)", "QHD (1440p)", "4K UHD", "5K"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="Refresh Rate" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["60Hz", "75Hz", "100Hz", "144Hz", "165Hz", "240Hz", "360Hz"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="Screen Size" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {['22"', '24"', '27"', '32"', '34" Ultrawide', '49" Super Ultrawide'].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="Features" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["Curved", "HDR", "G-Sync", "FreeSync", "USB-C", "Built-in Speaker", "Height Adjustable"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                </>
              );
            }

            // Phone / Mobile filters
            if (catName.includes("phone") || catName.includes("mobile")) {
              return (
                <>
                  <FilterSection title="RAM" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["4GB", "6GB", "8GB", "12GB", "16GB"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="Storage" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["64GB", "128GB", "256GB", "512GB", "1TB"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="Battery Capacity" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["4000-4500 mAh", "4500-5000 mAh", "5000-5500 mAh", "Above 5500 mAh"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="Features" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["5G", "AMOLED Display", "Fast Charging", "Wireless Charging", "Water Resistant", "NFC"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                </>
              );
            }

            // AC / Air Conditioner filters
            if (catName.includes("ac") || catName.includes("conditioner") || catName.includes("cooler")) {
              return (
                <>
                  <FilterSection title="Capacity" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["1 Ton", "1.5 Ton", "2 Ton", "2.5 Ton"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="Type" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["Inverter", "Non-Inverter", "Portable", "Cassette"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="Energy Rating" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["3 Star", "4 Star", "5 Star"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="Features" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["WiFi Control", "Auto Clean", "Turbo Cooling", "Sleep Mode", "Timer", "Anti-bacterial Filter"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                </>
              );
            }

            // Drone / Camera filters
            if (catName.includes("drone") || catName.includes("camera")) {
              return (
                <>
                  <FilterSection title="Camera Resolution" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["720p HD", "1080p FHD", "2.7K", "4K UHD", "8K"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="Flight Time" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["Up to 15 min", "15-30 min", "30-45 min", "Above 45 min"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="Range" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["Up to 100m", "100-500m", "500m-2km", "2km-10km", "Above 10km"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="Features" defaultOpen={false}>
                    <div className="space-y-1.5">
                      {["GPS", "Obstacle Avoidance", "Follow Me", "Return to Home", "Foldable", "FPV Goggles", "3-Axis Gimbal"].map((v, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                          <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                </>
              );
            }

            // Default: generic filters for any other category
            return (
              <FilterSection title="Features" defaultOpen={false}>
                <div className="space-y-1.5">
                  {["New Arrival", "Best Seller", "On Sale", "Free Shipping", "Warranty"].map((v, i) => (
                    <label key={i} className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-600">
                      <input type="checkbox" className="accent-primary w-3.5 h-3.5" /> {v}
                    </label>
                  ))}
                </div>
              </FilterSection>
            );
          })()}
        </aside>

        {/* ── Main Content Area ── */}
        <div>
          {/* Top bar */}
          <div className="bg-white rounded border border-gray-200 px-3 py-2 flex items-center justify-between mb-3">
            <h2 className="text-[14px] font-bold text-[#333]">{category.name}s</h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <label className="text-[12px] text-gray-500">Show:</label>
                <select
                  value={show}
                  onChange={(e) => { setShow(Number(e.target.value)); setCurrentPage(1); }}
                  className="h-7 border border-gray-300 rounded-sm px-2 outline-none text-[12px] bg-white cursor-pointer text-[#333] focus:border-primary"
                >
                  <option value={20}>20</option>
                  <option value={40}>40</option>
                  <option value={60}>60</option>
                </select>
              </div>
              <div className="flex items-center gap-1.5">
                <label className="text-[12px] text-gray-500">Sort By:</label>
                <select
                  value={sort}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="h-7 border border-gray-300 rounded-sm px-2 outline-none text-[12px] bg-white cursor-pointer text-[#333] focus:border-primary"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price (Low &gt; High)</option>
                  <option value="price-high">Price (High &gt; Low)</option>
                  <option value="name">Name (A &gt; Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {paginatedList.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5">
              {paginatedList.map((product: any) => (
                <CategoryProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center min-h-[300px] bg-white rounded border border-gray-200 p-10">
              <div className="w-16 h-16 rounded-full bg-orange-50 text-primary flex items-center justify-center mb-4">
                <i className="material-icons text-3xl">info_outline</i>
              </div>
              <h3 className="text-base font-bold text-text-main mb-1">No products in this category</h3>
              <p className="text-sm text-text-muted max-w-[400px]">We are updating this category soon. Please check back later!</p>
            </div>
          )}

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-5 bg-white rounded border border-gray-200 px-4 py-2.5">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-[12px] border border-gray-300 rounded-sm text-gray-500 hover:bg-gray-50 disabled:opacity-40 cursor-pointer disabled:cursor-default"
                >
                  PREV
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 text-[12px] rounded-sm text-center transition-colors cursor-pointer ${currentPage === page
                        ? "bg-primary text-white border border-primary"
                        : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-[12px] border border-gray-300 rounded-sm text-gray-500 hover:bg-gray-50 disabled:opacity-40 cursor-pointer disabled:cursor-default"
                >
                  NEXT
                </button>
              </div>
              <span className="text-[11px] text-gray-500">
                Showing {showingFrom} to {showingTo} of {filteredList.length} ({totalPages} Pages)
              </span>
            </div>
          )}

          {/* ── SEO Content Section ── */}
          <div className="bg-white rounded border border-gray-200 p-5 mt-6">
            <h2 className="text-[16px] font-bold text-[#333] mb-3">
              Kids-Friendly to Professional {category.name} Price In BD
            </h2>
            <p className="text-[12px] text-gray-600 leading-relaxed mb-5">
              {category.name} technology is evolving rapidly, and when it comes to the best {category.name.toLowerCase()} price in Bangladesh, Star Tech offers a wide range—from a mini toy {category.name.toLowerCase()} perfect for kids, to high-quality <Link href={category.href} className="text-primary hover:underline">{category.name.toLowerCase()}</Link> suited for professional usage. Imagine flying these radio-controlled birds in the sky, capturing vibrant HD videos with high FPS on first-person video mode for fun and entertainment. These high-tech gadgets combine top-tier enjoyment with serious aerial capability, making them a universal toy for family playtime and creative photography alike. Whether you are a parent seeking engaging, safe fun for kids or a skilled pilot looking for a {category.name.toLowerCase()} with 4K camera performance, Star Tech&apos;s selection balances cost-effective {category.name.toLowerCase()}s in BD with advanced features designed to cover both amusement and pro-grade tasks.
            </p>

            {/* Price List Table */}
            <h3 className="text-[14px] font-bold text-[#333] mb-2">
              Latest {category.name} Price List {new Date().getFullYear()}
            </h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-[12px] border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-2 px-3 font-bold text-[#333] border border-gray-200">{category.name} List</th>
                    <th className="text-right py-2 px-3 font-bold text-[#333] border border-gray-200 w-[120px]">Price in BD</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.slice(0, 8).map((product: any, i: number) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="py-2 px-3 border border-gray-200">
                        <Link href={product.href} className="text-primary hover:underline">{product.name}</Link>
                      </td>
                      <td className="py-2 px-3 border border-gray-200 text-right font-semibold">
                        {product.price.toLocaleString("en-BD")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* SEO Articles */}
            <h3 className="text-[14px] font-bold text-[#333] mb-2">
              Popular 4K {category.name} Brands for Aerial Fun
            </h3>
            <p className="text-[12px] text-gray-600 leading-relaxed mb-4">
              Popular {category.name.toLowerCase()} brands at Star Tech bring the perfect fuse of aerial fun and professional-grade performance to BD. Leading the pack with its feature-packed {category.name.toLowerCase()} modules and remote control units equipped with WiFi, GPS, and RC technology—and at competitive {category.name.toLowerCase()} prices in BD points. Star Tech offers affordable aircraft options, ideal for beginners wanting a VR experience for budget users. Each brand delivers high-value models featuring built-in Wi-Fi and stable GPS hold. Together, all brands cover every need—from casual joy-ride flying to serious aerial photography—and ensure families and enthusiasts in Bangladesh find their sweet intersection: entertainment, technology, and value.
            </p>

            <h3 className="text-[14px] font-bold text-[#333] mb-2">
              Best Toy to FPV {category.name}s for Beginners and Pros
            </h3>
            <p className="text-[12px] text-gray-600 leading-relaxed mb-4">
              Star Tech offers a {category.name.toLowerCase()} under 5000 taka in Bangladesh to meet budget users&apos; needs. These unmanned aerial vehicles range from mini toy {category.name.toLowerCase()}s to full professional models and enterprise-grade UAVs. Each category serves specific purposes—from entertainment and casual flying to creative videography, surveillance, and commercial operations.
            </p>

            <h3 className="text-[14px] font-bold text-[#333] mb-2">
              Mini Toy {category.name}s
            </h3>
            <p className="text-[12px] text-gray-600 leading-relaxed mb-4">
              Star Tech offers pocket toy {category.name.toLowerCase()} models that are increasingly popular in Bangladesh because of their reduced pricing. These mini {category.name.toLowerCase()} camera units often support full 1D or 4K resolution cameras transmitting via Wi-Fi. They are ideal for entertainment and for first flights in open spaces. Most are priced attractively, lightweight and radio-controlled, many of them even offer dual-camera setups with dual-battery systems. These {category.name.toLowerCase()}s for beginners and kids let them practice without any fear of high loss and aerial fun within such low-price points.
            </p>

            <h3 className="text-[14px] font-bold text-[#333] mb-2">
              Professional {category.name}
            </h3>
            <p className="text-[12px] text-gray-600 leading-relaxed mb-4">
              The best professional {category.name.toLowerCase()} models are here to buy from Star Tech for serious content creation and productivity. These come equipped with GPS navigation, stable flight modes, and high-resolution camera sensors. They are evaluates and semi-pro photographers who want the thrill with dual-camera or FPV {category.name.toLowerCase()} cameras. Premium models include dual-battery {category.name.toLowerCase()} features for extended flight times in commercial usage. They are also suitable for surveillance tasks in Bangladesh.
            </p>

            <h3 className="text-[14px] font-bold text-[#333] mb-2">
              Enterprise {category.name}
            </h3>
            <p className="text-[12px] text-gray-600 leading-relaxed mb-4">
              Here is our superior {category.name.toLowerCase()} product line-up, which is enterprise-grade built for security tasks and industrial usage. These UAV prototypes support advanced surveillance, videography, mapping, and inspections. By using these {category.name.toLowerCase()}s in agriculture, search and rescue operations, or infrastructure surveys, they deliver solid performance. Many enterprise models incorporate GPS, radio control, and FPV streaming for enhanced intervention. Eventually, these commercial {category.name.toLowerCase()} types capture wider industrial and professional needs across Bangladesh.
            </p>

            <h3 className="text-[14px] font-bold text-[#333] mb-2">
              Essential Guide to The Best {category.name} Cameras
            </h3>
            <p className="text-[12px] text-gray-600 leading-relaxed mb-4">
              Choosing the right {category.name.toLowerCase()} in Bangladesh depends on several important aspects that affect usability, safety, and performance. Whether you are getting a {category.name.toLowerCase()} to fly with cameras or for an FPV {category.name.toLowerCase()} with 4K camera, these key specs play a major role. From GPS functions to wind resistance, every feature matters when selecting these aircrafts for recreation, rescue, or research.
            </p>

            <h4 className="text-[13px] font-bold text-[#333] mb-1">Flight Time & Range</h4>
            <p className="text-[12px] text-gray-600 leading-relaxed mb-3">
              A longer flight means more fun and productivity in the sky. If you are flying a {category.name.toLowerCase()} for environmental research or aerial photography, range is key. Most {category.name.toLowerCase()}s in Bangladesh now offer up to 30 minutes of flight time and remote control distances as RC controller. Also keep in mind that the maximum allowed height for flying {category.name.toLowerCase()}s in Bangladesh is 200 feet or 60 meters above ground level.
            </p>

            <h4 className="text-[13px] font-bold text-[#333] mb-1">Camera Quality & Stabilization Feature</h4>
            <p className="text-[12px] text-gray-600 leading-relaxed mb-3">
              Look for a {category.name.toLowerCase()} with 4K camera, EIS, or gimbal stabilization for smooth and detailed footage. A high-quality {category.name.toLowerCase()} HD camera ensures clarity in both photos and videos. Whether for a fast FPV video, or true-to-life photography, {category.name.toLowerCase()}s with 1080p and 4K support bring professional results even in compact builds.
            </p>

            <h4 className="text-[13px] font-bold text-[#333] mb-1">GPS & Navigation Features</h4>
            <p className="text-[12px] text-gray-600 leading-relaxed mb-3">
              GPS ensures your {category.name.toLowerCase()} stays stable and returns safely. Features like return-to-home, waypoint navigation, and obstacle avoidance increase confidence during flight. These are crucial, especially in crowded areas and when flying near the maximum allowed height for flying in Bangladesh.
            </p>

            <h4 className="text-[13px] font-bold text-[#333] mb-1">Evaluate Build Quality & Portability</h4>
            <p className="text-[12px] text-gray-600 leading-relaxed mb-4">
              Lightweight, durable {category.name.toLowerCase()}s are ideal for outdoor activities and easy to carry. Choose a foldable WiFi toy {category.name.toLowerCase()} or a basic small fly {category.name.toLowerCase()} if portability matters. Crash-resistant frames and weather protection increase a {category.name.toLowerCase()}&apos;s lifespan—perfect for unpredictable Bangladeshi weather!
            </p>

            <h3 className="text-[14px] font-bold text-[#333] mb-2">
              Why Should You Buy {category.name} From Star Tech?
            </h3>
            <p className="text-[12px] text-gray-600 leading-relaxed">
              If you are looking to buy a {category.name.toLowerCase()} at best price in Bangladesh, <Link href="/" className="text-primary hover:underline">Star Tech</Link> is your go-to destination. Here you can find an extensive range of home appliances like <Link href={category.href} className="text-primary hover:underline">{category.name.toLowerCase()}s</Link>, ovens, <Link href="/washing-machine" className="text-primary hover:underline">washing machines</Link>, and so on. If you are looking for quality products at the best price and best after-sales service in Bangladesh, Star Tech is here for you. We also offer great deals, amazing discounts, and <Link href="/gadget" className="text-primary hover:underline">gadgets</Link> at the best price in BD. Visit your nearby Star Tech shop or order online to get your desired tech product.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
