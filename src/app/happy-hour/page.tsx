"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

const CATEGORIES = [
  { id: "motherboard", name: "Motherboard", href: "/component/motherboard" },
  { id: "laptop", name: "Laptop", href: "/laptop-notebook" },
  { id: "monitor", name: "Monitor", href: "/monitor" },
  { id: "smart-watch", name: "Smart Watch", href: "/gadget/smart-watch" },
  { id: "keyboard", name: "Keyboard", href: "/keyboard" },
  { id: "mouse", name: "Mouse", href: "/mouse" },
  { id: "headphone", name: "Headphone", href: "/headphone" },
  { id: "desktop", name: "Desktop", href: "/desktops" },
];

const PRODUCTS_DATA: Record<string, Array<{ id: string; name: string; price: number; oldPrice?: number; save: number; image: string }>> = {
  motherboard: [
    { id: "mb-1", name: "Gigabyte B760M DS3H AX DDR5 Micro ATX Motherboard", price: 16500, oldPrice: 17500, save: 1000, image: "https://www.startech.com.bd/image/cache/catalog/motherboard/gigabyte/b760m-ds3h-ax/b760m-ds3h-ax-500x500.webp" },
    { id: "mb-2", name: "MSI PRO B760M-A WIFI DDR5 Micro ATX Motherboard", price: 17200, oldPrice: 18500, save: 1300, image: "https://www.startech.com.bd/image/cache/catalog/motherboard/msi/pro-b760m-a-wifi/pro-b760m-a-wifi-01-500x500.webp" },
    { id: "mb-3", name: "ASUS PRIME B760M-A DDR5 Micro ATX Motherboard", price: 15800, oldPrice: 16500, save: 700, image: "https://www.startech.com.bd/image/cache/catalog/motherboard/asus/prime-b760m-a-d5/prime-b760m-a-d5-500x500.webp" },
    { id: "mb-4", name: "ASRock B760M Pro RS/D5 DDR5 Motherboard", price: 14900, oldPrice: 15900, save: 1000, image: "https://www.startech.com.bd/image/cache/catalog/motherboard/asrock/b760m-pro-rs-d5/b760m-pro-rs-d5-01-500x500.webp" },
  ],
  laptop: [
    { id: "lp-1", name: "Lenovo IdeaPad Slim 3 15IRU8 Core i5 13th Gen 15.6\" FHD Laptop", price: 56999, oldPrice: 62000, save: 5001, image: "https://www.startech.com.bd/image/cache/catalog/laptop/lenovo/ideapad-slim-3-15iru8/ideapad-slim-3-15iru8-01-500x500.webp" },
    { id: "lp-2", name: "HP 15s-eq2143au Ryzen 5 5625U 15.6\" FHD Laptop", price: 48500, oldPrice: 52000, save: 3500, image: "https://www.startech.com.bd/image/cache/catalog/laptop/hp/15s-eq2143au/15s-eq2143au-01-500x500.webp" },
    { id: "lp-3", name: "ASUS Vivobook 15 X1504VA Core i5 13th Gen 15.6\" FHD Laptop", price: 59500, oldPrice: 63000, save: 3500, image: "https://www.startech.com.bd/image/cache/catalog/laptop/asus/vivobook-15-x1504va/vivobook-15-x1504va-01-500x500.webp" },
    { id: "lp-4", name: "Acer Aspire 3 A315-24P AMD Ryzen 5 7520U 15.6\" FHD Laptop", price: 44999, oldPrice: 49000, save: 4001, image: "https://www.startech.com.bd/image/cache/catalog/laptop/acer/aspire-3-a315-24p/aspire-3-a315-24p-01-500x500.webp" },
  ],
  monitor: [
    { id: "mn-1", name: "Samsung 24\" FHD IPS 100Hz Monitor (LS24C360EAWXXL)", price: 13500, oldPrice: 14500, save: 1000, image: "https://www.startech.com.bd/image/cache/catalog/monitor/samsung/ls24c360/ls24c360-01-500x500.webp" },
    { id: "mn-2", name: "Dell E2423H 23.8\" FHD VA Monitor", price: 13700, oldPrice: 14500, save: 800, image: "https://www.startech.com.bd/image/cache/catalog/monitor/dell/e2423h/e2423h-01-500x500.webp" },
    { id: "mn-3", name: "LG 24MR400-B 24\" FHD IPS 100Hz Monitor", price: 12900, oldPrice: 13800, save: 900, image: "https://www.startech.com.bd/image/cache/catalog/monitor/lg/24mr400-b/24mr400-b-01-500x500.webp" },
    { id: "mn-4", name: "HP M24fw 23.8\" FHD IPS Monitor", price: 15500, oldPrice: 16500, save: 1000, image: "https://www.startech.com.bd/image/cache/catalog/monitor/hp/m24fw/m24fw-01-500x500.webp" },
  ],
  "smart-watch": [
    { id: "sw-1", name: "Xiaomi Redmi Watch 4 Smart Watch", price: 5999, oldPrice: 6999, save: 1000, image: "https://www.startech.com.bd/image/cache/catalog/smart-watch/xiaomi/redmi-watch-4/redmi-watch-4-01-500x500.webp" },
    { id: "sw-2", name: "Amazfit Bip 5 Smart Watch", price: 6500, oldPrice: 7500, save: 1000, image: "https://www.startech.com.bd/image/cache/catalog/smart-watch/amazfit/bip-5/bip-5-01-500x500.webp" },
    { id: "sw-3", name: "Samsung Galaxy Fit3 Smart Band", price: 4500, oldPrice: 5200, save: 700, image: "https://www.startech.com.bd/image/cache/catalog/smart-watch/samsung/galaxy-fit3/galaxy-fit3-01-500x500.webp" },
    { id: "sw-4", name: "Haylou Solar Pro Smart Watch", price: 3800, oldPrice: 4500, save: 700, image: "https://www.startech.com.bd/image/cache/catalog/smart-watch/haylou/solar-pro/solar-pro-01-500x500.webp" },
  ],
  keyboard: [
    { id: "kb-1", name: "Fantech MAXFIT67 MK858 RGB Mechanical Keyboard", price: 4500, oldPrice: 5200, save: 700, image: "https://www.startech.com.bd/image/cache/catalog/keyboard/fantech/maxfit67-mk858/maxfit67-mk858-01-500x500.webp" },
    { id: "kb-2", name: "Dareu A87 PRO Mechanical Gaming Keyboard", price: 5200, oldPrice: 5800, save: 600, image: "https://www.startech.com.bd/image/cache/catalog/keyboard/dareu/a87-pro/a87-pro-01-500x500.webp" },
    { id: "kb-3", name: "Royal Kludge RK84 RGB Wireless Mechanical Keyboard", price: 4800, oldPrice: 5500, save: 700, image: "https://www.startech.com.bd/image/cache/catalog/keyboard/royal-kludge/rk84/rk84-01-500x500.webp" },
    { id: "kb-4", name: "Rapoo V500 Pro Backlit Mechanical Gaming Keyboard", price: 3200, oldPrice: 3800, save: 600, image: "https://www.startech.com.bd/image/cache/catalog/keyboard/rapoo/v500-pro/v500-pro-01-500x500.webp" },
  ],
  mouse: [
    { id: "ms-1", name: "Logitech G502 X LIGHTSPEED Wireless Gaming Mouse", price: 8500, oldPrice: 9500, save: 1000, image: "https://www.startech.com.bd/image/cache/catalog/mouse/logitech/g502-x-lightspeed/g502-x-lightspeed-01-500x500.webp" },
    { id: "ms-2", name: "Razer DeathAdder V3 Wired Gaming Mouse", price: 5500, oldPrice: 6200, save: 700, image: "https://www.startech.com.bd/image/cache/catalog/mouse/razer/deathadder-v3/deathadder-v3-01-500x500.webp" },
    { id: "ms-3", name: "Fantech Helios XD5 Wireless Gaming Mouse", price: 3200, oldPrice: 3800, save: 600, image: "https://www.startech.com.bd/image/cache/catalog/mouse/fantech/helios-xd5/helios-xd5-01-500x500.webp" },
    { id: "ms-4", name: "A4Tech Bloody A70 Light Strike Gaming Mouse", price: 1800, oldPrice: 2200, save: 400, image: "https://www.startech.com.bd/image/cache/catalog/mouse/a4tech/bloody-a70/bloody-a70-01-500x500.webp" },
  ],
  headphone: [
    { id: "hp-1", name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphone", price: 29500, oldPrice: 32000, save: 2500, image: "https://www.startech.com.bd/image/cache/catalog/headphone/sony/wh-1000xm5/wh-1000xm5-01-500x500.webp" },
    { id: "hp-2", name: "JBL Tune 770NC Wireless Over-Ear Headphone", price: 8500, oldPrice: 9500, save: 1000, image: "https://www.startech.com.bd/image/cache/catalog/headphone/jbl/tune-770nc/tune-770nc-01-500x500.webp" },
    { id: "hp-3", name: "Edifier W820NB Plus ANC Wireless Headphone", price: 5200, oldPrice: 5800, save: 600, image: "https://www.startech.com.bd/image/cache/catalog/headphone/edifier/w820nb-plus/w820nb-plus-01-500x500.webp" },
    { id: "hp-4", name: "Havit H655BT PRO ANC Wireless Headphone", price: 3500, oldPrice: 4200, save: 700, image: "https://www.startech.com.bd/image/cache/catalog/headphone/havit/h655bt-pro/h655bt-pro-01-500x500.webp" },
  ],
  desktop: [
    { id: "dt-1", name: "Star PC Intel Core i5 12400 Desktop PC", price: 42000, oldPrice: 46000, save: 4000, image: "https://www.startech.com.bd/image/cache/catalog/desktop/star-pc/core-i5-12400/core-i5-12400-01-500x500.webp" },
    { id: "dt-2", name: "Star PC AMD Ryzen 5 5600 Desktop PC", price: 38500, oldPrice: 42000, save: 3500, image: "https://www.startech.com.bd/image/cache/catalog/desktop/star-pc/ryzen-5-5600/ryzen-5-5600-01-500x500.webp" },
    { id: "dt-3", name: "Star PC Intel Core i3 12100 Desktop PC", price: 28500, oldPrice: 31000, save: 2500, image: "https://www.startech.com.bd/image/cache/catalog/desktop/star-pc/core-i3-12100/core-i3-12100-01-500x500.webp" },
    { id: "dt-4", name: "Star PC AMD Ryzen 3 4100 Budget Desktop PC", price: 22000, oldPrice: 24500, save: 2500, image: "https://www.startech.com.bd/image/cache/catalog/desktop/star-pc/ryzen-3-4100/ryzen-3-4100-01-500x500.webp" },
  ],
};

export default function HappyHourPage() {
  const { addToCart } = useApp();
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]?.id || "motherboard");

  // Timer ends in 8 hours dynamically (resets or decrements live)
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "08",
    minutes: "31",
    seconds: "43",
  });

  useEffect(() => {
    // End target is 8h 31m 43s from loading
    const target = new Date().getTime() + (8 * 3600 + 31 * 60 + 43) * 1000;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleScrollToSection = (id) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleProductClick = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    alert(`Added "${product.name}" to cart!`);
  };

  return (
    <div style={{ backgroundColor: "#f2f4f8", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #e5e5e5",
        padding: "10px 0",
      }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 15px" }}>
          <ul style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            listStyle: "none",
            padding: 0,
            margin: 0,
            fontSize: "13px",
            color: "#666",
          }}>
            <li>
              <Link href="/" style={{ color: "#666", display: "flex", alignItems: "center" }}>
                <span className="material-icons" style={{ fontSize: "18px" }}>home</span>
              </Link>
            </li>
            <li style={{ color: "#999" }}>/</li>
            <li>
              <span style={{ color: "#333" }}>Happy Hour</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Campaign Header */}
      <div style={{ maxWidth: "1300px", margin: "20px auto 0", padding: "0 15px" }}>
        <div style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "25px 20px",
          textAlign: "center",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          border: "1px solid #eaeaea",
        }}>
          <h1 style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "#d01919",
            margin: "0 0 10px",
          }}>
            চলছে স্টার টেক Happy Hour!
          </h1>
          <p style={{
            fontSize: "13px",
            color: "#333",
            margin: "0 0 20px",
            fontWeight: 500,
            lineHeight: "1.6",
          }}>
            আপনার পছন্দের Laptop, Desktop, Monitor, Smart Watch, Keyboard, Mouse, Headphone-সহ প্রযুক্তি পণ্যে পাবেন নিশ্চিত মূল্যছাড়! এবং বিকাশ অনলাইন পেমেন্ট পাবেন সর্বোচ্চ ১০০০ টাকা পর্যন্ত ইনস্ট্যান্ট ক্যাশব্যাক।
          </p>

          {/* Countdown Clock */}
          <div style={{
            display: "inline-block",
            margin: "0 auto 5px",
          }}>
            <div style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#333",
              marginBottom: "8px",
              letterSpacing: "1px",
            }}>
              ENDING IN
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              {/* Days */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  backgroundColor: "#ef4a23",
                  color: "#fff",
                  fontSize: "22px",
                  fontWeight: 700,
                  padding: "6px 8px",
                  borderRadius: "4px",
                  minWidth: "40px",
                  textAlign: "center",
                }}>{timeLeft.days}</div>
                <span style={{ fontSize: "10px", color: "#666", marginTop: "4px" }}>Days</span>
              </div>
              {/* Hours */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  backgroundColor: "#ef4a23",
                  color: "#fff",
                  fontSize: "22px",
                  fontWeight: 700,
                  padding: "6px 8px",
                  borderRadius: "4px",
                  minWidth: "40px",
                  textAlign: "center",
                }}>{timeLeft.hours}</div>
                <span style={{ fontSize: "10px", color: "#666", marginTop: "4px" }}>Hours</span>
              </div>
              {/* Minutes */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  backgroundColor: "#ef4a23",
                  color: "#fff",
                  fontSize: "22px",
                  fontWeight: 700,
                  padding: "6px 8px",
                  borderRadius: "4px",
                  minWidth: "40px",
                  textAlign: "center",
                }}>{timeLeft.minutes}</div>
                <span style={{ fontSize: "10px", color: "#666", marginTop: "4px" }}>Minutes</span>
              </div>
              {/* Seconds */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  backgroundColor: "#ef4a23",
                  color: "#fff",
                  fontSize: "22px",
                  fontWeight: 700,
                  padding: "6px 8px",
                  borderRadius: "4px",
                  minWidth: "40px",
                  textAlign: "center",
                }}>{timeLeft.seconds}</div>
                <span style={{ fontSize: "10px", color: "#666", marginTop: "4px" }}>Seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout with Sidebar */}
      <div style={{
        maxWidth: "1300px",
        margin: "30px auto 40px",
        padding: "0 15px",
        display: "flex",
        gap: "25px",
        alignItems: "flex-start",
      }}>
        {/* Left Sidebar - Shop by Category */}
        <div style={{
          width: "260px",
          backgroundColor: "#fff",
          borderRadius: "6px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          border: "1px solid #eaeaea",
          flexShrink: 0,
          display: "block",
          position: "sticky",
          top: "100px",
          maxHeight: "calc(100vh - 120px)",
          overflowY: "auto",
        }} className="category-sidebar">
          <div style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#333",
            padding: "12px 15px",
            borderBottom: "1px solid #eaeaea",
          }}>
            Shop by Category
          </div>
          <div style={{ padding: "5px 0" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleScrollToSection(cat.id)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "10px 15px",
                  border: "none",
                  backgroundColor: "transparent",
                  fontSize: "12px",
                  fontWeight: activeCategory === cat.id ? 700 : 500,
                  color: activeCategory === cat.id ? "#ef4a23" : "#555",
                  cursor: "pointer",
                  display: "block",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== cat.id) {
                    e.currentTarget.style.color = "#ef4a23";
                    e.currentTarget.style.paddingLeft = "18px";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== cat.id) {
                    e.currentTarget.style.color = "#555";
                    e.currentTarget.style.paddingLeft = "15px";
                  }
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Product Showcase */}
        <div style={{ flex: 1 }} className="product-showcase">
          {CATEGORIES.map((cat) => {
            const products = PRODUCTS_DATA[cat.id] || [];
            if (products.length === 0) return null;

            return (
              <div
                id={cat.id}
                key={cat.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  padding: "20px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  border: "1px solid #eaeaea",
                  marginBottom: "30px",
                  scrollMarginTop: "120px",
                }}
              >
                {/* Category Header */}
                <div style={{ textAlign: "center", marginBottom: "25px" }}>
                  <h2 style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#333",
                    margin: "0 0 4px",
                  }}>
                    {cat.name}
                  </h2>
                  <p style={{
                    fontSize: "12px",
                    color: "#666",
                    margin: 0,
                  }}>
                    Enjoy Exciting Discounts on Selected {cat.name}!
                  </p>
                </div>

                {/* Product Grid */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "20px",
                }} className="happy-hour-grid">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "6px",
                        border: "1px solid #eaeaea",
                        overflow: "hidden",
                        position: "relative",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "15px 10px 12px",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.08)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.transform = "none";
                      }}
                    >
                      {/* Save Badge */}
                      {product.save > 0 && (
                        <div style={{
                          position: "absolute",
                          top: "10px",
                          left: "10px",
                          backgroundColor: "#7b2cbf",
                          color: "#fff",
                          fontSize: "9px",
                          fontWeight: 700,
                          padding: "3px 8px",
                          borderRadius: "2px",
                          zIndex: 2,
                        }}>
                          Save: {product.save.toLocaleString("en-BD")}৳
                        </div>
                      )}

                      {/* Image */}
                      <div style={{
                        height: "140px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "10px",
                        padding: "10px",
                      }}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            maxHeight: "120px",
                            maxWidth: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>

                      {/* Product Name */}
                      <div style={{
                        fontSize: "11px",
                        fontWeight: 500,
                        color: "#333",
                        lineHeight: "1.4",
                        marginBottom: "12px",
                        height: "38px",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}>
                        {product.name}
                      </div>

                      {/* Pricing */}
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}>
                        <span style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#ef4a23",
                        }}>
                          {product.price.toLocaleString("en-BD")}৳
                        </span>
                        {product.oldPrice && (
                          <span style={{
                            fontSize: "11px",
                            color: "#999",
                            textDecoration: "line-through",
                          }}>
                            {product.oldPrice.toLocaleString("en-BD")}৳
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* View All Button */}
                <div style={{ textAlign: "center", marginTop: "25px" }}>
                  <Link href={cat.href} style={{
                    display: "inline-block",
                    backgroundColor: "#ef4a23",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "8px 24px",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 2px 4px rgba(239, 74, 35, 0.2)",
                    textDecoration: "none",
                  }}>
                    View All {cat.name}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Campaign Terms & Conditions */}
      <div style={{
        maxWidth: "1300px",
        margin: "0 auto 40px",
        padding: "0 15px",
      }}>
        <div style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "25px 20px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          border: "1px solid #eaeaea",
        }}>
          <h3 style={{
            fontSize: "15px",
            fontWeight: 700,
            color: "#e67e22",
            marginBottom: "15px",
            textAlign: "center",
          }}>
            Happy Hour ক্যাম্পেইনের শর্তাবলী
          </h3>

          <ol style={{
            paddingLeft: "20px",
            margin: "0 0 20px",
            fontSize: "13px",
            color: "#333",
            lineHeight: "1.8",
          }}>
            <li style={{ marginBottom: "8px" }}>ক্যাম্পেইনের পণ্য অবশ্যই ক্যাম্পেইন চলাকালীন সময়ে অর্ডার করতে হবে।</li>
            <li style={{ marginBottom: "8px" }}>অফারটি শুধুমাত্র অনলাইন অর্ডার এর ক্ষেত্রে প্রযোজ্য।</li>
            <li style={{ marginBottom: "8px" }}>ক্যাম্পেইনের পণ্যে অন্য কোনো অফার থাকবে না, সম্মানিত ক্রেতাগণ যেকোনো একটি অফারই উপভোগ করতে পারবেন।</li>
            <li style={{ marginBottom: "8px" }}>
              বিকাশ ক্যাশব্যাকের বিস্তারিত জানতে{" "}
              <Link href="/information/offer" style={{ color: "#ef4a23", textDecoration: "underline", fontWeight: 600 }}>
                এই লিংকে
              </Link>{" "}
              ভিজিট করুন।
            </li>
            <li style={{ marginBottom: "8px" }}>অর্ডার করার পর আমাদের কাস্টমার প্রতিনিধি কল করে পন্যের প্রাপ্তি ও ডেলিভারি সংক্রান্ত তথ্য জানিয়ে দিবেন।</li>
            <li style={{ marginBottom: "8px" }}>কোন সংগত কারণে এই ক্যাম্পেইনের পেমেন্ট রিফান্ড করা হলে তা সাধারণ রিফান্ড পলিসি প্রক্রিয়ায় সম্পন্ন হবে। এক্ষেত্রে ক্রেতা যে এম্যাউন্ট পেমেন্ট করেছে শুধুমাত্র ততই রিফান্ড প্রসেস করা হবে।</li>
          </ol>

          <div style={{
            backgroundColor: "#fff9db",
            border: "1px solid #ffe066",
            borderRadius: "6px",
            padding: "12px 15px",
            fontSize: "13px",
            fontWeight: 700,
            color: "#666",
            textAlign: "center",
            lineHeight: "1.5",
          }}>
            অনিবার্য কারণবশত ক্যাম্পেইনে যেকোনো পরিবর্তন, পরিবর্ধন বা পরিমার্জনের সম্পূর্ণ অধিকার স্টার টেক কর্তৃপক্ষ সংরক্ষণ করে।
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 991px) {
          .category-sidebar {
            display: none !important;
          }
          .happy-hour-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .happy-hour-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .happy-hour-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
