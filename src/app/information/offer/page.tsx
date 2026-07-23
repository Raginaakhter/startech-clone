import Link from "next/link";

const OFFERS_DATA = [
  {
    id: 1,
    title: "SINGER AC Special Offer - Flat 26% Save Offer!",
    description: "Get cool summer breeze with SINGER Inverter ACs. Save big on installation and unit price.",
    date: "Valid till: 31st August 2026",
    status: "Active",
    statusColor: "bg-green-100 text-green-700",
    image: "https://www.startech.com.bd/image/cache/catalog/air-conditioner/singer/sas18cexr32lvsgrihco/sas18cexr32lvsgrihco-official-01-200x200.webp",
    link: "/singer-1-5-ton-inverter-ac"
  },
  {
    id: 2,
    title: "EcoFlow River 3 Power Station launch - Special 17% Discount",
    description: "Prepare for electricity load shedding with the brand new EcoFlow River 3. High capacity battery bank.",
    date: "Valid till: 15th August 2026",
    status: "Active",
    statusColor: "bg-green-100 text-green-700",
    image: "https://www.startech.com.bd/image/cache/catalog/portable-power-station/ecoflow/river-3/river-3-005-200x200.webp",
    link: "/ecoflow-river-3-portable-power-station"
  },
  {
    id: 3,
    title: "AMD Ryzen 5 Desktop PC Bundled Deal - Save 6,050৳",
    description: "Assemble your home or office PC with Ryzen 5 PRO processor and matching MSI Motherboard for a bundle discount.",
    date: "Valid till: 10th August 2026",
    status: "Ending Soon",
    statusColor: "bg-orange-100 text-orange-700",
    image: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/50486-02-200x200.webp",
    link: "/amd-ryzen-5-pro-5650g-desktop-pc"
  },
  {
    id: 4,
    title: "AOC AGON Gaming Monitor - Flat 30% discount deal!",
    description: "Super fast 480Hz QHD OLED gaming display. Elevate your esport matches to maximum speed.",
    date: "Valid till: 31st July 2026",
    status: "Ending Soon",
    statusColor: "bg-orange-100 text-orange-700",
    image: "https://www.startech.com.bd/image/cache/catalog/monitor/aoc/agon-pro-ag276qkd/agon-pro-ag276qkd-001-200x200.webp",
    link: "/aoc-agon-pro-ag276qkd-gaming-monitor"
  }
];

export default function OffersPage() {
  return (
    <div className="max-w-[1300px] mx-auto px-4 w-full" style={{ minHeight: "80vh" }}>
      {/* Page Header */}
      <div className="text-center py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-text-main">Campaigns &amp; Offers</h1>
        <p className="text-sm text-text-muted mt-2">Discover latest limited-time deals and campaign promotions from Star Tech.</p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-12">
        {OFFERS_DATA.map((offer) => (
          <div key={offer.id} className="bg-white rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-shadow border border-gray-100 flex flex-col sm:flex-row">
            {/* Image Column */}
            <div className="bg-gray-50 p-6 flex items-center justify-center sm:w-[200px] shrink-0 border-b sm:border-b-0 sm:border-r border-gray-100">
              <img 
                src={offer.image} 
                alt={offer.title} 
                className="max-h-[120px] object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Info Column */}
            <div className="p-6 flex flex-col flex-1 justify-between gap-4">
              <div>
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${offer.statusColor}`}>
                    {offer.status}
                  </span>
                  <span className="text-[11px] text-text-muted">{offer.date}</span>
                </div>
                <h3 className="text-base font-bold text-text-main leading-snug hover:text-primary transition-colors">
                  <Link href={offer.link}>{offer.title}</Link>
                </h3>
                <p className="text-[13px] text-text-light mt-2 leading-relaxed">
                  {offer.description}
                </p>
              </div>

              <div>
                <Link 
                  href={offer.link} 
                  className="inline-block bg-primary hover:bg-primary-dark text-white text-xs font-semibold px-4 py-2 rounded-sm transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
