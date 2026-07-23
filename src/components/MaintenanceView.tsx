"use client";
import Link from "next/link";

export default function MaintenanceView() {
  return (
    <div className="max-w-[1300px] mx-auto px-4 w-full">
      <div className="flex flex-col items-center justify-center text-center min-h-[450px] bg-white rounded-lg shadow-xs p-10 mt-5 border border-gray-50">
        <div className="w-20 h-20 bg-[#fff5f2] text-primary rounded-full flex items-center justify-center mb-6">
          <i className="material-icons text-4xl">engineering</i>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-text-main mb-3">Page is under maintenance or creating</h1>
        <p className="text-sm text-text-muted max-w-[500px] mb-6 leading-relaxed">
          We are currently working hard to bring this page to life or performing scheduled upgrades.
          Please check back again soon!
        </p>
        <Link href="/" className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-sm text-sm font-medium transition-colors cursor-pointer">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
