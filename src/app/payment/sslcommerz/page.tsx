"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";

function SSLCommerzPaymentScreen() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const amountStr = searchParams.get("amount") || "0";
  const name = searchParams.get("name") || "Valued Customer";
  const phone = searchParams.get("phone") || "017XXXXXXXX";
  const amount = Number(amountStr);

  const [activeTab, setActiveTab] = useState("cards");

  const handlePayment = (status) => {
    if (status === "success") {
      router.push(`/checkout/success?gateway=sslcommerz&amount=${amount}&trxId=SSL-TRX-${Math.floor(Math.random() * 900000 + 100000)}`);
    } else if (status === "fail") {
      router.push(`/checkout/fail?gateway=sslcommerz`);
    } else {
      router.push(`/checkout`);
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString("en-BD") + "৳";
  };

  return (
    <div className="min-h-screen bg-[#f4f7f9] py-8 flex items-center justify-center font-sans">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-3xl w-full mx-4 border border-gray-200">
        
        {/* Sandbox Warning Banner */}
        <div className="bg-red-600 text-white text-xs font-bold text-center py-2 uppercase tracking-widest animate-pulse">
          SSLCommerz Sandbox Mode - Test Transaction Only
        </div>

        {/* Header Block */}
        <div className="bg-neutral-900 p-5 text-white flex items-center justify-between border-b border-gray-800">
          <div>
            <h1 className="text-lg font-bold">SSLCommerz Payment Gateway</h1>
            <p className="text-xs text-gray-400">Secure Online Payment Processing</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-gray-450 uppercase block">Amount to Pay</span>
            <strong className="text-xl text-[#00c853] font-bold">{formatPrice(amount)}</strong>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] divide-y md:divide-y-0 md:divide-x divide-gray-100 min-h-[400px]">
          
          {/* Left Sidebar: Merchant/Billing Details */}
          <div className="p-5 bg-gray-50 flex flex-col justify-between gap-5">
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Merchant Info</h3>
              <div className="text-xs text-text-main flex flex-col gap-1.5">
                <div><strong>Name:</strong> Star Tech Ltd</div>
                <div><strong>Website:</strong> startech.com.bd</div>
              </div>

              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-6">Billing Info</h3>
              <div className="text-xs text-text-main flex flex-col gap-1.5">
                <div className="truncate"><strong>Name:</strong> {name}</div>
                <div><strong>Phone:</strong> {phone}</div>
              </div>
            </div>

            <button 
              onClick={() => handlePayment("cancel")}
              className="w-full bg-gray-200 hover:bg-gray-300 text-text-main text-xs font-semibold py-2 rounded-sm transition-colors cursor-pointer"
            >
              Cancel Payment
            </button>
          </div>

          {/* Right Panel: Tabs and Payment options */}
          <div className="p-6 flex flex-col justify-between gap-6">
            <div>
              {/* Payment Tabs */}
              <div className="flex border-b border-gray-200 gap-1.5 pb-2">
                <button
                  onClick={() => setActiveTab("cards")}
                  className={`px-4 py-2 text-xs font-semibold rounded-t-md transition-colors ${
                    activeTab === "cards" ? "bg-primary text-white" : "text-text-light hover:bg-gray-50"
                  }`}
                >
                  Cards (Visa/Master)
                </button>
                <button
                  onClick={() => setActiveTab("mobile")}
                  className={`px-4 py-2 text-xs font-semibold rounded-t-md transition-colors ${
                    activeTab === "mobile" ? "bg-primary text-white" : "text-text-light hover:bg-gray-50"
                  }`}
                >
                  Mobile Banking
                </button>
                <button
                  onClick={() => setActiveTab("net")}
                  className={`px-4 py-2 text-xs font-semibold rounded-t-md transition-colors ${
                    activeTab === "net" ? "bg-primary text-white" : "text-text-light hover:bg-gray-50"
                  }`}
                >
                  Net Banking
                </button>
              </div>

              {/* Tab Content Panels */}
              <div className="mt-6">
                {activeTab === "cards" && (
                  <div className="flex flex-col gap-4">
                    <p className="text-xs text-text-muted">Select your card type to simulate payment:</p>
                    <div className="grid grid-cols-3 gap-3">
                      <button onClick={() => handlePayment("success")} className="border border-gray-200 p-3 rounded-md hover:border-primary hover:bg-orange-50/20 text-xs font-bold text-center flex flex-col items-center gap-1.5 transition-all">
                        <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">V</span>
                        Visa Card
                      </button>
                      <button onClick={() => handlePayment("success")} className="border border-gray-200 p-3 rounded-md hover:border-primary hover:bg-orange-50/20 text-xs font-bold text-center flex flex-col items-center gap-1.5 transition-all">
                        <span className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold">M</span>
                        MasterCard
                      </button>
                      <button onClick={() => handlePayment("success")} className="border border-gray-200 p-3 rounded-md hover:border-primary hover:bg-orange-50/20 text-xs font-bold text-center flex flex-col items-center gap-1.5 transition-all">
                        <span className="w-8 h-8 rounded-full bg-amber-550 text-white flex items-center justify-center font-bold">A</span>
                        Amex Card
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "mobile" && (
                  <div className="flex flex-col gap-4">
                    <p className="text-xs text-text-muted">Select mobile wallet to simulate payment:</p>
                    <div className="grid grid-cols-3 gap-3">
                      <button onClick={() => handlePayment("success")} className="border border-gray-200 p-3 rounded-md hover:border-primary hover:bg-orange-50/20 text-xs font-bold text-center flex flex-col items-center gap-1.5 transition-all">
                        <span className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold">b</span>
                        bKash
                      </button>
                      <button onClick={() => handlePayment("success")} className="border border-gray-200 p-3 rounded-md hover:border-primary hover:bg-orange-50/20 text-xs font-bold text-center flex flex-col items-center gap-1.5 transition-all">
                        <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">N</span>
                        Nagad
                      </button>
                      <button onClick={() => handlePayment("success")} className="border border-gray-200 p-3 rounded-md hover:border-primary hover:bg-orange-50/20 text-xs font-bold text-center flex flex-col items-center gap-1.5 transition-all">
                        <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">R</span>
                        Rocket
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "net" && (
                  <div className="flex flex-col gap-4">
                    <p className="text-xs text-text-muted">Select net banking account to simulate payment:</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => handlePayment("success")} className="border border-gray-200 p-3 rounded-md hover:border-primary hover:bg-orange-50/20 text-xs font-bold text-center flex flex-col items-center gap-1.5 transition-all">
                        Nexus Bank
                      </button>
                      <button onClick={() => handlePayment("success")} className="border border-gray-200 p-3 rounded-md hover:border-primary hover:bg-orange-50/20 text-xs font-bold text-center flex flex-col items-center gap-1.5 transition-all">
                        City Touch
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sandbox Simulation Actions Panel */}
            <div className="border-t border-gray-150 pt-5 flex flex-col gap-3">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold text-center block">Sandbox Controls</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => handlePayment("success")}
                  className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold py-2.5 px-4 rounded-sm flex-1 cursor-pointer transition-colors"
                >
                  Simulate Success
                </button>
                <button 
                  onClick={() => handlePayment("fail")}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2.5 px-4 rounded-sm flex-1 cursor-pointer transition-colors"
                >
                  Simulate Failure
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default function SSLCommerzSandboxPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f4f7f9] flex items-center justify-center">
        <h3 className="text-gray-400 text-sm">Initializing SSLCommerz Gateway...</h3>
      </div>
    }>
      <SSLCommerzPaymentScreen />
    </Suspense>
  );
}
