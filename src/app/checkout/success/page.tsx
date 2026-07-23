"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

function SuccessInvoice() {
  const searchParams = useSearchParams();
  const amountStr = searchParams.get("amount") || "0";
  const trxId = searchParams.get("trxId") || "ST-COD-" + Math.floor(Math.random() * 90000 + 10000);
  const method = searchParams.get("method") || "online";
  const amount = Number(amountStr);

  const formatPrice = (price) => {
    return price.toLocaleString("en-BD") + "৳";
  };

  return (
    <div className="max-w-[1300px] mx-auto px-4 w-full flex items-center justify-center" style={{ minHeight: "80vh" }}>
      <div className="bg-white rounded-lg p-6 md:p-8 shadow-xs border border-gray-50 w-full max-w-[500px] my-10 text-center flex flex-col items-center">
        
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-5">
          <i className="material-icons text-3xl">check_circle</i>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-text-main">Order Placed Successfully!</h2>
        <p className="text-sm text-text-muted mt-2 max-w-[400px]">
          Thank you for your purchase. Your order has been registered and is being processed.
        </p>

        {/* Invoice details */}
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 w-full text-left flex flex-col gap-3 mt-6 text-sm text-text-main">
          <div className="flex justify-between">
            <span className="text-text-muted">Transaction ID:</span>
            <strong className="font-semibold">{trxId}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Payment Method:</span>
            <strong className="font-semibold capitalize">{method === "cod" ? "Cash on Delivery" : "SSLCommerz Online"}</strong>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-bold">
            <span className="text-text-main">Amount Paid:</span>
            <span className="text-primary">{formatPrice(amount)}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex gap-3 w-full mt-6">
          <Link href="/" className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded-sm text-sm transition-colors flex-1 text-center block">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="max-w-[1300px] mx-auto px-4 w-full flex items-center justify-center" style={{ minHeight: "80vh" }}>
        <h3 className="text-gray-400 text-sm">Processing order receipt...</h3>
      </div>
    }>
      <SuccessInvoice />
    </Suspense>
  );
}
