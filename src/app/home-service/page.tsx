"use client";
import { useState } from "react";
import Link from "next/link";

/* ─── Reviews Data ──────────────────────────────────────────── */
interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Ritu Biswa",
    rating: 5,
    text: "Recently I noticed my PC is not working properly and I don't have the time to visit any shop. I contact with the Star Tech and book a home service. The Service engineer came to my home and fix a variety of issues like hardware problems to and network setup. This service saves my time and effort. It's an excellent option for emergency fixes and it's also amazing option to provide a professional support in home. Thanks to Star Tech for caring their consumers comfort.",
  },
  {
    id: 2,
    name: "Mohammad Zahid",
    rating: 3.5,
    text: "Recently I had a good experience with Star Tech. They figured out my computer problem very shortly, and now it running like before! The technician was friendly and professional. Highly recommend it if you want to repair your computer components with expert technicians.",
  },
];

/* ─── FAQ Data ──────────────────────────────────────────────── */
interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const FAQS: FAQ[] = [];

/* ─── Hardware & Software Services ──────────────────────────── */
const HARDWARE_SERVICES = [
  { text: "Fixing Desktop PC hardware issues like faulty components.", color: "#ef4a23" },
  { text: "Addressing Laptop display, keyboard, and battery problems.", color: "#3749bb" },
  { text: "Servicing inkjet, laser, and all-in-one printers.", color: "#ef4a23" },
  { text: "Repairing display, hard drive, and logic board of iMac/MacBook.", color: "#3749bb" },
  { text: "Fixing Monitor blank screens and flickering displays.", color: "#ef4a23" },
  { text: "Repairing LED, LCD, OLED, and Smart TVs.", color: "#3749bb" },
];

const SOFTWARE_SERVICES = [
  { text: "Virus and malware removal", color: "#ef4a23" },
  { text: "Operating system installation and updates", color: "#3749bb" },
  { text: "Software installation and troubleshooting", color: "#ef4a23" },
  { text: "Resolving macOS issues", color: "#3749bb" },
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

/* ─── Brand Partners ────────────────────────────────────────── */
const BRAND_PARTNERS = [
  {
    label: "Certified Technician",
    icon: (
      <svg className="w-7 h-7 text-[#3749bb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    label: "Authorized Service Center",
    icon: <span className="text-[22px] font-bold text-[#1e3a5f] tracking-tight" style={{ fontFamily: "serif" }}>DELL</span>,
  },
  {
    label: "Authorized Service Center",
    icon: <span className="text-[22px] font-bold text-[#0096d6] tracking-tight">hp</span>,
  },
  {
    label: "Authorized Service Partner",
    icon: <span className="text-[18px] font-bold text-[#e2231a] tracking-tight italic">Lenovo</span>,
  },
];

/* ─── SEO Content Sections ──────────────────────────────────── */
const SEO_SECTIONS = [
  {
    title: "Best Home Service for Desktop Computer, Laptop, and Printer Repair",
    content:
      "At Star Tech Service Center, we provide exceptional home services designed to keep your desktop computers, laptops, and printers running at peak performance. Our goal is to deliver comprehensive, convenient, and expert support directly to your doorstep, ensuring that all your tech devices function seamlessly.",
  },
  {
    title: "Affordable Desktop PC Service at Home",
    content:
      "For Desktop Computer home servicing, we offer a range of repair services designed to address both hardware and software needs. Our component upgrade service is designed to enhance your desktop's performance by installing the latest RAM, SSDs, or graphics cards. If you encounter issues with your motherboard or graphics card, our skilled technicians can diagnose and repair these critical components, ensuring your system operates smoothly. We also provide reliable data recovery services to retrieve lost or deleted files, helping you recover important documents and data. Additionally, we tackle power and display issues, addressing problems like unexpected shutdowns and display malfunctions. Our cable management service improves system airflow and efficiency by neatly organizing and securing cables, which helps prevent overheating and ensures better overall performance.",
  },
  {
    title: "Reliable Laptop Repair Home Service in Bangladesh",
    content:
      "When it comes to laptop repair service, our home service covers a broad spectrum of needs. Whether you need a performance boost through component upgrades or you're facing blue screen errors, our technicians are equipped to handle it all. We specialize in diagnosing and resolving blue screen issues, ensuring your laptop runs smoothly and efficiently. Our hardware repair services address problems such as battery failures or keyboard malfunctions, restoring your laptop's functionality. We also manage software installations, including setting up operating systems like Windows, Linux, and Mac OS, and configuring essential software to meet your needs. To protect your laptop from malware and security threats, we offer comprehensive antivirus setup and removal services, ensuring your device remains safe and secure.",
  },
  {
    title: "Trusted Printer Repair Home Services in BD",
    content:
      "For printer repair home service, we provide a full range of support to keep your printing needs met. Our setup and installation service ensures that your printer is correctly configured and ready to use. We also handle troubleshooting for common issues such as paper jams, print quality problems, and connectivity issues, providing effective solutions to keep your printer functioning properly. Routine maintenance is part of our service, helping to prevent potential issues and ensuring that your printer performs reliably over time.",
  },
  {
    title: "Best Computer Service at Home | Star Tech Service Center",
    content:
      "At Star Tech Service Center, our home services are designed to offer maximum convenience, bringing expert support right to your door. Our certified technicians are dedicated to delivering high-quality service with clear and upfront pricing, ensuring that you receive the best value for your investment. Whether you need help with desktop computers, laptops, or printers, Star Tech Service Center is your trusted partner for all your tech servicing needs. Call 16793 to schedule your computer repair home service and experience unparalleled support for your technology.",
  },
];

/* ══════════════════════════════════════════════════════════════ */

export default function HomeServicePage() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingAddress, setBookingAddress] = useState("");
  const [bookingIssue, setBookingIssue] = useState("");
  const [bookingDevice, setBookingDevice] = useState("Desktop PC");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmitReview = () => {
    if (!reviewName.trim() || !reviewText.trim()) return;
    const newReview: Review = {
      id: Date.now(),
      name: reviewName.trim(),
      rating: reviewRating,
      text: reviewText.trim(),
    };
    setReviews((prev) => [...prev, newReview]);
    setReviewName("");
    setReviewRating(5);
    setReviewText("");
    setShowReviewForm(false);
  };

  const handleBookService = () => {
    if (!bookingName.trim() || !bookingPhone.trim()) return;
    setBookingSubmitted(true);
  };

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const stars = [];
    for (let i = 0; i < full; i++) {
      stars.push(
        <svg key={`f${i}`} className="w-3.5 h-3.5 text-[#f59e0b]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    if (hasHalf) {
      stars.push(
        <svg key="half" className="w-3.5 h-3.5 text-[#f59e0b]" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfGrad">
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>
          <path fill="url(#halfGrad)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="bg-[#f2f4f8] min-h-screen font-sans">
      {/* ─── Breadcrumb ─────────────────────────────────────── */}
      <div className="max-w-[1300px] mx-auto px-4 pt-3 pb-1">
        <div className="text-[12px] text-[#64748b] flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#3749bb]">Home</Link>
          <span>/</span>
          <span className="text-[#111827] font-semibold">Computer Home Service</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════ */}
      <div className="max-w-[1300px] mx-auto px-4 mb-6">
        <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Side Content */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
              <h1 className="text-[26px] md:text-[30px] font-extrabold text-[#111827] leading-tight mb-2">
                Computer Home Service
              </h1>
              <p className="text-[13px] text-[#475569] leading-relaxed mb-5 max-w-[480px]">
                Our expert engineers are equipped to offer convenient computer repair services at home. Enjoy hassle-free repair
                service for your desktop, laptop, printer, monitor, and TV from the comfort of your home.
              </p>

              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-[#fff7ed] border border-[#fed7aa] text-[#ea580c] text-[11px] font-bold px-3 py-1.5 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" />
                  </svg>
                  Starting From: 599৳
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#f0fdf4] border border-[#bbf7d0] text-[#16a34a] text-[11px] font-bold px-3 py-1.5 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  Home Service Available
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#eff6ff] border border-[#bfdbfe] text-[#2563eb] text-[11px] font-bold px-3 py-1.5 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  5 Out of 5.0
                </span>
              </div>

              {/* Checkmark Features */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mb-5 max-w-[340px]">
                {["Quick Service", "Certified Engineer", "Genuine Parts", "Affordable"].map((f) => (
                  <div key={f} className="flex items-center gap-1.5 text-[12px] text-[#374151]">
                    <svg className="w-3.5 h-3.5 text-[#3749bb] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </div>
                ))}
              </div>

              {/* Book A Service Button */}
              <button
                onClick={() => {
                  setBookingSubmitted(false);
                  setShowBookingModal(true);
                }}
                className="bg-[#ef4a23] hover:bg-[#d93a15] text-white font-bold text-[13px] px-6 py-2.5 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2 w-fit shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book A Service
              </button>
            </div>

            {/* Right Side - Hero Image */}
            <div className="md:w-[420px] lg:w-[480px] relative overflow-hidden min-h-[260px]">
              <img
                src="/images/home-service-banner.png"
                alt="Computer Home Service - দক্ষ হাতে, যত্ন নিয়ে সার্ভিস নিন ঘরে বসে! Dial: 16793"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          BRAND TRUST BAR
      ═══════════════════════════════════════════════════════ */}
      <div className="max-w-[1300px] mx-auto px-4 mb-6">
        <div className="bg-white rounded-xl border border-[#e5e7eb] py-5 px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {BRAND_PARTNERS.map((bp, i) => (
              <div key={i} className="flex items-center justify-center gap-3">
                <div className="shrink-0">{bp.icon}</div>
                <div className="text-[12px] text-[#475569] font-medium leading-tight">
                  {bp.label.split(" ").length > 1 ? (
                    <>
                      {bp.label.split(" ").slice(0, -1).join(" ")}
                      <br />
                      <span className="font-semibold text-[#111827]">{bp.label.split(" ").slice(-1)}</span>
                    </>
                  ) : (
                    <span className="font-semibold text-[#111827]">{bp.label}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          SERVICES + REVIEWS TWO-COLUMN SECTION
      ═══════════════════════════════════════════════════════ */}
      <div className="max-w-[1300px] mx-auto px-4 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* ── Left Column: Services + FAQs (3/5) ── */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-[#e5e7eb] p-6">
            <h2 className="text-[18px] font-extrabold text-[#111827] mb-1 border-b-2 border-[#ef4a23] pb-2 inline-block">Services</h2>
            <p className="text-[12px] text-[#475569] mt-3 mb-5">
              Under the Computer Home Service you can avail the following services:
            </p>

            {/* Hardware Services */}
            <h3 className="text-[13px] font-bold text-[#111827] mb-3">Hardware Services:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5 mb-6">
              {HARDWARE_SERVICES.map((svc, i) => (
                <div key={i} className="flex items-start gap-2">
                  <svg className="w-4 h-4 shrink-0 mt-0.5" style={{ color: svc.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[12px] text-[#475569] leading-snug">{svc.text}</span>
                </div>
              ))}
            </div>

            {/* Software Services */}
            <h3 className="text-[13px] font-bold text-[#111827] mb-3">Software Services:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
              {SOFTWARE_SERVICES.map((svc, i) => (
                <div key={i} className="flex items-start gap-2">
                  <svg className="w-4 h-4 shrink-0 mt-0.5" style={{ color: svc.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[12px] text-[#475569] leading-snug">{svc.text}</span>
                </div>
              ))}
            </div>

            {/* FAQs */}
            <div className="border-t border-[#e5e7eb] pt-5">
              <h2 className="text-[18px] font-extrabold text-[#111827] mb-1 border-b-2 border-[#ef4a23] pb-2 inline-block">FAQs</h2>
              <p className="text-[12px] text-[#475569] mt-3 mb-3">
                Let&apos;s go through the answers of frequently asked questions.
              </p>
              {FAQS.length > 0 ? (
                <div className="space-y-2">
                  {FAQS.map((faq) => (
                    <div key={faq.id} className="border border-[#e5e7eb] rounded-lg overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                        className="w-full flex items-center justify-between p-3 text-left text-[13px] font-semibold text-[#111827] hover:bg-[#f8fafc] transition-colors cursor-pointer"
                      >
                        {faq.question}
                        <svg className={`w-4 h-4 shrink-0 transition-transform ${openFaq === faq.id ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openFaq === faq.id && (
                        <div className="px-3 pb-3 text-[12px] text-[#475569] leading-relaxed border-t border-[#f3f4f6]">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[12px] text-[#3749bb] font-medium">There are no FAQs.</p>
              )}
            </div>
          </div>

          {/* ── Right Column: Reviews (2/5) ── */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-[#e5e7eb] p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-[18px] font-extrabold text-[#111827] border-b-2 border-[#ef4a23] pb-2 inline-block">Reviews</h2>
                <p className="text-[12px] text-[#475569] mt-2">What our customer says</p>
              </div>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="border border-[#3749bb] text-[#3749bb] hover:bg-[#3749bb] hover:text-white text-[11px] font-bold px-3.5 py-1.5 rounded transition-colors cursor-pointer"
              >
                Write a review
              </button>
            </div>

            {/* Write Review Form (Dynamic) */}
            {showReviewForm && (
              <div className="mb-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4 animate-fadeIn">
                <h4 className="text-[13px] font-bold text-[#111827] mb-3">Write Your Review</h4>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full border border-[#d1d5db] rounded px-3 py-2 text-[12px] mb-2 outline-none focus:border-[#3749bb]"
                />
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[12px] text-[#475569]">Rating:</span>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="border border-[#d1d5db] rounded px-2 py-1 text-[12px] outline-none focus:border-[#3749bb] cursor-pointer"
                  >
                    <option value={5}>5 / 5</option>
                    <option value={4.5}>4.5 / 5</option>
                    <option value={4}>4 / 5</option>
                    <option value={3.5}>3.5 / 5</option>
                    <option value={3}>3 / 5</option>
                    <option value={2.5}>2.5 / 5</option>
                    <option value={2}>2 / 5</option>
                    <option value={1}>1 / 5</option>
                  </select>
                </div>
                <textarea
                  rows={4}
                  placeholder="Share your experience..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full border border-[#d1d5db] rounded px-3 py-2 text-[12px] mb-3 outline-none focus:border-[#3749bb] resize-none"
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSubmitReview}
                    className="bg-[#3749bb] hover:bg-[#2b3992] text-white text-[12px] font-bold px-5 py-2 rounded transition-colors cursor-pointer"
                  >
                    Submit Review
                  </button>
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="text-[12px] text-[#6b7280] hover:text-[#111827] font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-5">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-[#f3f4f6] pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[13px] font-bold text-[#ef4a23]">{review.name}</h4>
                    <span className="inline-flex items-center gap-1 bg-[#16a34a] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {review.rating} / 5
                    </span>
                  </div>
                  <p className="text-[11px] text-[#475569] leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          BLUE CTA BANNER
      ═══════════════════════════════════════════════════════ */}
      <div className="max-w-[1300px] mx-auto px-4 mb-8">
        <div className="bg-[#3749bb] rounded-xl py-5 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <h3 className="text-white text-[17px] md:text-[19px] font-extrabold leading-snug">
            Get Computer Home Service From us at a<br className="hidden md:block" /> cheap price in BD.
          </h3>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setBookingSubmitted(false);
                setShowBookingModal(true);
              }}
              className="bg-white hover:bg-[#f8fafc] text-[#3749bb] font-bold text-[13px] px-5 py-2.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get Started
            </button>
            <span className="text-white/70 text-[13px] font-medium">or</span>
            <a
              href="tel:16793"
              className="bg-white hover:bg-[#f8fafc] text-[#111827] font-bold text-[13px] px-5 py-2.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4 text-[#16a34a]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call: 16793
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          GET SERVED – FOLLOW THESE FOUR SIMPLE STEPS
      ═══════════════════════════════════════════════════════ */}
      <div className="max-w-[1300px] mx-auto px-4 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Left Title */}
          <div className="md:col-span-2">
            <span className="text-[11px] font-bold text-[#6b7280] uppercase tracking-widest mb-2 block">GET SERVED</span>
            <h2 className="text-[28px] md:text-[32px] font-extrabold text-[#111827] leading-tight">
              Follow These Four<br />Simple Steps
            </h2>
          </div>

          {/* Right Steps */}
          <div className="md:col-span-3">
            <div className="space-y-6">
              {STEPS.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  {/* Step Circle */}
                  <div className="w-8 h-8 rounded-full border-2 border-[#e5e7eb] flex items-center justify-center shrink-0 mt-0.5 relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#3749bb]" />
                    {/* Connector Line */}
                    {i < STEPS.length - 1 && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-6 bg-[#e5e7eb]" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#111827] mb-0.5">{step.title}</h4>
                    <p className="text-[12px] text-[#475569] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          SEO CONTENT SECTIONS
      ═══════════════════════════════════════════════════════ */}
      <div className="max-w-[1300px] mx-auto px-4 mb-10">
        <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 md:p-8">
          <div className="space-y-6">
            {SEO_SECTIONS.map((section, i) => (
              <div key={i}>
                <h3 className="text-[15px] font-bold text-[#111827] mb-2">{section.title}</h3>
                <p className="text-[12px] text-[#475569] leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          BOOKING MODAL (Dynamic)
      ═══════════════════════════════════════════════════════ */}
      {showBookingModal && (
        <div className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-[540px] max-w-[95vw] max-h-[90vh] overflow-y-auto relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-3 right-3 text-[#9ca3af] hover:text-[#374151] p-1 cursor-pointer z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!bookingSubmitted ? (
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-[#ef4a23]/10 text-[#ef4a23] flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[16px] font-extrabold text-[#111827]">Book A Home Service</h3>
                    <p className="text-[11px] text-[#64748b]">Fill in the details below and we&apos;ll contact you shortly</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#374151] mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full border border-[#d1d5db] rounded-lg px-3 py-2.5 text-[13px] outline-none focus:border-[#3749bb] focus:ring-1 focus:ring-[#3749bb]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#374151] mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      placeholder="e.g. 01XXXXXXXXX"
                      className="w-full border border-[#d1d5db] rounded-lg px-3 py-2.5 text-[13px] outline-none focus:border-[#3749bb] focus:ring-1 focus:ring-[#3749bb]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#374151] mb-1">Device Type</label>
                    <select
                      value={bookingDevice}
                      onChange={(e) => setBookingDevice(e.target.value)}
                      className="w-full border border-[#d1d5db] rounded-lg px-3 py-2.5 text-[13px] outline-none focus:border-[#3749bb] cursor-pointer"
                    >
                      <option>Desktop PC</option>
                      <option>Laptop</option>
                      <option>Printer</option>
                      <option>Monitor</option>
                      <option>Smart TV</option>
                      <option>iMac / MacBook</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#374151] mb-1">Your Address</label>
                    <input
                      type="text"
                      value={bookingAddress}
                      onChange={(e) => setBookingAddress(e.target.value)}
                      placeholder="House, Road, Area, City"
                      className="w-full border border-[#d1d5db] rounded-lg px-3 py-2.5 text-[13px] outline-none focus:border-[#3749bb] focus:ring-1 focus:ring-[#3749bb]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#374151] mb-1">Describe Your Issue</label>
                    <textarea
                      rows={3}
                      value={bookingIssue}
                      onChange={(e) => setBookingIssue(e.target.value)}
                      placeholder="Briefly describe the problem..."
                      className="w-full border border-[#d1d5db] rounded-lg px-3 py-2.5 text-[13px] outline-none focus:border-[#3749bb] focus:ring-1 focus:ring-[#3749bb]/30 resize-none"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="flex items-center gap-3 mt-5">
                  <button
                    onClick={handleBookService}
                    className="bg-[#ef4a23] hover:bg-[#d93a15] text-white font-bold text-[13px] px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Submit Booking Request
                  </button>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="text-[13px] text-[#6b7280] hover:text-[#111827] font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* Success Screen */
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#10b981] text-white flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-extrabold text-[#111827] mb-2">Booking Request Submitted!</h3>
                <p className="text-[13px] text-[#475569] mb-1">
                  Thank you, <span className="font-bold text-[#ef4a23]">{bookingName}</span>!
                </p>
                <p className="text-[12px] text-[#64748b] mb-4">
                  Our service team will contact you at <span className="font-bold">{bookingPhone}</span> within 30 minutes to confirm your appointment.
                </p>
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4 text-left text-[12px] text-[#475569] mb-5 max-w-[320px] mx-auto">
                  <div className="flex justify-between mb-1">
                    <span>Device:</span>
                    <strong className="text-[#111827]">{bookingDevice}</strong>
                  </div>
                  {bookingAddress && (
                    <div className="flex justify-between mb-1">
                      <span>Address:</span>
                      <strong className="text-[#111827] text-right max-w-[180px] truncate">{bookingAddress}</strong>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Service Fee:</span>
                    <strong className="text-[#ef4a23]">Starting from 599৳</strong>
                  </div>
                </div>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="bg-[#3749bb] hover:bg-[#2b3992] text-white font-bold text-[13px] px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
