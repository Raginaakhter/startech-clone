"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

interface Outlet {
  id: string;
  name: string;
  city: string;
  address: string;
  phones: { label: string; number: string }[];
  timing: string;
  offDay: string;
  mapQuery: string;
}

const OUTLETS_DATA: Outlet[] = [
  {
    id: "sylhet",
    name: "Sylhet Branch",
    city: "Sylhet",
    address: "Showdagar Tower, 1st Floor, Azadi 54/A, Mirboxtula, Sylhet.",
    phones: [
      { label: "Desktop", number: "01335138163" },
      { label: "Laptop", number: "01335138161" },
      { label: "Accessories & TV", number: "01335138162" },
      { label: "Corporate Deal", number: "01335138160" },
    ],
    timing: "11 AM - 9 PM",
    offDay: "Friday Off",
    mapQuery: "Star Tech Sylhet Branch",
  },
  {
    id: "narayanganj",
    name: "Narayanganj Branch",
    city: "Narayanganj",
    address: "155 Aman Bhaban, Level-3, BB Road, Kalir Bazar, Shornopottir Moar, Chasara, Narayanganj.",
    phones: [
      { label: "Desktop-1", number: "01335138048" },
      { label: "Desktop-2", number: "01335138047" },
      { label: "Laptop", number: "01313717067" },
      { label: "Accessories", number: "01335138046" },
    ],
    timing: "11 AM - 9 PM",
    offDay: "Friday Off",
    mapQuery: "Star Tech Narayanganj Branch",
  },
  {
    id: "savar",
    name: "Savar Branch",
    city: "Savar",
    address: "Shop-170-171, Level-3, Savar New Market, Savar - 1340, Dhaka.",
    phones: [
      { label: "Desktop", number: "01335138024" },
      { label: "Laptop", number: "01335138023" },
      { label: "Accessories", number: "01335138022" },
      { label: "Corporate Deal", number: "01335138021" },
    ],
    timing: "11 AM - 9 PM",
    offDay: "Wednesday Off",
    mapQuery: "Star Tech Savar Branch",
  },
  {
    id: "elephant_road",
    name: "Elephant Road Branch",
    city: "Dhaka",
    address: "Level-3, Manta Plaza, 54 New Elephant Road, Dhaka.",
    phones: [
      { label: "Laptop", number: "01332522022" },
      { label: "Desktop", number: "01313717199" },
      { label: "Accessories & TV", number: "01713651652" },
      { label: "Corporate Deal", number: "01332522183" },
    ],
    timing: "11 AM - 9 PM",
    offDay: "Open Everyday",
    mapQuery: "Star Tech Elephant Road Branch",
  },
  {
    id: "multiplan_l9_rig",
    name: "RIG House (Multiplan, Level-9)",
    city: "Dhaka",
    address: "Shop-942-944, Level-09, Multiplan Center, New Elephant Road, Dhaka.",
    phones: [
      { label: "Laptop", number: "01313717163" },
      { label: "Desktop", number: "01332522026" },
      { label: "Desktop 2", number: "01313717024" },
      { label: "Corporate Deal", number: "01313717021" },
    ],
    timing: "11 AM - 9 PM",
    offDay: "Tuesday Off",
    mapQuery: "Star Tech RIG House Multiplan",
  },
  {
    id: "multiplan_l9_2",
    name: "Multiplan Branch - (Level-09/2)",
    city: "Dhaka",
    address: "Shop-934-935 & 975-976, Level-09, Multiplan Center, New Elephant Road, Dhaka.",
    phones: [
      { label: "Desktop", number: "01313717031" },
      { label: "Desktop 2", number: "01713651663" },
      { label: "Gadget & TV", number: "01322811341" },
      { label: "Corporate Deal", number: "01709995406" },
    ],
    timing: "11 AM - 9 PM",
    offDay: "Tuesday Off",
    mapQuery: "Star Tech Multiplan Level 9",
  },
  {
    id: "multiplan_l9",
    name: "Multiplan Branch - (Level-09)",
    city: "Dhaka",
    address: "Shop-934-935, Level-09, Multiplan Center, New Elephant Road, Dhaka.",
    phones: [
      { label: "Laptop1", number: "01313717031" },
      { label: "Desktop", number: "01713651663" },
      { label: "Accessories & TV", number: "01322811341" },
      { label: "Corporate Deal", number: "01709995406" },
    ],
    timing: "11 AM - 9 PM",
    offDay: "Tuesday Off",
    mapQuery: "Star Tech Multiplan Branch Level 9",
  },
  {
    id: "mymensingh",
    name: "Mymensingh Branch",
    city: "Mymensingh",
    address: "99/A, Paravaz Tower Sharda Ghosh Road (Opposite of Women's Degree College), Mymensingh.",
    phones: [
      { label: "Desktop", number: "01332522118" },
      { label: "Laptop", number: "01713651582" },
      { label: "Accessories & TV", number: "01332522117" },
      { label: "Corporate Deal", number: "01332522116" },
    ],
    timing: "11 AM - 9 PM",
    offDay: "Friday Off",
    mapQuery: "Star Tech Mymensingh Branch",
  },
  {
    id: "banani",
    name: "Banani Branch",
    city: "Dhaka",
    address: "156 Concord Colosseum, 1st Floor, Road# 12, Kemal Ataturk Ave, Dhaka.",
    phones: [
      { label: "Desktop & Monitor", number: "01709995416" },
      { label: "Laptop", number: "01322811334" },
      { label: "Accessories & TV", number: "01313717071" },
      { label: "Corporate Deal", number: "01313717049" },
    ],
    timing: "11 AM - 9 PM",
    offDay: "Open Everyday",
    mapQuery: "Star Tech Banani Branch",
  },
  {
    id: "uttara_sonargaon",
    name: "Uttara Sonargaon Janapath Branch",
    city: "Dhaka",
    address: "Uttaron, House: 16, Sector: 09, Sonargaon Janapath, Uttara, Dhaka.",
    phones: [
      { label: "Laptop", number: "01709995441" },
      { label: "Desktop", number: "01709995400" },
      { label: "Accessories & TV", number: "01322811362" },
      { label: "Corporate Deal", number: "01709995420" },
    ],
    timing: "11 AM - 9 PM",
    offDay: "Open Everyday",
    mapQuery: "Star Tech Uttara Sonargaon Janapath",
  },
  {
    id: "uttara_syed",
    name: "Uttara Syed Grand Center Branch",
    city: "Dhaka",
    address: "Syed Grand Center, 119, 3rd Floor, Road No: 28, Sector: 7, Uttara, Dhaka.",
    phones: [
      { label: "Desktop", number: "01709995443" },
      { label: "Laptop", number: "01313717069" },
      { label: "Accessories & TV", number: "01332522191" },
      { label: "Corporate Deal", number: "01709995577" },
    ],
    timing: "11 AM - 9 PM",
    offDay: "Wednesday Off",
    mapQuery: "Star Tech Uttara Syed Grand Center",
  },
  {
    id: "idb",
    name: "IDB Branch",
    city: "Dhaka",
    address: "Shop-228, 229, 2nd Floor, IDB Bhaban, Agargaon, Dhaka.",
    phones: [
      { label: "Desktop", number: "01313717121" },
      { label: "Laptop", number: "01313717070" },
      { label: "Accessories & TV", number: "01313716992" },
      { label: "Corporate Deal", number: "01332522013" },
    ],
    timing: "11 AM - 9 PM",
    offDay: "Sunday Off",
    mapQuery: "Star Tech IDB Bhaban Branch",
  },
  {
    id: "pragati_sharani",
    name: "Pragati Sharani Branch",
    city: "Dhaka",
    address: "B11 Premier Plaza (Level # 2), CHA-90/A Pragati Sharani, North Badda, Dhaka.",
    phones: [
      { label: "Desktop", number: "01313717122" },
      { label: "Laptop", number: "01322811413" },
      { label: "Accessories & TV", number: "01332522024" },
      { label: "Corporate Deal", number: "01709995405" },
    ],
    timing: "11 AM - 9 PM",
    offDay: "Wednesday Off",
    mapQuery: "Star Tech Pragati Sharani Branch",
  },
  {
    id: "multiplan_l1",
    name: "Multiplan Branch - (Level-01)",
    city: "Dhaka",
    address: "Shop-148-155, Level-01, Multiplan Center, New Elephant Road, Dhaka.",
    phones: [
      { label: "Desktop", number: "01313717031" },
      { label: "Laptop", number: "01713651663" },
      { label: "Accessories & TV", number: "01322811341" },
      { label: "Corporate Deal", number: "01709995406" },
    ],
    timing: "11 AM - 9 PM",
    offDay: "Tuesday Off",
    mapQuery: "Star Tech Multiplan Level 1",
  },
  {
    id: "multiplan_l3",
    name: "Multiplan Branch - (Level-03)",
    city: "Dhaka",
    address: "Shop-325-326, Level-03, Multiplan Center, New Elephant Road, Dhaka.",
    phones: [
      { label: "Desktop", number: "01332522196" },
      { label: "Laptop", number: "01709995543" },
      { label: "Accessories & TV", number: "01313717122" },
      { label: "Corporate Deal", number: "01322811413" },
    ],
    timing: "11 AM - 9 PM",
    offDay: "Tuesday Off",
    mapQuery: "Star Tech Multiplan Level 3",
  },
  {
    id: "multiplan_l5",
    name: "Multiplan Branch - (Level-05)",
    city: "Dhaka",
    address: "Shop-504-505, Level-05, Multiplan Center, New Elephant Road, Dhaka.",
    phones: [
      { label: "Laptop", number: "01313717090" },
      { label: "Desktop", number: "01322811344" },
      { label: "Desktop 2", number: "01709995430" },
      { label: "Corporate Deal", number: "01709995573" },
    ],
    timing: "11 AM - 9 PM",
    offDay: "Tuesday Off",
    mapQuery: "Star Tech Multiplan Level 5",
  },
  {
    id: "gazipur",
    name: "Gazipur Branch",
    city: "Gazipur",
    address: "Nazma Shahidullah Complex, 1st Floor, Joydebpur Road, Gazipur Chowrashta, Gazipur.",
    phones: [
      { label: "Desktop", number: "01709995414" },
      { label: "Laptop", number: "01313717103" },
      { label: "Corporate Deal", number: "01332522180" },
      { label: "Accessories & TV", number: "01313717104" },
    ],
    timing: "11 AM - 9 PM",
    offDay: "Saturday Off",
    mapQuery: "Star Tech Gazipur Branch",
  },
  {
    id: "rajshahi",
    name: "Rajshahi Branch",
    city: "Rajshahi",
    address: "Moon Rabeya Tower (1st floor), South Dorikharbona, Boalia, Rajshahi.",
    phones: [
      { label: "Desktop", number: "01322811320" },
      { label: "Laptop", number: "01322811319" },
      { label: "Accessories & TV", number: "01322811332" },
      { label: "Corporate Deal", number: "01322811320" },
    ],
    timing: "11 AM - 9 PM",
    offDay: "Friday Off",
    mapQuery: "Star Tech Rajshahi Branch",
  },
  {
    id: "chattogram_agrabad",
    name: "Chattogram Agrabad Branch",
    city: "Chattogram",
    address: "Shop#35, Bir Zohura Tower, Chittagong Computer Market (Ground floor), SK Mojib Road, Agrabad, Chowmuhani.",
    phones: [
      { label: "Desktop", number: "01322811309" },
      { label: "Laptop", number: "01709995423" },
      { label: "Accessories & TV", number: "01313717097" },
      { label: "Corporate Deal", number: "01313717098" },
    ],
    timing: "11 AM - 9 PM",
    offDay: "Friday Off",
    mapQuery: "Star Tech Agrabad Chittagong Branch",
  },
  {
    id: "chattogram_gec",
    name: "Chattogram GEC Branch",
    city: "Chattogram",
    address: "HNS Tower (Beside National Bank), 2628/1 CDA Avenue, GEC Circle, Nasirabad, Chattogram, Bangladesh.",
    phones: [
      { label: "Desktop", number: "01713651638" },
      { label: "Laptop", number: "01313717106" },
      { label: "Accessories & TV", number: "01322811368" },
      { label: "Corporate Deal", number: "01313717179" },
    ],
    timing: "11 AM - 9 PM",
    offDay: "Open Everyday",
    mapQuery: "Star Tech GEC Chittagong Branch",
  },
  {
    id: "rangpur",
    name: "Rangpur Branch",
    city: "Rangpur",
    address: "Chadima Hotel Building (1st Floor), Opposite of Puasti Mastir Dokan, Near Payra Chottor, Rangpur.",
    phones: [
      { label: "Desktop", number: "01709995494" },
      { label: "Laptop", number: "01709995493" },
      { label: "Accessories & TV", number: "01322811310" },
      { label: "Corporate Deal", number: "01709995490" },
    ],
    timing: "11 AM - 9 PM",
    offDay: "Friday Off",
    mapQuery: "Star Tech Rangpur Branch",
  },
  {
    id: "khulna",
    name: "Khulna Branch",
    city: "Khulna",
    address: "Khan Plaza, 3rd floor, 76 KDA Avenue, Shib Bari More, Khulna.",
    phones: [
      { label: "Desktop", number: "01709995586" },
      { label: "Laptop", number: "01709995587" },
      { label: "Accessories & TV", number: "01313717100" },
      { label: "Corporate Deal", number: "01709995585" },
    ],
    timing: "11 AM - 9 PM",
    offDay: "Friday Off",
    mapQuery: "Star Tech Khulna Branch",
  },
];

export default function ContactOutletsPage() {
  const [citySearch, setCitySearch] = useState("");

  const filteredOutlets = useMemo(() => {
    if (!citySearch.trim()) return OUTLETS_DATA;
    const q = citySearch.toLowerCase();
    return OUTLETS_DATA.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        o.city.toLowerCase().includes(q) ||
        o.address.toLowerCase().includes(q)
    );
  }, [citySearch]);

  return (
    <div className="bg-[#f2f4f8] min-h-screen py-5 font-sans">
      <div className="max-w-[1300px] mx-auto px-4">
        
        {/* Top Header Row: 2-Column Grid matching Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-4 mb-5">
          
          {/* Left Column: Stacked Contact & Corporate Cards */}
          <div className="flex flex-col gap-3.5">
            {/* Card 1: Contact Us */}
            <div className="bg-white rounded-lg p-4 border border-[#e5e7eb] shadow-xs flex items-center gap-3.5">
              <div className="w-10 h-10 rounded bg-[#eff6ff] text-[#3749bb] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <span className="text-[11px] text-[#6b7280] block">Contact Us</span>
                <strong className="text-[13px] font-bold text-[#111827] block">16793 / 09678002003</strong>
              </div>
            </div>

            {/* Card 2: Corporate & Complain */}
            <div className="bg-white rounded-lg p-4 border border-[#e5e7eb] shadow-xs flex items-center gap-3.5">
              <div className="w-10 h-10 rounded bg-[#eff6ff] text-[#3749bb] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-[#6b7280] block truncate">For Corporate Deals &amp; Complain</span>
                <strong className="text-[12px] font-bold text-[#111827] block truncate">webteam@startechbd.com</strong>
              </div>
            </div>
          </div>

          {/* Right Column: 2 Horizontal Cards side-by-side with Character Illustrations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Card 3: Raise a Complaint */}
            <div className="bg-white rounded-lg p-4 border border-[#e5e7eb] shadow-xs flex items-center gap-4">
              {/* Illustration Avatar */}
              <div className="w-14 h-14 rounded-full bg-[#fef2f2] flex items-center justify-center shrink-0 overflow-hidden p-1 border border-[#fecaca]">
                <svg className="w-9 h-9 text-[#ef4a23]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </div>
              <div>
                <span className="text-[11px] text-[#6b7280] block">Share Your Experience</span>
                <h4 className="text-[13px] font-bold text-[#111827] mb-1">Any Complain On Us?</h4>
                <Link href="/complain" className="text-[11px] font-bold text-[#3749bb] hover:underline inline-flex items-center gap-1">
                  <span>Raise a Complaint</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Card 4: Request Support */}
            <div className="bg-white rounded-lg p-4 border border-[#e5e7eb] shadow-xs flex items-center gap-4">
              {/* Illustration Avatar */}
              <div className="w-14 h-14 rounded-full bg-[#eff6ff] flex items-center justify-center shrink-0 overflow-hidden p-1 border border-[#bfdbfe]">
                <svg className="w-9 h-9 text-[#3749bb]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
              </div>
              <div>
                <span className="text-[11px] text-[#6b7280] block">Talk to experts</span>
                <h4 className="text-[13px] font-bold text-[#111827] mb-1">Get Online Support</h4>
                <a href="tel:16793" className="text-[11px] font-bold text-[#3749bb] hover:underline inline-flex items-center gap-1">
                  <span>Request Support</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Section Header & City Search Bar */}
        <div className="bg-white rounded-lg px-6 py-3.5 mb-5 border border-[#e5e7eb] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <h2 className="text-[18px] font-bold text-[#111827]">Our Sales Outlet</h2>

          <div className="relative w-full sm:w-[340px]">
            <input
              type="text"
              placeholder="What's Your City?"
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              className="w-full h-9 pl-3.5 pr-9 border border-[#d1d5db] rounded text-[13px] outline-none focus:border-[#3749bb] bg-[#ffffff] text-[#111827]"
            />
            <svg className="w-4 h-4 text-[#9ca3af] absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* 3-Column Sales Outlet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {filteredOutlets.length > 0 ? (
            filteredOutlets.map((outlet) => (
              <div
                key={outlet.id}
                className="bg-white rounded-lg p-5 border border-[#e5e7eb] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Outlet Title */}
                  <h3 className="text-[15px] font-bold text-[#111827] mb-3">
                    {outlet.name}
                  </h3>

                  {/* Address */}
                  <div className="flex items-start gap-2 mb-3.5">
                    <svg className="w-4 h-4 text-[#111827] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                    </svg>
                    <div>
                      <span className="text-[11px] font-bold text-[#111827] block">Address</span>
                      <p className="text-[12px] text-[#4b5563] leading-snug mt-0.5">{outlet.address}</p>
                    </div>
                  </div>

                  {/* Phone Numbers Grid */}
                  <div className="flex items-start gap-2 mb-4">
                    <svg className="w-4 h-4 text-[#111827] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <div className="w-full">
                      <span className="text-[11px] font-bold text-[#111827] block mb-1">Phone</span>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
                        {outlet.phones.map((p, idx) => (
                          <div key={idx}>
                            <span className="text-[#6b7280] block text-[10px]">{p.label}</span>
                            <a href={`tel:${p.number}`} className="font-bold text-[#111827] hover:text-[#ef4a23]">
                              {p.number}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Hours & Get Direction Button */}
                <div className="pt-3 border-t border-[#f3f4f6] flex items-center justify-between gap-2 mt-2">
                  <div>
                    <span className="text-[11px] font-bold text-[#ef4a23] block leading-tight">
                      {outlet.timing}
                    </span>
                    <span className="text-[10px] text-[#6b7280] block mt-0.5">{outlet.offDay}</span>
                  </div>

                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(outlet.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#ef4a23] text-[#ef4a23] hover:bg-[#ef4a23] hover:text-white text-[11px] font-bold px-3 py-1.5 rounded transition-all flex items-center gap-1 shrink-0"
                  >
                    <span>Get Direction</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white rounded-lg p-10 text-center text-gray-500 text-sm border border-[#e5e7eb]">
              No sales outlet found for &quot;{citySearch}&quot;. Try searching for Dhaka, Chittagong, Sylhet, Gazipur, Rajshahi, etc.
            </div>
          )}
        </div>

        {/* Bottom Contact Article / FAQ Section */}
        <div className="bg-white rounded-lg p-6 md:p-8 border border-[#e5e7eb] shadow-xs">
          <h2 className="text-[16px] font-bold text-[#111827] mb-3">Contact with Star Tech Ltd.</h2>
          <p className="text-[12px] text-[#374151] leading-relaxed mb-4">
            You can always contact Star Tech Ltd. to buy your preferred model of the latest <Link href="/laptop-notebook" className="text-[#ef4a23] font-bold underline">laptop</Link>, desktop, PC component, <Link href="/desktops/gaming-pc" className="text-[#ef4a23] font-bold underline">Gaming PC</Link>, Gaming Accessories, <Link href="/gadget" className="text-[#ef4a23] font-bold underline">Gadgets</Link>, Cameras or <Link href="/television-startech" className="text-[#ef4a23] font-bold underline">TV</Link> at the best price in Bangladesh. <Link href="/" className="text-[#ef4a23] font-bold underline">Star Tech</Link> has multiple branches in major cities like Dhaka, Chittagong, Rangpur, Gazipur, and Khulna. Our Branches are well-decorated with all the latest Tech products from the best Brands in Bangladesh. We are also planning on opening more branches in the future to serve more customers. You can visit any nearest <Link href="/" className="text-[#ef4a23] font-bold underline">Star Tech Ltd.</Link> branch with your query, after-sale service, or any type of technical assistance. Our team of highly trained technicians and Qualified customer representatives will assist your issue with the utmost importance.
          </p>

          <h3 className="text-[13px] font-bold text-[#3749bb] mb-1">How to Contact Star Tech Ltd. to get a faster response?</h3>
          <p className="text-[12px] text-[#374151] leading-relaxed mb-4">
            In case you have any inquiry and you want to get a faster response, You can contact our Hotline number from 9 AM to 9 PM. Our Hotline numbers are <a href="tel:16793" className="text-[#ef4a23] font-bold underline">16793</a> and <a href="tel:09678002003" className="text-[#ef4a23] font-bold underline">09678002003</a>. You can also reach us through our Email address <a href="mailto:webteam@startechbd.com" className="text-[#ef4a23] font-bold underline">webteam@startechbd.com</a>.
          </p>

          <h3 className="text-[13px] font-bold text-[#3749bb] mb-1">How to contact Star Tech for any Complain Issue?</h3>
          <p className="text-[12px] text-[#374151] leading-relaxed">
            If you have any complaints you can reach us via our Hotline number, our hotline numbers are <a href="tel:16793" className="text-[#ef4a23] font-bold underline">16793</a> and <a href="tel:09678002003" className="text-[#ef4a23] font-bold underline">09678002003</a>. You can also send us an Email with your Issue at <a href="mailto:webteam@startechbd.com" className="text-[#ef4a23] font-bold underline">webteam@startechbd.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
