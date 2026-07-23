"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logged in as: ${email}`);
  };

  return (
    <div className="max-w-[1300px] mx-auto px-4 w-full flex items-center justify-center" style={{ minHeight: "75vh" }}>
      <div className="bg-white rounded-lg p-6 md:p-8 shadow-xs border border-gray-50 w-full max-w-[420px] my-10">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-text-main">Account Login</h2>
          <p className="text-xs text-text-muted mt-1">Access your orders, pc builds, and account details</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-[13px] font-medium text-text-main block mb-1.5">Email Address</label>
            <input
              type="email"
              placeholder="e.g. name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 border border-gray-200 rounded-sm px-3 outline-none text-sm focus:border-primary transition-colors"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[13px] font-medium text-text-main block">Password</label>
              <a href="#" className="text-xs text-primary hover:underline">Forgot Password?</a>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 border border-gray-200 rounded-sm px-3 outline-none text-sm focus:border-primary transition-colors"
            />
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white py-2.5 rounded-sm font-semibold text-sm transition-colors mt-2 cursor-pointer"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center border-t border-gray-100 pt-5">
          <span className="text-xs text-text-muted">Don't have an account? </span>
          <Link href="/account/register" className="text-xs text-primary font-semibold hover:underline">
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}
