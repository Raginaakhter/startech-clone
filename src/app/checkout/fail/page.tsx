"use client";
import Link from "next/link";

export default function OrderFailPage() {
  return (
    <div className="max-w-[1300px] mx-auto px-4 w-full flex items-center justify-center" style={{ minHeight: "80vh" }}>
      <div className="bg-white rounded-lg p-6 md:p-8 shadow-xs border border-gray-50 w-full max-w-[500px] my-10 text-center flex flex-col items-center">
        
        {/* Fail Icon */}
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-5">
          <i className="material-icons text-3xl">cancel</i>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-text-main">Payment Failed!</h2>
        <p className="text-sm text-text-muted mt-2 max-w-[400px]">
          Something went wrong while processing your payment via SSLCommerz. No money has been deducted from your account.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 w-full mt-6">
          <Link href="/checkout" className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded-sm text-sm transition-colors flex-1 text-center block">
            Try Again
          </Link>
          <Link href="/" className="bg-dark-1 hover:bg-neutral-800 text-white font-bold py-2.5 rounded-sm text-sm transition-colors flex-1 text-center block">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
