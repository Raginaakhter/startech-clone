"use client";
import Link from "next/link";

const OFFERS_DATA = [
  {
    id: 1,
    title: "bKash 1000tk Cashback Offer!",
    description: "Get 1000tk Instant bKash Cashback on Online Payment!",
    dateFrom: "07 Jul 2026",
    dateTo: "31 Aug 2026",
    availability: "Online",
    image: "https://www.startech.com.bd/image/cache/catalog/offer-page/2026/bkash-1000-caskback-payment-400x400.webp",
    link: "/information/offer",
  },
  {
    id: 2,
    title: "Router & Mini UPS Bundle Offer",
    description: "Buy Together, Save More!",
    dateFrom: "01 Jul 2026",
    dateTo: "31 Jul 2026",
    availability: "Online Shop",
    image: "https://www.startech.com.bd/image/cache/catalog/offer-page/2026/router-mini-ups-bundle-offer-400x400.webp",
    link: "/router-mini-ups-bundle",
  },
  {
    id: 3,
    title: "Air Conditioner Deal",
    description: "Buy AC & Enjoy Exciting Discount with Free Delivery!",
    dateFrom: "09 Jul 2026",
    dateTo: "31 Aug 2026",
    availability: "All Outlet",
    image: "https://www.startech.com.bd/image/cache/catalog/offer-page/ac-offer-26-bkash-400x400.webp",
    link: "/information/offer",
  },
  {
    id: 4,
    title: "Ceiling Fan Deal",
    description: "Buy Your Ceiling Fan & Get Exciting Discounts!",
    dateFrom: "13 Jul 2026",
    dateTo: "31 Jul 2026",
    availability: "Online",
    image: "https://www.startech.com.bd/image/cache/catalog/offer-page/2026/ceiling-fan-deal-bkash-400x400.webp",
    link: "/information/offer",
  },
  {
    id: 5,
    title: "Deep Freezer Deal",
    description: "Enjoy Exciting Discounts on Selected Refrigerator!",
    dateFrom: "14 Jul 2026",
    dateTo: "31 Aug 2026",
    availability: "All Outlet",
    image: "https://www.startech.com.bd/image/cache/catalog/offer-page/2026/deep-fridge-deal-26-400x400.png",
    link: "/information/offer",
  },
  {
    id: 6,
    title: "Trimmer Deal",
    description: "Buy Your Favorite Trimmers & Get Exciting Discounts !",
    dateFrom: "13 Jul 2026",
    dateTo: "31 Jul 2026",
    availability: "Online",
    image: "https://www.startech.com.bd/image/cache/catalog/offer-page/new-trimmer-deal-400x400.webp",
    link: "/information/offer",
  },
  {
    id: 7,
    title: "Optoma Projector Deal",
    description: "Buy Optoma Projectors & Get Exciting Gifts!",
    dateFrom: "05 Jul 2026",
    dateTo: "31 Aug 2026",
    availability: "Online",
    image: "https://www.startech.com.bd/image/cache/catalog/offer-page/2026/optoma-free-t-shirt-offer-400x400.webp",
    link: "/information/offer",
  },
  {
    id: 8,
    title: "Pantum Printer Free Backpack Offer",
    description: "Buy Pantum Printer & Get Backpack !",
    dateFrom: "05 Jul 2026",
    dateTo: "31 Aug 2026",
    availability: "All Outlet",
    image: "https://www.startech.com.bd/image/cache/catalog/offer-page/2026/pantum-backpack-offer-400x400.webp",
    link: "/information/offer",
  },
  {
    id: 9,
    title: "Studio Equipment Offer",
    description: "Buy Select Studio Equiments and Get Exciting Discounts and Free Home Delivery Inside Dhaka!",
    dateFrom: "13 Jul 2026",
    dateTo: "31 Jul 2026",
    availability: "Online",
    image: "https://www.startech.com.bd/image/cache/catalog/offer-page/new-studio-equipment-offer-400x400.webp",
    link: "/information/offer",
  },
  {
    id: 10,
    title: "Pen Drive Flash Deal",
    description: "Buy Pen Drives and Get Exciting Discounts",
    dateFrom: "15 Jul 2026",
    dateTo: "31 Aug 2026",
    availability: "All Outlet",
    image: "https://www.startech.com.bd/image/cache/catalog/offer-page/2026/pendrive-flash-deal-aug-400x400.webp",
    link: "/information/offer",
  },
  {
    id: 11,
    title: "Logitech GAME ON REWARDS ON",
    description: "Buy Selected Logitech products and Get Amazing Gifts",
    dateFrom: "15 Jul 2026",
    dateTo: "15 Aug 2026",
    availability: "All Outlet",
    image: "https://www.startech.com.bd/image/cache/catalog/offer-page/2026/25-06-26a-(Logitech-game-on-reward-on-offer)-square-400x400.webp",
    link: "/information/offer",
  },
  {
    id: 12,
    title: "Dahua Router Coffee Mug Offer",
    description: "Buy Dahua Router & Get Exciting Gifts!",
    dateFrom: "11 Jul 2026",
    dateTo: "31 Jul 2026",
    availability: "All Outlet",
    image: "https://www.startech.com.bd/image/cache/catalog/offer-page/2026/dahua-router-offer-page-400x400.webp",
    link: "/information/offer",
  },
  {
    id: 13,
    title: "Washing Machine Mega Deal",
    description: "Buy Washing Machine & Get Exciting Discount!",
    dateFrom: "16 Jul 2026",
    dateTo: "31 Aug 2026",
    availability: "Online",
    image: "https://www.startech.com.bd/image/cache/catalog/offer-page/2026/washing-machine-offer-26-400x400.webp",
    link: "/information/offer",
  },
  {
    id: 14,
    title: "Home Theater Deal",
    description: "Buy Home Theater & Get Exciting Discount!",
    dateFrom: "13 Jul 2026",
    dateTo: "31 Jul 2026",
    availability: "Online",
    image: "https://www.startech.com.bd/image/cache/catalog/offer-page/2026/home-theater-offer-bkash-added-400x400.webp",
    link: "/information/offer",
  },
  {
    id: 15,
    title: "Sewing Machine Offer",
    description: "Buy Sewing Machine and Get Exciting Discounts!",
    dateFrom: "13 Jul 2026",
    dateTo: "31 Jul 2026",
    availability: "Online",
    image: "https://www.startech.com.bd/image/cache/catalog/offer-page/2026/sewing-machine-offer-bkash-added-400x400.webp",
    link: "/information/offer",
  },
  {
    id: 16,
    title: "Air Fryer Deal",
    description: "Buy Your Favorite Air Fryers & Get Exciting Discounts !",
    dateFrom: "09 Jul 2026",
    dateTo: "31 Aug 2026",
    availability: "Online",
    image: "https://www.startech.com.bd/image/cache/catalog/offer-page/2026/air-fryer-deal-offer-page-dhaka-400x400.webp",
    link: "/information/offer",
  },
  {
    id: 17,
    title: "Blisspads Ultimate Deal",
    description: "Buy Any Blisspads & Get Exciting Discount !",
    dateFrom: "21 Jul 2026",
    dateTo: "31 Jul 2026",
    availability: "All Outlet",
    image: "https://www.startech.com.bd/image/cache/catalog/offer-page/2026/blisspads-ultimate-deal-400x400.webp",
    link: "/information/offer",
  },
  {
    id: 18,
    title: "Durgod Flash Deal!",
    description: "Buy Any Durgod Keyboard & Get Exciting Discount !",
    dateFrom: "21 Jul 2026",
    dateTo: "31 Jul 2026",
    availability: "All Outlet",
    image: "https://www.startech.com.bd/image/cache/catalog/offer-page/2026/durgod-ultimate-deal-400x400.webp",
    link: "/information/offer",
  },
];

export default function OffersPage() {
  return (
    <div style={{ backgroundColor: "#f2f4f8", minHeight: "80vh" }}>
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
              <span style={{ color: "#333" }}>Offer</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Offers Grid */}
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "15px 15px 30px" }}>
        <div className="offer-grid-container" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "30px",
        }}>
          {OFFERS_DATA.map((offer) => (
            <div key={offer.id} style={{
              backgroundColor: "#fff",
              borderRadius: "4px",
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}>
              {/* Banner Image */}
              <Link href={offer.link}>
                <img
                  src={offer.image}
                  alt={offer.title}
                  width={400}
                  height={400}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    aspectRatio: "1/1",
                    objectFit: "cover",
                  }}
                />
              </Link>

              {/* Details */}
              <div style={{ padding: "12px 15px 15px" }}>
                {/* Date & Availability Row */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                  fontSize: "12px",
                  color: "#ef4a23",
                }}>
                  <span style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                  }}>
                    <span className="material-icons" style={{ fontSize: "15px", color: "#ef4a23" }}>date_range</span>
                    <span>{offer.dateFrom}-{offer.dateTo}</span>
                  </span>
                  <span style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                  }}>
                    <span className="material-icons" style={{ fontSize: "15px", color: "#ef4a23" }}>store</span>
                    <span>{offer.availability}</span>
                  </span>
                </div>

                {/* Title */}
                <Link href={offer.link}>
                  <h4 style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#333",
                    margin: "0 0 6px",
                    lineHeight: "1.4",
                    cursor: "pointer",
                  }}>
                    {offer.title}
                  </h4>
                </Link>

                {/* Description */}
                <p style={{
                  fontSize: "13px",
                  color: "#666",
                  margin: "0 0 12px",
                  lineHeight: "1.5",
                }}>
                  {offer.description}
                </p>

                {/* View Details Button */}
                <Link
                  href={offer.link}
                  style={{
                    display: "inline-block",
                    backgroundColor: "#2d9f6f",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: 600,
                    padding: "6px 16px",
                    borderRadius: "3px",
                    border: "1px solid #2d9f6f",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#fff";
                    e.currentTarget.style.color = "#2d9f6f";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#2d9f6f";
                    e.currentTarget.style.color = "#fff";
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
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
