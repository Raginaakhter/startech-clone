"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─── Featured Services Data ─────────────────────────────────── */
const FEATURED_SERVICES = [
  {
    id: "desktop",
    title: "Desktop Service",
    price: "Starts from: 500৳",
    image: "https://www.startech.com.bd/image/cache/catalog/home-service/desktop-service-210x210.webp",
    href: "/servicing/desktop",
  },
  {
    id: "laptop",
    title: "Laptop Service",
    price: "Starts from: 1,000৳",
    image: "https://www.startech.com.bd/image/cache/catalog/home-service/laptop-service-210x210.webp",
    href: "/servicing/laptop",
  },
  {
    id: "printer",
    title: "Printer Service",
    price: "Starts from: 500৳",
    image: "https://www.startech.com.bd/image/cache/catalog/home-service/printer-service-210x210.webp",
    href: "/servicing/printer",
  },
  {
    id: "monitor",
    title: "Monitor Service",
    price: "Starts from: 1,000৳",
    image: "https://www.startech.com.bd/image/cache/catalog/home-service/monitor-service-210x210.webp",
    href: "/servicing/monitor",
  },
  {
    id: "projector",
    title: "Projector Service",
    price: "Starts from: 1,500৳",
    image: "https://www.startech.com.bd/image/cache/catalog/home-service/projector-service-210x210.webp",
    href: "/servicing/projector",
  },
  {
    id: "mobile",
    title: "Mobile Repair Service",
    price: "Starts from: 500৳",
    image: "https://www.startech.com.bd/image/cache/catalog/home-service/mobile-repair-service-210x210.webp",
    href: "/servicing/mobile",
  },
];

/* ─── Service Centers Data ───────────────────────────────────── */
interface ServiceCenter {
  id: number;
  name: string;
  address: string;
  phones: { label: string; number: string }[];
  dayOff: string;
  mapUrl: string;
}

const SERVICE_CENTERS: ServiceCenter[] = [
  {
    id: 1,
    name: "Sylhet Service Center",
    address: "Showdagar Tower, 1st Floor, Azadi 54/A, Mirboxtula, Sylhet",
    phones: [{ label: "Laptop & Desktop", number: "01315138171" }],
    dayOff: "Friday Off",
    mapUrl: "https://maps.google.com/?q=Sylhet+Star+Tech+Service+Center",
  },
  {
    id: 2,
    name: "Narayanganj Service Center",
    address: "Aman Bhaban, 155 BB Road, Level-3, Chashara, Narayanganj",
    phones: [{ label: "Laptop & Desktop", number: "01311717109" }],
    dayOff: "Friday Off",
    mapUrl: "https://maps.google.com/?q=Narayanganj+Star+Tech+Service+Center",
  },
  {
    id: 3,
    name: "Multiplan Service Center (Level-11)",
    address: "Shop # 1130, Level-11, Multiplan Center, New Elephant Road, Dhaka-1205",
    phones: [{ label: "Laptop", number: "01709995522" }],
    dayOff: "Tuesday Off",
    mapUrl: "https://maps.google.com/?q=Multiplan+Center+Dhaka",
  },
  {
    id: 4,
    name: "Uttara Sonargaon Janapath Service Center",
    address: "Uttarayan, House: 14, Sector: 09, Sonargaon Janapath, Uttara, Dhaka",
    phones: [
      { label: "Laptop", number: "01322811319" },
      { label: "Desktop", number: "01322811421" },
    ],
    dayOff: "Open Everyday",
    mapUrl: "https://maps.google.com/?q=Uttara+Sonargaon+Janapath+Star+Tech",
  },
  {
    id: 5,
    name: "Savar Service Center",
    address: "Shop No- 147, 2nd Floor, Savar New Market, Savar - 1340, Dhaka",
    phones: [{ label: "Laptop & Desktop", number: "01335138025" }],
    dayOff: "Wednesday Off",
    mapUrl: "https://maps.google.com/?q=Savar+Star+Tech+Service+Center",
  },
  {
    id: 6,
    name: "Gazipur Service Center",
    address: "Nazma Shahidullah Complex, 1st floor, (Besides City Bank), Rowshan Shorak, Joydebpur Road, Gazipur Chowrasta, Gazipur",
    phones: [
      { label: "Laptop", number: "01317170164" },
      { label: "Desktop", number: "01317171113" },
    ],
    dayOff: "Saturday Off",
    mapUrl: "https://maps.google.com/?q=Gazipur+Star+Tech+Service+Center",
  },
  {
    id: 7,
    name: "Mymensingh Service Center",
    address: "99/A, Parvez Tower Sharda Ghosh Road (Opposite of Women's Degree College) Mymensingh",
    phones: [{ label: "Laptop & Desktop", number: "01313522120" }],
    dayOff: "Friday Off",
    mapUrl: "https://maps.google.com/?q=Mymensingh+Star+Tech+Service+Center",
  },
  {
    id: 8,
    name: "CTG Agrabad Service Center",
    address: "Shop#25, R/F Zohura Tower, Chittagong Computer Market (Ground floor), Sk Mujib Road, Agrabad, Chittagong",
    phones: [
      { label: "Laptop", number: "01713651594" },
      { label: "Desktop", number: "01709995547" },
    ],
    dayOff: "Friday Off",
    mapUrl: "https://maps.google.com/?q=Agrabad+Star+Tech+Service+Center",
  },
  {
    id: 9,
    name: "CTG GEC Service Center",
    address: "JNS Tower (Beside National Bank), 2628/1 CDA Avenue, GEC Circle, Nasirabad, Chattogram, Bangladesh.",
    phones: [
      { label: "Laptop", number: "01713651624" },
      { label: "Desktop", number: "01713651630" },
    ],
    dayOff: "Open Everyday",
    mapUrl: "https://maps.google.com/?q=GEC+Star+Tech+Service+Center",
  },
  {
    id: 10,
    name: "Khulna Service Center",
    address: "Khan Plaza, 3rd floor, 76 KDA Avenue, Shib Bari More, Khulna",
    phones: [
      { label: "Laptop", number: "01313717161" },
      { label: "Desktop", number: "01313717099" },
    ],
    dayOff: "Friday Off",
    mapUrl: "https://maps.google.com/?q=Khulna+Star+Tech+Service+Center",
  },
  {
    id: 11,
    name: "Rajshahi Service Center",
    address: "Noor Rabeya Tower (1st floor), South Dorkharkona, Boalia, Rajshahi.",
    phones: [
      { label: "Laptop", number: "01322811329" },
      { label: "Desktop", number: "01322811326" },
    ],
    dayOff: "Friday Off",
    mapUrl: "https://maps.google.com/?q=Rajshahi+Star+Tech+Service+Center",
  },
  {
    id: 12,
    name: "Rangpur Service Center",
    address: "Chadima Hotel Building (1st floor), Opposite of Pusti Mistir Dokan, Near Payra Chottor, Rangpur",
    phones: [
      { label: "Laptop", number: "01313717096" },
      { label: "Desktop", number: "01709995491" },
    ],
    dayOff: "Friday Off",
    mapUrl: "https://maps.google.com/?q=Rangpur+Star+Tech+Service+Center",
  },
];

/* ─── Tips from Experts ─────────────────────────────────────── */
const EXPERT_TIPS = [
  {
    id: 1,
    title: "10 Common Smartphone Problems and How to Fix Them",
    image: "https://www.startech.com.bd/image/cache/catalog/blog/smartphone-problems/smartphone-problems-280x175.webp",
    href: "/blog/smartphone-problems",
  },
  {
    id: 2,
    title: "How to Prevent Your Projector from Overheating?",
    image: "https://www.startech.com.bd/image/cache/catalog/blog/projector-overheating/projector-overheating-280x175.webp",
    href: "/blog/projector-overheating",
  },
  {
    id: 3,
    title: "How to Fix Screen Flickering Issues in Windows PC?",
    image: "https://www.startech.com.bd/image/cache/catalog/blog/screen-flickering/screen-flickering-280x175.webp",
    href: "/blog/screen-flickering",
  },
  {
    id: 4,
    title: "How to Clean a Laptop Fan Safely at Home",
    image: "https://www.startech.com.bd/image/cache/catalog/blog/clean-laptop-fan/clean-laptop-fan-280x175.webp",
    href: "/blog/clean-laptop-fan",
  },
];

/* ─── Steps Data ────────────────────────────────────────────── */
const STEPS = [
  {
    title: "Describe Your Issue",
    desc: "Share the details of the problem you're experiencing, either online or in-person at our service center.",
  },
  {
    title: "Get a Quote",
    desc: "We will provide you with a detailed service plan and cost estimate, either over the phone or in-person.",
  },
  {
    title: "Approve the Service Plan",
    desc: "Review and approve the proposed service plan and cost estimate.",
  },
  {
    title: "Send or Bring Your Device",
    desc: "Securely ship your device to us or bring it directly to our service center.",
  },
  {
    title: "Get Your Device Back",
    desc: "Once repaired, we will swiftly return your device to you, or you can pick it up from our service center.",
  },
];

/* ─── SEO Content ───────────────────────────────────────────── */
const SEO_SECTIONS = [
  {
    title: "Best Computer Service in Bangladesh",
    content:
      "At Star Tech Service Center, we understand the integral role technology plays in your daily life, both at home and in the office. That's why we're dedicated to providing comprehensive and reliable servicing for all your tech products. From laptops and desktops to printers, projectors, monitors, office equipment, and television, our team of expert technicians is here to ensure your devices are running smoothly and efficiently. With years of experience and a team of highly skilled technicians, Star Tech Service Center is dedicated to providing comprehensive computer servicing for all your tech products.",
  },
  {
    title: "Services Offered at Star Tech Service Center",
    content:
      "Star Tech Service Center offers a wide range of repair services to get your devices back in top shape. Among all the services, our most popular repair services are as follows:",
  },
  {
    title: "Desktop Repair Service",
    content:
      "At Star Tech Service Center, we offer comprehensive desktop repair services to address hardware and software issues efficiently. Whether you're facing hardware issues like faulty components, overheating problems, or software glitches, our technicians have the expertise to diagnose and provide proper servicing to fix the problem efficiently. Trust Star Tech Service Center for all your desktop repair needs to keep your home or office computers running smoothly.",
  },
  {
    title: "Laptop Repair Service",
    content:
      "Star Tech Service Center specializes in laptop servicing, for all major laptop brands and models. Whether you're facing display issues, keyboard malfunctions, battery problems, or software errors, our engineers have the expertise to get your laptop back in working order quickly and effectively.",
  },
  {
    title: "Printer Repair Service",
    content:
      "Star Tech Service Center provides professional printer servicing for inkjet, laser, and all-in-one printers. Our well-trained technicians are equipped to diagnose and resolve printer issues such as paper jams, print quality problems, and connectivity issues efficiently.",
  },
  {
    title: "Camera Repair Service",
    content:
      "When it comes to camera servicing, Star Tech Service Center is your trusted partner. Our experienced technicians specialize in diagnosing and repairing digital cameras, DSLRs, and camcorders. Whether your camera has a broken lens, sensor issues, or connectivity problems, you can rely on Star Tech Service Center for reliable camera repair service.",
  },
  {
    title: "iMac and MacBook Repair Service",
    content:
      "Star Tech Service Center offers specialized iMac and MacBook repair services to address hardware and software issues. Our MacBook and iMac repair service is tailored to address a wide range of problems, including display issues, hard drive failures, logic board problems, and more. Our Apple Certified technicians use genuine Apple parts and follow strict repair protocols to ensure your iMac or MacBook is restored to its optimal condition.",
  },
  {
    title: "Monitor Repair Service",
    content:
      "At Star Tech Service Center, we provide professional monitor repair services for LCD, LED, and OLED displays. Whether your monitor has a blank screen, flickering display, dead pixels, or color distortion, our expert technicians can diagnose and repair monitor issues efficiently.",
  },
  {
    title: "TV Repair Service",
    content:
      "Star Tech Service Center provides professional TV repair services for LED, LCD, OLED, and Smart TVs. Whether your TV has a blank screen, distorted picture, or sound problems, our technicians can diagnose and repair TV issues efficiently. Choose Star Tech Service Center for expert TV servicing.",
  },
  {
    title: "How We Provide Our Services",
    content:
      "Star Tech Service Center aims to make the repair process as smooth and transparent as possible. We believe in keeping our customers informed throughout the repair process. You'll receive a clear diagnosis of the issue along with a detailed repair estimate before any work begins. We'll also keep you updated on the progress of the repair and answer any questions you may have. Here is the simple process of how we execute our servicing:",
  },
  {
    title: "Service Request",
    content:
      "The process begins when you contact Star Tech Service Center, either through phone, email, or online booking system for an appointment or arrive at the service center with your device requiring servicing.",
  },
  {
    title: "Inspection and Diagnosis",
    content:
      "Upon receiving the device, our expert technicians immediately conduct a preliminary inspection and diagnosis of your device to pinpoint the exact problem.",
  },
  {
    title: "Clear Communication and Estimate",
    content:
      "After the diagnosis, we'll provide you with a clear explanation of the issues found in your device. You'll also receive a detailed estimate for the needed repairs, the cost of parts, and the estimated turnaround time.",
  },
  {
    title: "Device Servicing and Testing",
    content:
      "With your approval, our engineers begin the necessary repairs, upgrades, or servicing tasks as per the initial assessment. Star Tech Service Center conducts repairs using only genuine parts to maintain the highest quality standards.",
  },
  {
    title: "Device Delivery",
    content:
      "Once the repair is complete, we'll notify you and ensure your device is ready for pick-up or delivery depending on your chosen service.",
  },
  {
    title: "Why Choose Star Tech Service Center?",
    content:
      "Star Tech Service Center is not just a computer repair shop; we are your one-stop solution for all your tech needs. Here are the reasons why Star Tech is the best option for repair and servicing in BD:",
  },
];

/* ─── Brand Partners ────────────────────────────────────────── */
const BRAND_PARTNERS = [
  {
    label: "Certified Technician",
    icon: (
      <svg className="w-6 h-6 text-[#3749bb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    label: "Authorized Service Center",
    icon: <span className="text-[20px] font-bold text-[#1e3a5f] tracking-tight" style={{ fontFamily: "serif" }}>DELL</span>,
  },
  {
    label: "Authorized Service Center",
    icon: <span className="text-[20px] font-bold text-[#0096d6] tracking-tight">hp</span>,
  },
  {
    label: "Authorized Service Partner",
    icon: <span className="text-[17px] font-bold text-[#e2231a] tracking-tight italic">Lenovo</span>,
  },
];

/* ─── Carousel Slides Data ───────────────────────────────────── */
const CAROUSEL_SLIDES = [
  {
    id: "phone",
    image: "/images/mobile-repair-banner.png",
    badgeBg: "bg-[#10b981]",
    title: "ফোনের প্রতিটি সমস্যার",
    subtitle: "নির্ভরযোগ্য সমাধান ✅",
    badge: "এখন স্টার টেকে ১৬৭৯৩",
  },
  {
    id: "laptop",
    image: "/images/laptop-service-banner.png",
    badgeBg: "bg-[#10b981]",
    title: "ল্যাপটপ সার্ভিসিংয়ে",
    subtitle: "বিশ্বস্ততার সাথে আমরা আছি আপনার পাশে ✅",
    badge: "১৬৭৯৩",
  },
  {
    id: "desktop",
    image: "/images/desktop-service-banner.png",
    badgeBg: "bg-[#ea580c]",
    title: "দক্ষ হাতে, যত্ন নিয়ে",
    subtitle: "সার্ভিস নিন ঘরে বসে!",
    badge: "কল করুন ১৬৭৯৩",
  },
  {
    id: "printer",
    image: "/images/printer-service-banner.png",
    badgeBg: "bg-[#0284c7]",
    title: "প্রিন্টারের যেকোনো সমস্যার",
    subtitle: "নির্ভরযোগ্য সমাধান",
    badge: "স্টার টেক সার্ভিস সেন্টার",
  },
];

/* ═══════════════════════════════════════════════════════════════ */

export default function ServicingPage() {
  // Form state
  const [formService, setFormService] = useState("Desktop Service");
  const [serviceName, setServiceName] = useState("");
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formIssue, setFormIssue] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Banner carousel state
  const [bannerIndex, setBannerIndex] = useState(0);

  // Auto-play interval effect
  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setBannerIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const handleNextSlide = () => {
    setBannerIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const handleFormSubmit = () => {
    if (!formName.trim() || !formPhone.trim()) {
      alert("Please enter your Name and Phone Number.");
      return;
    }
    setFormSubmitted(true);
  };

  const currentSlide = CAROUSEL_SLIDES[bannerIndex];

  return (
    <div className="bg-[#f2f4f8] min-h-screen font-sans py-3">
      <div className="max-w-[1300px] mx-auto px-3">

        {/* ═══════════════════════════════════════════════════════
            TOP HERO BANNER CAROUSEL (Matching service.startech.com.bd)
        ═══════════════════════════════════════════════════════ */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-sm mb-4 border border-[#e5e7eb] group">
          <div className="relative w-full h-[240px] sm:h-[300px] md:h-[360px] bg-[#1e293b] flex items-center justify-between overflow-hidden">
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />

            {/* Banner Background Image */}
            <Image
              src={currentSlide.image}
              alt={currentSlide.title}
              fill
              priority
              sizes="(max-width: 1300px) 100vw, 1300px"
              className="object-cover object-center transition-all duration-700"
            />

            {/* Text  Content */}
            <div className="absolute inset-y-0 left-0 z-15 flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-[85%] md:max-w-[65%] text-white">
              {currentSlide.badge && (
                <span className={`inline-block self-start text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider text-white ${currentSlide.badgeBg}`}>
                  {currentSlide.badge}
                </span>
              )}
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-2 text-white drop-shadow-md">
                {currentSlide.title}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-200 font-medium mb-5 drop-shadow-sm">
                {currentSlide.subtitle}
              </p>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="#service-form"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("service-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-[#ef4a23] hover:bg-[#d93815] text-white font-bold text-[11px] sm:text-[12px] px-4 py-2 rounded-lg transition-all shadow-md transform hover:-translate-y-0.5 cursor-pointer"
                >
                  সার্ভিস বুক করুন
                </a>
                <a
                  href="tel:16793"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-[11px] sm:text-[12px] px-4 py-2 rounded-lg transition-all backdrop-blur-xs flex items-center gap-2 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 text-[#ef4a23]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.3 11.3 0 005.455 5.456l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-1C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  ১৬৭৯৩
                </a>
              </div>
            </div>

            {/* Prev Arrow Control */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center text-xl transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
            >
              ‹
            </button>

            {/* Next Arrow Control */}
            <button
              onClick={handleNextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center text-xl transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
            >
              ›
            </button>

            {/* Carousel Navigation Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
              {CAROUSEL_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setBannerIndex(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${bannerIndex === idx ? "w-6 bg-[#ef4a23]" : "w-2.5 bg-white/70 hover:bg-white"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            BRAND TRUST BAR (Matching Screenshot)
        ═══════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-xl border border-[#e5e7eb] py-4 px-6 mb-6 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {BRAND_PARTNERS.map((bp, i) => (
              <div key={i} className="flex items-center justify-center gap-3">
                <div className="shrink-0">{bp.icon}</div>
                <div className="text-[12px] text-[#475569] font-medium leading-tight">
                  {bp.label.split(" ").length > 1 ? (
                    <>
                      {bp.label.split(" ").slice(0, -1).join(" ")}
                      <br />
                      <span className="font-bold text-[#111827]">{bp.label.split(" ").slice(-1)}</span>
                    </>
                  ) : (
                    <span className="font-bold text-[#111827]">{bp.label}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            FORM + STEPS TWO-COLUMN SECTION (Matching Screenshot)
        ═══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
          {/* ── Left Column: Fill The Form (Beige/Pink Background Card) ── */}
          <div id="service-form" className="bg-[#f6e7e4] rounded-2xl p-6 sm:p-7 border border-[#eed4cf] scroll-mt-20">
            <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest block mb-1">
              FILL THE FORM
            </span>
            <h2 className="text-[22px] font-extrabold text-[#1e293b] mb-5">
              Get Help From Experts
            </h2>

            {!formSubmitted ? (
              <div className="space-y-4">
                {/* Service Dropdown */}
                <div>
                  <label className="block text-[11px] font-bold text-[#475569] mb-1">
                    Service You Are Looking For
                  </label>
                  <select
                    value={formService}
                    onChange={(e) => setFormService(e.target.value)}
                    className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-[13px] bg-white outline-none focus:border-[#3749bb] cursor-pointer"
                  >
                    <option>Desktop Service</option>
                    <option>Laptop Service</option>
                    <option>Printer Service</option>
                    <option>Monitor Service</option>
                    <option>Projector Service</option>
                    <option>Mobile Repair Service</option>
                    <option>Camera Repair Service</option>
                    <option>iMac and MacBook Repair Service</option>
                    <option>TV Repair Service</option>
                  </select>
                </div>

                {/* Service Name Input */}
                <div>
                  <label className="block text-[11px] font-bold text-[#475569] mb-1">
                    Service Name
                  </label>
                  <input
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="Service Name"
                    className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-[13px] bg-white outline-none focus:border-[#3749bb]"
                  />
                </div>

                {/* Issue Textarea */}
                <div>
                  <label className="block text-[11px] font-bold text-[#475569] mb-1">
                    A Little About The Issue
                  </label>
                  <textarea
                    rows={4}
                    value={formIssue}
                    onChange={(e) => setFormIssue(e.target.value)}
                    placeholder="Write here"
                    className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-[13px] bg-white outline-none focus:border-[#3749bb] resize-none"
                  />
                </div>

                {/* Name & Phone Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#475569] mb-1">Name</label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Name"
                      className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-[13px] bg-white outline-none focus:border-[#3749bb]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#475569] mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="Phone"
                      className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-[13px] bg-white outline-none focus:border-[#3749bb]"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-[11px] font-bold text-[#475569] mb-1">Email</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full border border-[#cbd5e1] rounded-lg px-3 py-2.5 text-[13px] bg-white outline-none focus:border-[#3749bb]"
                  />
                </div>

                {/* Submit Red Button */}
                <button
                  onClick={handleFormSubmit}
                  className="w-full bg-[#d92723] hover:bg-[#b91c1c] text-white font-bold text-[14px] py-3 rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  Submit Your Request
                </button>
              </div>
            ) : (
              /* Success Screen */
              <div className="bg-white rounded-xl p-6 text-center shadow-xs">
                <div className="w-14 h-14 rounded-full bg-[#10b981] text-white flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-extrabold text-[#1e293b] mb-1">Request Submitted!</h3>
                <p className="text-[13px] text-[#475569] mb-2">
                  Thank you, <span className="font-bold text-[#ef4a23]">{formName}</span>!
                </p>
                <p className="text-[12px] text-[#64748b] mb-4">
                  Our service engineers will call you at <span className="font-bold text-[#1e293b]">{formPhone}</span> to confirm your appointment.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setServiceName("");
                    setFormName("");
                    setFormPhone("");
                    setFormEmail("");
                    setFormIssue("");
                  }}
                  className="text-[12px] font-bold text-[#3749bb] hover:underline cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            )}
          </div>

          {/* ── Right Column: Follow These Simple Steps (White Card) ── */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e5e7eb]">
            <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest block mb-1">
              GET SERVED
            </span>
            <h2 className="text-[22px] font-extrabold text-[#1e293b] mb-6">
              Follow These Simple Steps
            </h2>

            <div className="space-y-6 relative">
              {STEPS.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  {/* Hollow Circle Icon + Vertical Connecting Line */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full border-2 border-[#3749bb] bg-white flex items-center justify-center shrink-0 z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#3749bb]" />
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="w-0.5 h-10 bg-[#e2e8f0] absolute top-6 left-1/2 -translate-x-1/2" />
                    )}
                  </div>

                  <div className="-mt-0.5">
                    <h4 className="text-[14px] font-bold text-[#1e293b] mb-0.5">{step.title}</h4>
                    <p className="text-[12px] text-[#64748b] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            FEATURED SERVICES GRID (Matching Screenshot)
        ═══════════════════════════════════════════════════════ */}
        <div className="mb-8">
          <div className="text-center mb-5">
            <h2 className="text-[22px] font-extrabold text-[#1e293b] mb-1">Featured Services</h2>
            <p className="text-[12px] text-[#64748b]">Get your Tech product repair services from Experts !</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {FEATURED_SERVICES.map((svc) => (
              <Link
                key={svc.id}
                href={svc.href}
                className="bg-white rounded-xl border border-[#e5e7eb] p-2 flex flex-col items-center justify-between hover:shadow-md transition-all group"
              >
                <div className="h-32 w-full flex items-center justify-center p-2 mb-2 bg-[#f8fafc] rounded-lg overflow-hidden">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
                <div className="text-center w-full">
                  <h3 className="text-[12px] font-bold text-[#1e293b] leading-tight mb-1">{svc.title}</h3>
                  <p className="text-[10px] text-[#64748b] font-medium">{svc.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            15+ DEDICATED SERVICE CENTER BANNER (Matching Screenshot)
        ═══════════════════════════════════════════════════════ */}
        <div className="mb-6">
          <div className="bg-[#1e3a8a] rounded-xl py-5 px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-4 text-white">
              <span className="text-[42px] font-black leading-none">15+</span>
              <h3 className="text-[18px] sm:text-[20px] font-bold">Dedicated Service Center</h3>
            </div>
            <a
              href="#service-centers"
              className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-[13px] px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 shrink-0 shadow-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              See Our Locations
            </a>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            SERVICE CENTERS GRID (Matching Screenshot)
        ═══════════════════════════════════════════════════════ */}
        <div id="service-centers" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {SERVICE_CENTERS.map((center) => (
            <div
              key={center.id}
              className="bg-white rounded-xl border border-[#e5e7eb] p-5 flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                <h3 className="text-[14px] font-extrabold text-[#1e293b] mb-1.5">{center.name}</h3>
                <p className="text-[11px] text-[#64748b] leading-relaxed mb-3">{center.address}</p>

                <div className="space-y-1 mb-4">
                  {center.phones.map((phone, pi) => (
                    <p key={pi} className="text-[11px] text-[#475569]">
                      <span className="font-semibold">{phone.label}</span> -{" "}
                      <a href={`tel:${phone.number}`} className="text-[#3749bb] hover:underline font-medium">
                        {phone.number}
                      </a>
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#f1f5f9] pt-3 mt-2">
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded ${center.dayOff === "Open Everyday"
                    ? "bg-[#f0fdf4] text-[#16a34a]"
                    : "bg-[#f1f5f9] text-[#64748b]"
                  }`}>
                  {center.dayOff}
                </span>

                <a
                  href={center.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#3749bb] hover:bg-[#2b3992] text-white text-[11px] font-bold px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Get Direction</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════
            TIPS FROM EXPERTS (Matching Screenshot)
        ═══════════════════════════════════════════════════════ */}
        <div className="mb-10">
          <div className="text-center mb-5">
            <h2 className="text-[22px] font-extrabold text-[#1e293b] mb-1">Tips from Experts</h2>
            <p className="text-[12px] text-[#64748b]">Here you can find experts suggestion and servicing tips of your Tech products!</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EXPERT_TIPS.map((tip) => (
              <Link
                key={tip.id}
                href={tip.href}
                className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="h-[150px] overflow-hidden bg-[#1e3a8a] relative flex items-center justify-center p-3">
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
                <div className="p-3 bg-white flex items-center justify-between border-t border-[#f1f5f9]">
                  <h3 className="text-[12px] font-bold text-[#1e293b] leading-tight line-clamp-2 group-hover:text-[#3749bb] transition-colors">
                    {tip.title}
                  </h3>
                  <span className="text-[#3749bb] font-bold text-sm shrink-0 ml-2">↗</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            SEO ARTICLES SECTION (Matching Screenshot)
        ═══════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e5e7eb] mb-10 shadow-xs">
          <div className="space-y-4">
            {SEO_SECTIONS.map((sec, i) => (
              <div key={i}>
                <h3 className={`font-bold text-[#1e293b] mb-1.5 ${i === 0 ? "text-[16px]" : "text-[13px]"}`}>
                  {sec.title}
                </h3>
                <p className="text-[12px] text-[#64748b] leading-relaxed">{sec.content}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
