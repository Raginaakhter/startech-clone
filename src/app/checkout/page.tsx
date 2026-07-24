"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { featuredProducts } from "@/data/products";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, updateCartQty, removeFromCart, addToCart, clearCart } = useApp();

  // Form State
  const [formData, setFormData] = useState({
    name: "Robin Ahmed",
    phone: "01712345678",
    email: "robin.ahmed@example.com",
    city: "Dhaka",
    zone: "inside_dhaka",
    address: "House 45, Road 12, Block C, Dhanmondi",
    deliveryType: "home_delivery", // home_delivery | store_pickup
    pickupBranch: "IDB Bhaban Branch, Agargaon",
    paymentMethod: "bkash", // cod | bkash | nagad | sslcommerz | emi
    emiMonths: 6,
    comment: "",
  });

  // Coupon State
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; type: "percent" | "flat" | "freeship"; value: number } | null>(null);
  const [couponMsg, setCouponMsg] = useState<{ text: string; error?: boolean } | null>(null);

  // Direct Modal Payment States (for bKash / Nagad)
  const [showBkashModal, setShowBkashModal] = useState(false);
  const [bkashStep, setBkashStep] = useState<"phone" | "otp" | "pin" | "success">("phone");
  const [bkashPhone, setBkashPhone] = useState("");
  const [bkashOtp, setBkashOtp] = useState("");
  const [bkashPin, setBkashPin] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Nagad Modal
  const [showNagadModal, setShowNagadModal] = useState(false);

  // If cart is empty, fallback load helper
  const handleLoadSampleCart = () => {
    addToCart(featuredProducts[11], 1); // Lenovo Laptop
    addToCart(featuredProducts[16], 1); // Samsung Phone
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Pricing calculations
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const deliveryCharge = useMemo(() => {
    if (formData.deliveryType === "store_pickup") return 0;
    if (appliedCoupon?.type === "freeship") return 0;
    if (subtotal > 50000) return 0; // Free delivery over 50,000 BDT
    if (formData.zone === "inside_dhaka") return 60;
    if (formData.zone === "express") return 250;
    return 120; // outside dhaka
  }, [formData.deliveryType, formData.zone, subtotal, appliedCoupon]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === "percent") {
      return Math.round((subtotal * appliedCoupon.value) / 100);
    }
    if (appliedCoupon.type === "flat") {
      return Math.min(subtotal, appliedCoupon.value);
    }
    return 0;
  }, [subtotal, appliedCoupon]);

  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryCharge);

  const emiMonthlyAmount = Math.round(grandTotal / formData.emiMonths);

  // Handle Coupon Apply
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (code === "STARTECH10") {
      setAppliedCoupon({ code, type: "percent", value: 10 });
      setCouponMsg({ text: "Coupon STARTECH10 applied! 10% Discount." });
    } else if (code === "HAPPYHOUR") {
      setAppliedCoupon({ code, type: "flat", value: 500 });
      setCouponMsg({ text: "Coupon HAPPYHOUR applied! 500৳ Discount." });
    } else if (code === "FREESHIP") {
      setAppliedCoupon({ code, type: "freeship", value: 0 });
      setCouponMsg({ text: "Coupon FREESHIP applied! Free Delivery." });
    } else {
      setCouponMsg({ text: "Invalid Coupon Code! Try STARTECH10 or HAPPYHOUR", error: true });
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponMsg(null);
  };

  // Submit Order Handler
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your shopping cart is empty!");
      return;
    }

    if (formData.paymentMethod === "bkash") {
      setBkashPhone(formData.phone);
      setBkashStep("phone");
      setShowBkashModal(true);
    } else if (formData.paymentMethod === "nagad") {
      setShowNagadModal(true);
    } else if (formData.paymentMethod === "sslcommerz") {
      router.push(`/payment/sslcommerz?amount=${grandTotal}&name=${encodeURIComponent(formData.name)}&phone=${formData.phone}`);
    } else {
      // Cash on delivery / EMI
      const trx = "ST-ORD-" + Math.floor(100000 + Math.random() * 900000);
      clearCart();
      router.push(`/checkout/success?method=${formData.paymentMethod}&amount=${grandTotal}&trxId=${trx}`);
    }
  };

  // Complete bKash simulation
  const handleCompleteBkashPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setShowBkashModal(false);
      const trx = "BKASH-" + Math.floor(10000000 + Math.random() * 90000000);
      clearCart();
      router.push(`/checkout/success?method=bkash&amount=${grandTotal}&trxId=${trx}`);
    }, 1500);
  };

  const formatPrice = (price: number) => price.toLocaleString("en-BD") + "৳";

  return (
    <div className="bg-[#f2f4f8] min-h-screen py-6">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-[12px] text-[#666] flex items-center gap-1 mb-4">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/checkout/cart" className="hover:text-primary">Shopping Cart</Link>
          <span>/</span>
          <span className="text-[#333] font-semibold">Checkout</span>
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-[#333] mb-5">Checkout &amp; Payment</h1>

        {cart.length > 0 ? (
          <form onSubmit={handleOrderSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">
            
            {/* Left Side: Form Sections */}
            <div className="flex flex-col gap-6">
              
              {/* 1. Customer Information & Shipping */}
              <div className="bg-white rounded-lg p-5 md:p-6 shadow-sm border border-[#e2e8f0]">
                <div className="flex items-center gap-2 border-b border-[#e2e8f0] pb-3 mb-4">
                  <span className="w-6 h-6 rounded-full bg-[#ef4a23] text-white text-xs font-bold flex items-center justify-center">1</span>
                  <h3 className="text-[16px] font-bold text-[#333]">Customer &amp; Shipping Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-[12px] font-bold text-[#4a5568] block mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full h-9 border border-[#cbd5e1] rounded px-3 text-[13px] outline-none focus:border-[#3749bb]"
                    />
                  </div>

                  <div>
                    <label className="text-[12px] font-bold text-[#4a5568] block mb-1">Mobile Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full h-9 border border-[#cbd5e1] rounded px-3 text-[13px] outline-none focus:border-[#3749bb]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-[12px] font-bold text-[#4a5568] block mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full h-9 border border-[#cbd5e1] rounded px-3 text-[13px] outline-none focus:border-[#3749bb]"
                    />
                  </div>

                  <div>
                    <label className="text-[12px] font-bold text-[#4a5568] block mb-1">City / District *</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full h-9 border border-[#cbd5e1] rounded px-3 text-[13px] outline-none focus:border-[#3749bb] bg-white"
                    >
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chittagong">Chittagong</option>
                      <option value="Sylhet">Sylhet</option>
                      <option value="Rajshahi">Rajshahi</option>
                      <option value="Khulna">Khulna</option>
                      <option value="Barisal">Barisal</option>
                      <option value="Rangpur">Rangpur</option>
                      <option value="Mymensingh">Mymensingh</option>
                      <option value="Cumilla">Cumilla</option>
                    </select>
                  </div>
                </div>

                {/* Delivery Method Selector */}
                <div className="mb-4">
                  <label className="text-[12px] font-bold text-[#4a5568] block mb-1.5">Delivery Method *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className={`border rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-all ${
                      formData.deliveryType === "home_delivery" ? "border-[#3749bb] bg-[#f0f4ff]" : "border-[#e2e8f0] bg-white"
                    }`}>
                      <input
                        type="radio"
                        name="deliveryType"
                        value="home_delivery"
                        checked={formData.deliveryType === "home_delivery"}
                        onChange={handleInputChange}
                        className="accent-[#3749bb]"
                      />
                      <div>
                        <span className="text-[13px] font-bold text-[#333] block">Home Delivery</span>
                        <span className="text-[11px] text-[#666]">Delivered to your doorstep</span>
                      </div>
                    </label>

                    <label className={`border rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-all ${
                      formData.deliveryType === "store_pickup" ? "border-[#3749bb] bg-[#f0f4ff]" : "border-[#e2e8f0] bg-white"
                    }`}>
                      <input
                        type="radio"
                        name="deliveryType"
                        value="store_pickup"
                        checked={formData.deliveryType === "store_pickup"}
                        onChange={handleInputChange}
                        className="accent-[#3749bb]"
                      />
                      <div>
                        <span className="text-[13px] font-bold text-[#333] block">Store Pickup (Free)</span>
                        <span className="text-[11px] text-[#666]">Collect from Star Tech outlet</span>
                      </div>
                    </label>
                  </div>
                </div>

                {formData.deliveryType === "home_delivery" ? (
                  <>
                    <div className="mb-4">
                      <label className="text-[12px] font-bold text-[#4a5568] block mb-1">Delivery Zone *</label>
                      <select
                        name="zone"
                        value={formData.zone}
                        onChange={handleInputChange}
                        className="w-full h-9 border border-[#cbd5e1] rounded px-3 text-[13px] outline-none focus:border-[#3749bb] bg-white"
                      >
                        <option value="inside_dhaka">Inside Dhaka (60৳)</option>
                        <option value="outside_dhaka">Outside Dhaka (120৳)</option>
                        <option value="express">Express Same Day Delivery (250৳)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[12px] font-bold text-[#4a5568] block mb-1">Street Address *</label>
                      <textarea
                        name="address"
                        required
                        rows={2}
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="House no, Road no, Area, Landmark"
                        className="w-full border border-[#cbd5e1] rounded p-2.5 text-[13px] outline-none focus:border-[#3749bb] resize-none"
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="text-[12px] font-bold text-[#4a5568] block mb-1">Select Star Tech Branch *</label>
                    <select
                      name="pickupBranch"
                      value={formData.pickupBranch}
                      onChange={handleInputChange}
                      className="w-full h-9 border border-[#cbd5e1] rounded px-3 text-[13px] outline-none focus:border-[#3749bb] bg-white"
                    >
                      <option value="IDB Bhaban Branch, Agargaon">IDB Bhaban Branch, Agargaon</option>
                      <option value="Multiplan Center, Elephant Road">Multiplan Center, Elephant Road</option>
                      <option value="Uttara Branch, Sector 3">Uttara Branch, Sector 3</option>
                      <option value="Chittagong Agrabad Outlet">Chittagong Agrabad Outlet</option>
                      <option value="Sylhet Zindabazar Branch">Sylhet Zindabazar Branch</option>
                    </select>
                  </div>
                )}
              </div>

              {/* 2. Payment Method Selection */}
              <div className="bg-white rounded-lg p-5 md:p-6 shadow-sm border border-[#e2e8f0]">
                <div className="flex items-center gap-2 border-b border-[#e2e8f0] pb-3 mb-4">
                  <span className="w-6 h-6 rounded-full bg-[#ef4a23] text-white text-xs font-bold flex items-center justify-center">2</span>
                  <h3 className="text-[16px] font-bold text-[#333]">Payment Method</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {/* bKash Direct */}
                  <label className={`border rounded-lg p-3.5 flex items-center justify-between cursor-pointer transition-all ${
                    formData.paymentMethod === "bkash" ? "border-[#e11d48] bg-[#fff1f2] ring-1 ring-[#e11d48]" : "border-[#e2e8f0] hover:bg-[#fafafa]"
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bkash"
                        checked={formData.paymentMethod === "bkash"}
                        onChange={handleInputChange}
                        className="accent-[#e11d48]"
                      />
                      <div>
                        <span className="text-[13px] font-bold text-[#333] block">bKash Payment</span>
                        <span className="text-[11px] text-[#666]">Instant &amp; 100% Secure</span>
                      </div>
                    </div>
                    <span className="w-8 h-8 rounded bg-[#e11d48] text-white font-black flex items-center justify-center text-xs">
                      bK
                    </span>
                  </label>

                  {/* Nagad Direct */}
                  <label className={`border rounded-lg p-3.5 flex items-center justify-between cursor-pointer transition-all ${
                    formData.paymentMethod === "nagad" ? "border-[#ea580c] bg-[#fff7ed] ring-1 ring-[#ea580c]" : "border-[#e2e8f0] hover:bg-[#fafafa]"
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="nagad"
                        checked={formData.paymentMethod === "nagad"}
                        onChange={handleInputChange}
                        className="accent-[#ea580c]"
                      />
                      <div>
                        <span className="text-[13px] font-bold text-[#333] block">Nagad Payment</span>
                        <span className="text-[11px] text-[#666]">Mobile Banking</span>
                      </div>
                    </div>
                    <span className="w-8 h-8 rounded bg-[#ea580c] text-white font-black flex items-center justify-center text-xs">
                      N
                    </span>
                  </label>

                  {/* Cash on Delivery */}
                  <label className={`border rounded-lg p-3.5 flex items-center justify-between cursor-pointer transition-all ${
                    formData.paymentMethod === "cod" ? "border-[#3749bb] bg-[#f0f4ff] ring-1 ring-[#3749bb]" : "border-[#e2e8f0] hover:bg-[#fafafa]"
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={handleInputChange}
                        className="accent-[#3749bb]"
                      />
                      <div>
                        <span className="text-[13px] font-bold text-[#333] block">Cash on Delivery</span>
                        <span className="text-[11px] text-[#666]">Pay cash at delivery time</span>
                      </div>
                    </div>
                    <svg className="w-6 h-6 text-[#3749bb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </label>

                  {/* SSLCommerz Gateway */}
                  <label className={`border rounded-lg p-3.5 flex items-center justify-between cursor-pointer transition-all ${
                    formData.paymentMethod === "sslcommerz" ? "border-[#3749bb] bg-[#f0f4ff] ring-1 ring-[#3749bb]" : "border-[#e2e8f0] hover:bg-[#fafafa]"
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="sslcommerz"
                        checked={formData.paymentMethod === "sslcommerz"}
                        onChange={handleInputChange}
                        className="accent-[#3749bb]"
                      />
                      <div>
                        <span className="text-[13px] font-bold text-[#333] block">Credit / Debit Card</span>
                        <span className="text-[11px] text-[#666]">Visa, MasterCard, Amex</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <span className="bg-[#2563eb] text-white text-[9px] font-bold px-1 rounded">VISA</span>
                      <span className="bg-[#dc2626] text-white text-[9px] font-bold px-1 rounded">MC</span>
                    </div>
                  </label>

                  {/* EMI Installment Option */}
                  <label className={`border rounded-lg p-3.5 flex items-center justify-between cursor-pointer transition-all md:col-span-2 ${
                    formData.paymentMethod === "emi" ? "border-[#3749bb] bg-[#f0f4ff] ring-1 ring-[#3749bb]" : "border-[#e2e8f0] hover:bg-[#fafafa]"
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="emi"
                        checked={formData.paymentMethod === "emi"}
                        onChange={handleInputChange}
                        className="accent-[#3749bb]"
                      />
                      <div>
                        <span className="text-[13px] font-bold text-[#333] block">0% Interest EMI Installment</span>
                        <span className="text-[11px] text-[#666]">Pay in easy 3, 6, 9 or 12 monthly installments</span>
                      </div>
                    </div>
                    <span className="bg-[#10b981] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      0% EMI
                    </span>
                  </label>
                </div>

                {/* EMI Plan Selector if EMI chosen */}
                {formData.paymentMethod === "emi" && (
                  <div className="mt-4 p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg">
                    <label className="text-[12px] font-bold text-[#333] block mb-2">Select EMI Duration:</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[3, 6, 9, 12].map((months) => (
                        <button
                          type="button"
                          key={months}
                          onClick={() => setFormData((prev) => ({ ...prev, emiMonths: months }))}
                          className={`py-2 px-1 text-center rounded border text-[12px] font-bold transition-all ${
                            formData.emiMonths === months
                              ? "bg-[#3749bb] text-white border-[#3749bb]"
                              : "bg-white text-[#333] border-[#cbd5e1] hover:border-[#3749bb]"
                          }`}
                        >
                          {months} Months
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 text-[12px] text-[#4a5568] flex justify-between items-center border-t border-[#e2e8f0] pt-2">
                      <span>Monthly Installment:</span>
                      <strong className="text-[#ef4a23] font-bold text-[14px]">
                        {formatPrice(emiMonthlyAmount)} / Month
                      </strong>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: Order Summary & Checkout Action */}
            <div className="flex flex-col gap-5">
              <div className="bg-white rounded-lg p-5 shadow-sm border border-[#e2e8f0] sticky top-20">
                <h3 className="text-[16px] font-bold text-[#333] border-b border-[#e2e8f0] pb-3 mb-4">
                  Order Summary ({cart.length} Products)
                </h3>

                {/* Itemized Cart List */}
                <div className="flex flex-col gap-3.5 max-h-[280px] overflow-y-auto pr-1 divide-y divide-[#f1f5f9]">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 pt-3 first:pt-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-contain bg-white border border-[#e2e8f0] p-1 rounded shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[12px] font-bold text-[#333] truncate">{item.name}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center border border-[#cbd5e1] rounded bg-[#f8fafc]">
                            <button
                              type="button"
                              onClick={() => updateCartQty(item.id, -1)}
                              className="px-2 py-0.5 text-xs font-bold text-[#4a5568] hover:text-[#ef4a23]"
                            >
                              -
                            </button>
                            <span className="px-2 text-[11px] font-bold text-[#333]">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateCartQty(item.id, 1)}
                              className="px-2 py-0.5 text-xs font-bold text-[#4a5568] hover:text-[#ef4a23]"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[12px] font-bold text-[#ef4a23]">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#94a3b8] hover:text-[#ef4a23] p-1 cursor-pointer"
                        title="Remove item"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Section */}
                <div className="mt-5 pt-4 border-t border-[#e2e8f0]">
                  <span className="text-[11px] font-bold text-[#4a5568] block mb-1.5 uppercase tracking-wide">
                    Have a Promo / Coupon Code?
                  </span>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-[#f0fdf4] border border-[#86efac] p-2 rounded text-[12px]">
                      <span className="font-bold text-[#166534]">
                        Coupon Code: {appliedCoupon.code}
                      </span>
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="text-[#dc2626] font-bold hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Try STARTECH10 or HAPPYHOUR"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 h-8 border border-[#cbd5e1] rounded px-2.5 text-[12px] outline-none uppercase focus:border-[#3749bb]"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="bg-[#3749bb] hover:bg-[#2b3992] text-white text-[11px] font-bold px-3 py-1.5 rounded transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {couponMsg && (
                    <p className={`text-[11px] mt-1.5 font-semibold ${couponMsg.error ? "text-[#dc2626]" : "text-[#166534]"}`}>
                      {couponMsg.text}
                    </p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-[#e2e8f0] pt-4 mt-4 flex flex-col gap-2 text-[12px] text-[#4a5568]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#333]">{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#166534] font-bold">
                      <span>Discount</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Charge</span>
                    <span className="font-bold text-[#333]">
                      {deliveryCharge === 0 ? <span className="text-[#166534]">FREE</span> : formatPrice(deliveryCharge)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-[#e2e8f0] pt-3 text-[16px] font-bold text-[#333] mt-1">
                    <span>Total Amount</span>
                    <span className="text-[#ef4a23]">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                {/* Submit Checkout Button */}
                <button
                  type="submit"
                  className="w-full bg-[#ef4a23] hover:bg-[#d01919] text-white font-bold py-3 rounded text-[14px] transition-all mt-5 cursor-pointer shadow-md text-center block uppercase tracking-wider"
                >
                  Confirm Order ({formatPrice(grandTotal)})
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Empty Cart State with One-Click Sample Loader */
          <div className="bg-white rounded-lg shadow-sm p-10 text-center flex flex-col items-center gap-4 justify-center border border-[#e2e8f0] my-6 min-h-[360px]">
            <div className="w-16 h-16 rounded-full bg-[#ffedd5] text-[#ef4a23] flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-[#333]">Your Cart is Currently Empty</h2>
            <p className="text-xs text-[#666] max-w-[400px]">
              Add products from our homepage, Happy Hour, or PC Builder to proceed with checkout.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <button
                type="button"
                onClick={handleLoadSampleCart}
                className="bg-[#3749bb] hover:bg-[#2b3992] text-white px-5 py-2.5 rounded text-xs font-bold transition-all cursor-pointer"
              >
                Load Sample Items to Test Payment
              </button>
              <Link
                href="/"
                className="border border-[#cbd5e1] text-[#333] hover:bg-[#f8fafc] px-5 py-2.5 rounded text-xs font-bold transition-colors"
              >
                Browse Shop
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* bKash Payment Gateway Modal Simulation */}
      {showBkashModal && (
        <div className="fixed inset-0 bg-black/70 z-[150] flex items-center justify-center p-4">
          <div className="bg-[#e11d48] text-white rounded-lg w-full max-w-md overflow-hidden shadow-2xl animate-fadeIn">
            {/* bKash Modal Header */}
            <div className="bg-[#be123c] p-4 flex items-center justify-between border-b border-[#9f1239]">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded bg-white text-[#e11d48] font-black flex items-center justify-center text-sm">
                  bK
                </span>
                <div>
                  <h3 className="font-bold text-sm">bKash Payment Gateway</h3>
                  <span className="text-[10px] text-pink-200 block">Star Tech Ltd • BDT {formatPrice(grandTotal)}</span>
                </div>
              </div>
              <button
                onClick={() => setShowBkashModal(false)}
                className="text-white/80 hover:text-white text-lg font-bold"
              >
                ×
              </button>
            </div>

            {/* bKash Body Steps */}
            <div className="p-6 bg-white text-[#333]">
              {bkashStep === "phone" && (
                <div className="flex flex-col gap-4">
                  <p className="text-xs text-[#666]">Enter your bKash Mobile Wallet Account Number:</p>
                  <input
                    type="tel"
                    placeholder="e.g. 017XXXXXXXX"
                    value={bkashPhone}
                    onChange={(e) => setBkashPhone(e.target.value)}
                    className="w-full h-10 border border-[#cbd5e1] rounded px-3 text-sm font-bold text-[#333] outline-none focus:border-[#e11d48]"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setBkashStep("otp")}
                      className="w-full bg-[#e11d48] hover:bg-[#be123c] text-white font-bold py-2.5 rounded text-xs transition-colors cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {bkashStep === "otp" && (
                <div className="flex flex-col gap-4">
                  <p className="text-xs text-[#666]">
                    Enter 6-digit verification code sent to <strong className="text-[#333]">{bkashPhone}</strong>:
                  </p>
                  <input
                    type="text"
                    placeholder="Enter OTP (e.g. 123456)"
                    value={bkashOtp}
                    onChange={(e) => setBkashOtp(e.target.value)}
                    className="w-full h-10 border border-[#cbd5e1] rounded px-3 text-sm font-bold text-center tracking-widest outline-none focus:border-[#e11d48]"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setBkashStep("pin")}
                      className="w-full bg-[#e11d48] hover:bg-[#be123c] text-white font-bold py-2.5 rounded text-xs transition-colors cursor-pointer"
                    >
                      Verify OTP
                    </button>
                  </div>
                </div>
              )}

              {bkashStep === "pin" && (
                <div className="flex flex-col gap-4">
                  <p className="text-xs text-[#666]">Enter your 5-digit bKash PIN code:</p>
                  <input
                    type="password"
                    maxLength={5}
                    placeholder="•••••"
                    value={bkashPin}
                    onChange={(e) => setBkashPin(e.target.value)}
                    className="w-full h-10 border border-[#cbd5e1] rounded px-3 text-sm font-bold text-center tracking-widest outline-none focus:border-[#e11d48]"
                  />
                  <button
                    type="button"
                    disabled={isProcessingPayment}
                    onClick={handleCompleteBkashPayment}
                    className="w-full bg-[#e11d48] hover:bg-[#be123c] text-white font-bold py-2.5 rounded text-xs transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isProcessingPayment ? "Processing bKash Payment..." : `Confirm Payment of ${formatPrice(grandTotal)}`}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Nagad Payment Gateway Modal Simulation */}
      {showNagadModal && (
        <div className="fixed inset-0 bg-black/70 z-[150] flex items-center justify-center p-4">
          <div className="bg-[#ea580c] text-white rounded-lg w-full max-w-md overflow-hidden shadow-2xl animate-fadeIn">
            <div className="bg-[#c2410c] p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded bg-white text-[#ea580c] font-black flex items-center justify-center text-sm">
                  N
                </span>
                <div>
                  <h3 className="font-bold text-sm">Nagad Payment Gateway</h3>
                  <span className="text-[10px] text-orange-200 block">Amount: {formatPrice(grandTotal)}</span>
                </div>
              </div>
              <button onClick={() => setShowNagadModal(false)} className="text-white font-bold">×</button>
            </div>
            <div className="p-6 bg-white text-[#333]">
              <p className="text-xs text-[#666] mb-3">Enter Nagad Account Mobile Number:</p>
              <input
                type="tel"
                defaultValue={formData.phone}
                className="w-full h-10 border border-[#cbd5e1] rounded px-3 text-sm font-bold outline-none focus:border-[#ea580c] mb-4"
              />
              <button
                type="button"
                onClick={() => {
                  setShowNagadModal(false);
                  const trx = "NAGAD-" + Math.floor(10000000 + Math.random() * 90000000);
                  clearCart();
                  router.push(`/checkout/success?method=nagad&amount=${grandTotal}&trxId=${trx}`);
                }}
                className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold py-2.5 rounded text-xs transition-colors cursor-pointer"
              >
                Complete Nagad Payment ({formatPrice(grandTotal)})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
