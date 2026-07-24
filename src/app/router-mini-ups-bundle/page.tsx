"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

const BUNDLES = [
  {
    id: "bundle-1",
    router: {
      name: "Tenda AC5 AC1200 Dual-Band Wi-Fi Router",
      price: 1750,
      image: "https://www.startech.com.bd/image/cache/catalog/router/tenda/ac5/ac5-200x200.jpg",
    },
    ups: {
      name: "MaxGreen DU-88000 8000mAh Mini UPS for Router",
      price: 1700,
      image: "https://www.startech.com.bd/image/cache/catalog/ups/maxgreen/du-88000/du-88000-01-200x200.jpg",
    },
    oldPrice: 3450,
    newPrice: 3158,
  },
  {
    id: "bundle-2",
    router: {
      name: "Mercusys AC12 AC1200 Dual Band WiFi Router",
      price: 1949,
      image: "https://www.startech.com.bd/image/cache/catalog/router/mercusys/ac12/ac12-200x200.jpg",
    },
    ups: {
      name: "MaxGreen DU-88000 8000mAh Mini UPS for Router",
      price: 1700,
      image: "https://www.startech.com.bd/image/cache/catalog/ups/maxgreen/du-88000/du-88000-01-200x200.jpg",
    },
    oldPrice: 3649,
    newPrice: 3287,
  },
  {
    id: "bundle-3",
    router: {
      name: "TP-Link Archer C24 AC750 Dual-Band WiFi Router",
      price: 1949,
      image: "https://www.startech.com.bd/image/cache/catalog/router/tp-link/archer-c24/archer-c24-200x200.jpg",
    },
    ups: {
      name: "MaxGreen DU-88000 8000mAh Mini UPS for Router",
      price: 1700,
      image: "https://www.startech.com.bd/image/cache/catalog/ups/maxgreen/du-88000/du-88000-01-200x200.jpg",
    },
    oldPrice: 3649,
    newPrice: 3345,
  },
  {
    id: "bundle-4",
    router: {
      name: "Tenda AC6 AC1200 Dual-Band WiFi Router",
      price: 2050,
      image: "https://www.startech.com.bd/image/cache/catalog/router/tenda/ac6/ac6-200x200.jpg",
    },
    ups: {
      name: "MaxGreen DU-88000 8000mAh Mini UPS for Router",
      price: 1700,
      image: "https://www.startech.com.bd/image/cache/catalog/ups/maxgreen/du-88000/du-88000-01-200x200.jpg",
    },
    oldPrice: 3750,
    newPrice: 3399,
  },
  {
    id: "bundle-5",
    router: {
      name: "Netis NC21 AC1200 Dual Band Router",
      price: 2150,
      image: "https://www.startech.com.bd/image/cache/catalog/router/netis/nc21/nc21-200x200.png",
    },
    ups: {
      name: "MaxGreen DU-88000 8000mAh Mini UPS for Router",
      price: 1700,
      image: "https://www.startech.com.bd/image/cache/catalog/ups/maxgreen/du-88000/du-88000-01-200x200.jpg",
    },
    oldPrice: 3850,
    newPrice: 3470,
  },
  {
    id: "bundle-6",
    router: {
      name: "TP-Link Archer C54 AC1200 Dual-Band Wi-Fi Router",
      price: 2249,
      image: "https://www.startech.com.bd/image/cache/catalog/router/tp-link/archer-c54/archer-c54-200x200.jpg",
    },
    ups: {
      name: "MaxGreen DU-88000 8000mAh Mini UPS for Router",
      price: 1700,
      image: "https://www.startech.com.bd/image/cache/catalog/ups/maxgreen/du-88000/du-88000-01-200x200.jpg",
    },
    oldPrice: 3949,
    newPrice: 3650,
  },
  {
    id: "bundle-7",
    router: {
      name: "Mercusys MR30G AC1200 Dual Band Gigabit Router",
      price: 2249,
      image: "https://www.startech.com.bd/image/cache/catalog/router/mercusys/mr30g/mr30g-200x200.jpg",
    },
    ups: {
      name: "MaxGreen DU-88000 8000mAh Mini UPS for Router",
      price: 1700,
      image: "https://www.startech.com.bd/image/cache/catalog/ups/maxgreen/du-88000/du-88000-01-200x200.jpg",
    },
    oldPrice: 3949,
    newPrice: 3650,
  },
  {
    id: "bundle-8",
    router: {
      name: "Tenda AC7 AC1200 Dual-Band Wi-Fi Router",
      price: 2300,
      image: "https://www.startech.com.bd/image/cache/catalog/router/tenda/ac7/ac7-200x200.jpg",
    },
    ups: {
      name: "MaxGreen DU-88000 8000mAh Mini UPS for Router",
      price: 1700,
      image: "https://www.startech.com.bd/image/cache/catalog/ups/maxgreen/du-88000/du-88000-01-200x200.jpg",
    },
    oldPrice: 4000,
    newPrice: 3698,
  },
  {
    id: "bundle-9",
    router: {
      name: "TP-Link Archer C50 AC1200 Dual Band Wi-Fi Router",
      price: 2349,
      image: "https://www.startech.com.bd/image/cache/catalog/router/tp-link/archer-c50/archer-c50-200x200.jpg",
    },
    ups: {
      name: "MaxGreen DU-88000 8000mAh Mini UPS for Router",
      price: 1700,
      image: "https://www.startech.com.bd/image/cache/catalog/ups/maxgreen/du-88000/du-88000-01-200x200.jpg",
    },
    oldPrice: 4049,
    newPrice: 3745,
  },
  {
    id: "bundle-10",
    router: {
      name: "Mercusys AC12G AC1300 Dual Band Gigabit Router",
      price: 2490,
      image: "https://www.startech.com.bd/image/cache/catalog/router/mercusys/ac12g/ac12g-200x200.jpg",
    },
    ups: {
      name: "MaxGreen DU-88000 8000mAh Mini UPS for Router",
      price: 1700,
      image: "https://www.startech.com.bd/image/cache/catalog/ups/maxgreen/du-88000/du-88000-01-200x200.jpg",
    },
    oldPrice: 4190,
    newPrice: 3804,
  },
  {
    id: "bundle-11",
    router: {
      name: "Cudy M1200 AC1200 Dual Band Mesh Router (1 Pack)",
      price: 2550,
      image: "https://www.startech.com.bd/image/cache/catalog/router/cudy/m1200/m1200-200x200.jpg",
    },
    ups: {
      name: "MaxGreen DU-88000 8000mAh Mini UPS for Router",
      price: 1700,
      image: "https://www.startech.com.bd/image/cache/catalog/ups/maxgreen/du-88000/du-88000-01-200x200.jpg",
    },
    oldPrice: 4250,
    newPrice: 3961,
  },
  {
    id: "bundle-12",
    router: {
      name: "Dahua DH-AC12 AC1200 Gigabit Dual-Band Wi-Fi Router",
      price: 2700,
      image: "https://www.startech.com.bd/image/cache/catalog/router/dahua/dh-ac12/dh-ac12-200x200.jpg",
    },
    ups: {
      name: "MaxGreen DU-88000 8000mAh Mini UPS for Router",
      price: 1700,
      image: "https://www.startech.com.bd/image/cache/catalog/ups/maxgreen/du-88000/du-88000-01-200x200.jpg",
    },
    oldPrice: 4400,
    newPrice: 4078,
  },
  {
    id: "bundle-13",
    router: {
      name: "Tenda AC8 AC1200 Dual-Band Gigabit Wi-Fi Router",
      price: 2800,
      image: "https://www.startech.com.bd/image/cache/catalog/router/tenda/ac8/ac8-200x200.jpg",
    },
    ups: {
      name: "MaxGreen DU-88000 8000mAh Mini UPS for Router",
      price: 1700,
      image: "https://www.startech.com.bd/image/cache/catalog/ups/maxgreen/du-88000/du-88000-01-200x200.jpg",
    },
    oldPrice: 4500,
    newPrice: 4180,
  },
];

export default function RouterBundleOfferPage() {
  const { addToCart } = useApp();
  const [activeTab, setActiveTab] = useState<"bundle" | "terms">("bundle");
  
  // Custom Live Countdown Timer State (rolls over 7 days remaining dynamically)
  const [timeLeft, setTimeLeft] = useState({
    days: "07",
    hours: "00",
    minutes: "39",
    seconds: "23",
  });

  const termsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate a fixed end date 7 days, 1 hour, 40 mins from mounting to make the countdown match exactly
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    targetDate.setHours(targetDate.getHours() + 1);
    targetDate.setMinutes(targetDate.getMinutes() + 40);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

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

  const handleBuyNow = (bundle: typeof BUNDLES[0]) => {
    // Add composite bundle item to cart
    const bundleProduct = {
      id: bundle.id,
      name: `${bundle.router.name} + ${bundle.ups.name} Bundle`,
      price: bundle.newPrice,
      image: bundle.router.image,
    };
    addToCart(bundleProduct, 1);
    alert(`Success: "${bundleProduct.name}" added to cart!`);
  };

  const handleTabClick = (tab: "bundle" | "terms") => {
    setActiveTab(tab);
    if (tab === "terms") {
      termsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
              <Link href="/information/offer" style={{ color: "#666" }}>Offer</Link>
            </li>
            <li style={{ color: "#999" }}>/</li>
            <li>
              <span style={{ color: "#333" }}>Router Bundle Offer</span>
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
            চলছে স্টার টেক Router Bundle Offer!
          </h1>
          <p style={{
            fontSize: "14px",
            color: "#333",
            margin: "0 0 20px",
            fontWeight: 500,
          }}>
            স্টার টেক অনলাইন শপে Router & Mini UPS-এর বান্ডলে পাচ্ছেন আকর্ষণীয় মূল্যছাড়! সেরা দামে এখনই সংগ্রহ করুন।
          </p>

          {/* Countdown Clock */}
          <div style={{
            display: "inline-block",
            margin: "0 auto 20px",
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

          {/* Navigation Tabs */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "10px",
          }}>
            <button
              onClick={() => handleTabClick("bundle")}
              style={{
                padding: "8px 20px",
                borderRadius: "20px",
                border: activeTab === "bundle" ? "1px solid #374151" : "1px solid #d1d5db",
                backgroundColor: "#fff",
                fontSize: "13px",
                fontWeight: activeTab === "bundle" ? 700 : 500,
                color: "#374151",
                cursor: "pointer",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              Router & Mini UPS Bundle
            </button>
            <button
              onClick={() => handleTabClick("terms")}
              style={{
                padding: "8px 20px",
                borderRadius: "20px",
                border: activeTab === "terms" ? "1px solid #374151" : "1px solid #d1d5db",
                backgroundColor: "#fff",
                fontSize: "13px",
                fontWeight: activeTab === "terms" ? 700 : 500,
                color: "#6b7280",
                cursor: "pointer",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>

      {/* Campaign Details Text */}
      <div style={{ textAlign: "center", margin: "30px 0 20px" }}>
        <h2 style={{
          fontSize: "18px",
          fontWeight: 700,
          color: "#333",
          margin: "0 0 4px",
        }}>
          Router & Mini UPS Bundle
        </h2>
        <p style={{
          fontSize: "13px",
          color: "#ef4a23",
          fontWeight: 600,
          margin: 0,
        }}>
          Buy Together, Save More!
        </p>
      </div>

      {/* Bundles Grid */}
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 15px 30px" }}>
        <div className="offer-grid-container" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "25px",
        }}>
          {BUNDLES.map((bundle) => (
            <div key={bundle.id} style={{
              backgroundColor: "#fff",
              borderRadius: "6px",
              padding: "20px 15px 15px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              border: "1px solid #eaeaea",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
                {/* Router & UPS visual combination */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "5px",
                  marginBottom: "15px",
                }}>
                  {/* Left: Router */}
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{
                      height: "100px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "8px",
                    }}>
                      <img
                        src={bundle.router.image}
                        alt={bundle.router.name}
                        style={{
                          maxHeight: "85px",
                          maxWidth: "100%",
                          objectFit: "contain",
                        }}
                        onError={(e) => {
                          e.currentTarget.src = "https://www.startech.com.bd/image/cache/catalog/router/tenda/ac5/ac5-200x200.jpg";
                        }}
                      />
                    </div>
                    <div style={{
                      fontSize: "11px",
                      color: "#ef4a23",
                      fontWeight: 600,
                      marginBottom: "4px",
                    }}>
                      {bundle.router.price.toLocaleString("en-BD")}৳
                    </div>
                    <div style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#333",
                      lineHeight: "1.3",
                      height: "42px",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}>
                      {bundle.router.name}
                    </div>
                  </div>

                  {/* Plus separator */}
                  <div style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#999",
                    padding: "0 4px",
                  }}>
                    +
                  </div>

                  {/* Right: UPS */}
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{
                      height: "100px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "8px",
                    }}>
                      <img
                        src={bundle.ups.image}
                        alt={bundle.ups.name}
                        style={{
                          maxHeight: "85px",
                          maxWidth: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <div style={{
                      fontSize: "11px",
                      color: "#ef4a23",
                      fontWeight: 600,
                      marginBottom: "4px",
                    }}>
                      {bundle.ups.price.toLocaleString("en-BD")}৳
                    </div>
                    <div style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#333",
                      lineHeight: "1.3",
                      height: "42px",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}>
                      {bundle.ups.name}
                    </div>
                  </div>
                </div>

                {/* Bundle pricing & Action row */}
                <div style={{
                  borderTop: "1px solid #f3f4f6",
                  paddingTop: "12px",
                  marginTop: "auto",
                }}>
                  {/* Prices */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{
                        fontSize: "12px",
                        color: "#999",
                        textDecoration: "line-through",
                      }}>
                        {bundle.oldPrice.toLocaleString("en-BD")}৳
                      </span>
                      <span style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#d01919",
                      }}>
                        {bundle.newPrice.toLocaleString("en-BD")}৳
                      </span>
                    </div>

                    {/* Buy Now Button */}
                    <button
                      onClick={() => handleBuyNow(bundle)}
                      style={{
                        backgroundColor: "#2c3e50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "8px 16px",
                        fontSize: "13px",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#ef4a23"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#2c3e50"}
                    >
                      <span className="material-icons" style={{ fontSize: "16px" }}>shopping_cart</span>
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Terms & Conditions */}
      <div ref={termsRef} style={{
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
            fontSize: "16px",
            fontWeight: 700,
            color: "#e67e22",
            marginBottom: "15px",
            textAlign: "center",
          }}>
            ক্যাম্পেইনের শর্তাবলী
          </h3>

          <ul style={{
            paddingLeft: "20px",
            margin: "0 0 20px",
            fontSize: "13px",
            color: "#333",
            lineHeight: "1.8",
          }}>
            <li style={{ marginBottom: "8px" }}>ক্যাম্পেইনের পণ্য অবশ্যই ক্যাম্পেইন চলাকালীন সময়ে অর্ডার করতে হবে।</li>
            <li style={{ marginBottom: "8px" }}>ক্যাম্পেইনের পণ্য অন্য কোনো অফার থাকবে না, সম্মানিত ক্রেতাগণ যেকোনো একটি অফারই উপভোগ করতে পারবেন।</li>
            <li style={{ marginBottom: "8px" }}>ফ্রি হোম ডেলিভারি শুধুমাত্র ঢাকা শহরের অনলাইন অর্ডারের জন্য প্রযোজ্য।</li>
            <li style={{ marginBottom: "8px" }}>কোন সংগত কারণে এই ক্যাম্পেইনের পেমেন্ট রিফান্ড করা হলে তা সাধারণ রিফান্ড পলিসি প্রক্রিয়ায় সম্পন্ন হবে। এক্ষেত্রে ক্রেতা যে এম্যাউন্ট পেমেন্ট করেছে শুধুমাত্র ততই রিফান্ড প্রসেস করা হবে।</li>
          </ul>

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
          .offer-grid-container {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 575px) {
          .offer-grid-container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
