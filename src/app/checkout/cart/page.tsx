"use client";
import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function ShoppingCartPage() {
  const { cart, updateCartQty, removeFromCart } = useApp();

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-BD") + "৳";
  };

  const subTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-[#f2f4f8] min-h-screen pb-10">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-[1140px] mx-auto px-4 py-3 flex items-center gap-2 text-[13px] text-gray-500">
          <Link href="/" className="hover:text-primary transition-colors flex items-center">
            <i className="material-icons text-[16px]">home</i>
          </Link>
          <span>/</span>
          <span className="text-gray-800">Shopping Cart</span>
        </div>
      </div>

      <div className="max-w-[1140px] mx-auto px-4 mt-6">
        <h1 className="text-[22px] text-[#333] mb-6">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column */}
          <div className="flex-1">
            {/* Products List */}
            <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-[15px] font-bold text-[#333]">Your Products</h2>
              </div>
              
              <div className="p-4 flex flex-col">
                {cart.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">Your cart is empty.</div>
                ) : (
                  cart.map((item, index) => (
                    <div 
                      key={item.id} 
                      className={`flex flex-col md:flex-row items-center justify-between py-4 ${index !== cart.length - 1 ? 'border-b border-gray-100' : ''}`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-[80px] h-[80px] flex items-center justify-center shrink-0">
                          <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                        </div>
                        <div>
                          <Link href={item.href || `/product/${item.id}`} className="text-[14px] font-medium text-[#333] hover:text-primary transition-colors line-clamp-2 leading-snug">
                            {item.name}
                          </Link>
                          <div className="text-[12px] text-gray-500 mt-1">
                            Model: {item.name.split(" ")[1] || "N/A"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-10 mt-4 md:mt-0 w-full md:w-auto shrink-0">
                        {/* Quantity Controller */}
                        <div className="flex items-center border border-gray-200 rounded shrink-0 h-[38px] overflow-hidden">
                          <button 
                            onClick={() => updateCartQty(item.id, -1)}
                            className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors border-r border-gray-200 text-lg cursor-pointer"
                          >
                            -
                          </button>
                          <div className="w-12 h-full flex items-center justify-center text-[15px] font-medium text-[#333] bg-white">
                            {item.quantity}
                          </div>
                          <button 
                            onClick={() => updateCartQty(item.id, 1)}
                            className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors border-l border-gray-200 text-lg cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right w-[100px] shrink-0">
                          <div className="text-[16px] font-bold text-[#333]">{formatPrice(item.price * item.quantity)}</div>
                          <div className="text-[11px] text-gray-400 mt-0.5">{formatPrice(item.price)}/unit</div>
                        </div>

                        {/* Remove */}
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#ef4a23] transition-colors shrink-0 ml-2 cursor-pointer"
                        >
                          <i className="material-icons text-[20px]">close</i>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Coupons & Vouchers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {/* Coupon */}
              <div className="bg-white rounded-md shadow-sm border border-gray-100 p-5 relative">
                <div className="flex items-center gap-2 mb-2">
                  <i className="material-icons text-[#ef4a23] text-[20px]">local_activity</i>
                  <h3 className="text-[15px] font-bold text-[#333]">Have a Coupon?</h3>
                </div>
                <p className="text-[13px] text-gray-500 mb-4">Apply your coupon for an instant discount!</p>
                <div className="flex border border-gray-200 rounded overflow-hidden h-[42px]">
                  <input type="text" placeholder="PROMO / COUPON Code" className="flex-1 px-3 text-[13px] outline-none placeholder:text-gray-400" />
                  <button className="px-5 bg-[#f5f6fb] text-[#3749bb] text-[13px] font-semibold border-l border-gray-200 hover:bg-[#e6e8f4] transition-colors shrink-0 cursor-pointer">
                    Apply Coupon
                  </button>
                </div>
              </div>

              {/* OR separator for desktop */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[13px] text-gray-500 z-10">
                or,
              </div>

              {/* Voucher */}
              <div className="bg-white rounded-md shadow-sm border border-gray-100 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <i className="material-icons text-[#ef4a23] text-[20px]">card_giftcard</i>
                  <h3 className="text-[15px] font-bold text-[#333]">Have any Gift Voucher?</h3>
                </div>
                <p className="text-[13px] text-gray-500 mb-4">Apply your voucher for extra discount!</p>
                <div className="flex border border-gray-200 rounded overflow-hidden h-[42px]">
                  <input type="text" placeholder="Voucher Code" className="flex-1 px-3 text-[13px] outline-none placeholder:text-gray-400" />
                  <button className="px-5 bg-[#f5f6fb] text-[#3749bb] text-[13px] font-semibold border-l border-gray-200 hover:bg-[#e6e8f4] transition-colors shrink-0 cursor-pointer">
                    Apply Voucher
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0">
            <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden sticky top-4 relative pb-2">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-[15px] font-bold text-[#333]">Order Summary</h2>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-center mb-4 text-[14px]">
                  <span className="text-[#333]">Sub-Total:</span>
                  <span className="font-bold text-[#333]">{formatPrice(subTotal)}</span>
                </div>
                
                <div className="border-t border-gray-100 my-4"></div>
                
                <div className="flex justify-between items-center mb-8">
                  <span className="text-[15px] font-bold text-[#333]">Total:</span>
                  <span className="text-[20px] font-bold text-primary">{formatPrice(subTotal)}</span>
                </div>

                <div className="flex justify-between gap-3">
                  <Link 
                    href="/"
                    className="flex-1 py-2.5 border border-[#3749bb] text-[#3749bb] hover:bg-gray-50 text-[13px] font-bold rounded flex justify-center items-center transition-colors gap-1.5"
                  >
                    <i className="material-icons text-[16px]">add</i>
                    Add More
                  </Link>
                  <Link 
                    href="/checkout"
                    className="flex-1 py-2.5 bg-[#3749bb] hover:bg-[#2b3992] text-white text-[13px] font-bold rounded flex justify-center items-center transition-colors"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
              
              {/* Zigzag bottom border effect matching StarTech */}
              <div className="h-2 w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjQiPgo8cG9seWdvbiBwb2ludHM9IjAsMCA0LDQgOCwwIiBmaWxsPSIjZjJmNGY4Ii8+Cjwvc3ZnPg==')] rotate-180 bg-repeat-x absolute bottom-0 left-0"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
