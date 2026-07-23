"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { featuredProducts } from "@/data/products";

export default function CheckoutPage() {
  const router = useRouter();

  // Pre-populate with 2 default products for easy testing
  const [cartItems, setCartItems] = useState([
    { ...featuredProducts[11], quantity: 1 }, // Lenovo Laptop
    { ...featuredProducts[16], quantity: 1 }, // Samsung Mobile
  ]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Dhaka",
    address: "",
    paymentMethod: "sslcommerz", // default to SSLCommerz to showcase sandbox
  });

  const handleQtyChange = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 50000 ? 0 : 120; // free delivery above 50,000 BDT
  const total = subtotal + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      return alert("Your cart is empty!");
    }

    if (formData.paymentMethod === "sslcommerz") {
      // Redirect to SSLCommerz sandbox simulation
      router.push(`/payment/sslcommerz?amount=${total}&name=${encodeURIComponent(formData.name)}&phone=${formData.phone}`);
    } else {
      // Redirect to cash on delivery success
      router.push(`/checkout/success?method=cod&amount=${total}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatPrice = (price) => {
    return price.toLocaleString("en-BD") + "৳";
  };

  return (
    <div className="max-w-[1300px] mx-auto px-4 w-full" style={{ minHeight: "80vh" }}>
      <div className="py-6">
        <h1 className="text-xl md:text-2xl font-bold text-text-main">Checkout</h1>
        <p className="text-xs text-text-muted mt-1">Complete your shipping information and choose payment method.</p>
      </div>

      {cartItems.length > 0 ? (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 mb-12">
          {/* Shipping Form */}
          <div className="bg-white rounded-lg p-5 md:p-6 shadow-xs border border-gray-50 flex flex-col gap-5">
            <h3 className="text-base font-bold text-text-main border-b border-gray-100 pb-2.5">1. Shipping Address</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[13px] font-medium text-text-main block mb-1.5">Recipient Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Robin Ahmed"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-10 border border-gray-200 rounded-sm px-3 outline-none text-sm focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="text-[13px] font-medium text-text-main block mb-1.5">Mobile Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. 017XXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full h-10 border border-gray-200 rounded-sm px-3 outline-none text-sm focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[13px] font-medium text-text-main block mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. robin@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-10 border border-gray-200 rounded-sm px-3 outline-none text-sm focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="text-[13px] font-medium text-text-main block mb-1.5">City</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full h-10 border border-gray-200 rounded-sm px-3 outline-none text-sm focus:border-primary bg-white cursor-pointer"
                >
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Barisal">Barisal</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[13px] font-medium text-text-main block mb-1.5">Delivery Address</label>
              <textarea
                name="address"
                required
                placeholder="House No, Road No, Area details"
                value={formData.address}
                onChange={handleChange}
                className="w-full h-20 border border-gray-200 rounded-sm p-3 outline-none text-sm focus:border-primary transition-colors resize-none"
              />
            </div>

            <h3 className="text-base font-bold text-text-main border-b border-gray-100 pb-2.5 mt-4">2. Payment Method</h3>
            
            <div className="flex flex-col md:flex-row gap-4">
              <label className="flex-1 flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 border-gray-200">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                    className="accent-primary"
                  />
                  <div>
                    <strong className="text-sm text-text-main block">Cash on Delivery</strong>
                    <span className="text-xs text-text-muted">Pay with cash upon delivery</span>
                  </div>
                </div>
                <i className="material-icons text-2xl text-gray-400">payments</i>
              </label>

              <label className="flex-1 flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 border-gray-200">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="sslcommerz"
                    checked={formData.paymentMethod === "sslcommerz"}
                    onChange={handleChange}
                    className="accent-primary"
                  />
                  <div>
                    <strong className="text-sm text-text-main block">Online Payment</strong>
                    <span className="text-xs text-text-muted">Pay securely via SSLCommerz</span>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <span className="bg-blue-50 text-[9px] text-blue-600 font-bold px-1.5 py-0.5 rounded-sm">Visa</span>
                  <span className="bg-red-50 text-[9px] text-red-600 font-bold px-1.5 py-0.5 rounded-sm">bKash</span>
                </div>
              </label>
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-lg p-5 shadow-xs border border-gray-50">
              <h3 className="text-base font-bold text-text-main border-b border-gray-100 pb-2.5 mb-4">Order Summary</h3>
              
              {/* Product items list */}
              <div className="flex flex-col gap-4 divide-y divide-gray-100 max-h-[250px] overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 pt-3 first:pt-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-12 h-12 object-contain bg-gray-50 p-1 border border-gray-100 rounded shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="text-xs font-medium text-text-main leading-snug line-clamp-2">{item.name}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 border border-gray-200 rounded-sm px-1.5 bg-gray-50">
                          <button type="button" onClick={() => handleQtyChange(item.id, -1)} className="text-xs hover:text-primary font-bold">-</button>
                          <span className="text-xs font-semibold text-text-main px-1">{item.quantity}</span>
                          <button type="button" onClick={() => handleQtyChange(item.id, 1)} className="text-xs hover:text-primary font-bold">+</button>
                        </div>
                        <span className="text-xs font-bold text-primary">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="border-t border-gray-100 pt-4 mt-4 flex flex-col gap-2.5 text-[13px] text-text-light">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-text-main font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="text-text-main font-medium">{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-2.5 text-base font-bold text-text-main mt-1">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-sm text-sm transition-colors mt-6 cursor-pointer text-center block"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-lg shadow-xs p-10 text-center flex flex-col items-center gap-4 justify-center border border-gray-50 my-5 min-h-[350px]">
          <div className="w-20 h-20 rounded-full bg-blue-50 text-primary flex items-center justify-center">
            <i className="material-icons text-4xl">shopping_cart</i>
          </div>
          <h2 className="text-lg font-bold text-text-main">Your Cart is Empty!</h2>
          <p className="text-sm text-text-muted max-w-[400px]">Go to the homepage or search for your desired tech gear to start shopping.</p>
          <a href="/" className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-sm text-sm font-semibold transition-colors">
            Continue Shopping
          </a>
        </div>
      )}
    </div>
  );
}
