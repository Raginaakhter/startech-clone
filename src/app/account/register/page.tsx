"use client";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }
    alert(`Account created for: ${formData.name}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-[1300px] mx-auto px-4 w-full flex items-center justify-center" style={{ minHeight: "75vh" }}>
      <div className="bg-white rounded-lg p-6 md:p-8 shadow-xs border border-gray-50 w-full max-w-[460px] my-10">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-text-main">Create Account</h2>
          <p className="text-xs text-text-muted mt-1">Register to save your PC builds, trace orders, and earn Star Points</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-[13px] font-medium text-text-main block mb-1.5">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. John Doe"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full h-10 border border-gray-200 rounded-sm px-3 outline-none text-sm focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="text-[13px] font-medium text-text-main block mb-1.5">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="e.g. john@example.com"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full h-10 border border-gray-200 rounded-sm px-3 outline-none text-sm focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="text-[13px] font-medium text-text-main block mb-1.5">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="e.g. 017XXXXXXXX"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full h-10 border border-gray-200 rounded-sm px-3 outline-none text-sm focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="text-[13px] font-medium text-text-main block mb-1.5">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Min 6 characters"
              required
              minLength={6}
              value={formData.password}
              onChange={handleChange}
              className="w-full h-10 border border-gray-200 rounded-sm px-3 outline-none text-sm focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="text-[13px] font-medium text-text-main block mb-1.5">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full h-10 border border-gray-200 rounded-sm px-3 outline-none text-sm focus:border-primary transition-colors"
            />
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white py-2.5 rounded-sm font-semibold text-sm transition-colors mt-2 cursor-pointer"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center border-t border-gray-100 pt-5">
          <span className="text-xs text-text-muted">Already have an account? </span>
          <Link href="/account/login" className="text-xs text-primary font-semibold hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
