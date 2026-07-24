"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

function SuccessInvoice() {
  const searchParams = useSearchParams();
  const amountStr = searchParams.get("amount") || "0";
  const trxId = searchParams.get("trxId") || "ST-ORD-" + Math.floor(100000 + Math.random() * 900000);
  const method = searchParams.get("method") || searchParams.get("gateway") || "cod";
  const amount = Number(amountStr);

  const getMethodName = (m: string) => {
    if (m === "cod") return "Cash on Delivery (COD)";
    if (m === "bkash") return "bKash Direct Mobile Payment";
    if (m === "nagad") return "Nagad Mobile Banking";
    if (m === "sslcommerz") return "SSLCommerz Online Gateway";
    if (m === "emi") return "0% EMI Monthly Installment";
    return "Online Payment";
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-BD") + "৳";
  };

  return (
    <div className="bg-[#f2f4f8] min-h-screen py-8 flex items-center justify-center">
      <div className="max-w-[700px] w-full mx-4">
        
        {/* Printable Order Confirmation Card */}
        <div className="bg-white rounded-lg shadow-sm border border-[#e2e8f0] overflow-hidden p-6 md:p-8">
          
          {/* Top Success Header */}
          <div className="flex flex-col items-center text-center pb-6 border-b border-[#e2e8f0]">
            <div className="w-16 h-16 rounded-full bg-[#f0fdf4] text-[#166534] flex items-center justify-center mb-3 border border-[#bbf7d0]">
              <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-xl md:text-2xl font-extrabold text-[#333]">Order Placed Successfully!</h1>
            <p className="text-xs md:text-sm text-[#666] mt-1">
              Thank you for shopping with Star Tech. Your order has been registered and is being processed.
            </p>
          </div>

          {/* Invoice Summary Box */}
          <div className="my-6 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-5">
            <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3 mb-3">
              <div>
                <span className="text-[10px] font-bold text-[#64748b] uppercase block">INVOICE NUMBER</span>
                <strong className="text-sm font-bold text-[#3749bb]">{trxId}</strong>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-[#64748b] uppercase block">DATE &amp; TIME</span>
                <span className="text-xs font-semibold text-[#333]">{new Date().toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#475569]">
              <div>
                <span className="font-bold text-[#333] block mb-1">Payment Information:</span>
                <p>Method: <strong className="text-[#333]">{getMethodName(method)}</strong></p>
                <p>Payment Status: <span className="bg-[#dcfce7] text-[#15803d] font-bold px-1.5 py-0.5 rounded text-[10px]">VERIFIED</span></p>
              </div>

              <div>
                <span className="font-bold text-[#333] block mb-1">Delivery Status:</span>
                <p>Status: <strong className="text-[#333]">Processing for Dispatch</strong></p>
                <p>Est. Delivery: <strong className="text-[#333]">Within 24-48 Hours</strong></p>
              </div>
            </div>

            {/* Total Amount Banner */}
            <div className="mt-4 pt-3 border-t border-[#e2e8f0] flex items-center justify-between">
              <span className="text-sm font-bold text-[#333]">Total Amount Paid:</span>
              <strong className="text-lg font-bold text-[#ef4a23]">{formatPrice(amount)}</strong>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => window.print()}
              className="flex-1 bg-[#3749bb] hover:bg-[#2b3992] text-white font-bold py-2.5 rounded text-xs transition-colors cursor-pointer text-center"
            >
              Print Invoice Receipt
            </button>
            <Link
              href="/"
              className="flex-1 bg-[#ef4a23] hover:bg-[#d01919] text-white font-bold py-2.5 rounded text-xs transition-colors text-center block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f2f4f8] flex items-center justify-center">
          <h3 className="text-gray-500 text-sm">Generating order receipt...</h3>
        </div>
      }
    >
      <SuccessInvoice />
    </Suspense>
  );
}
