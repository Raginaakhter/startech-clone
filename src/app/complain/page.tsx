"use client";
import { useState } from "react";
import Link from "next/link";

export default function ComplainPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    subject: "",
    details: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Your complaint has been submitted successfully!");
    setFormData({ fullName: "", phone: "", email: "", subject: "", details: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[850px] mx-auto py-10 px-4">
        <div className="bg-white rounded shadow-sm p-8 md:p-12">
          {/* Header */}
          <h1 className="text-center text-[28px] font-bold text-[#3aace3] mb-2">
            Complain & Feedback
          </h1>
          <p className="text-center text-[14px] text-gray-600 mb-0.5">
            Please fill out the following form with details
          </p>
          <p className="text-center text-[14px] text-gray-600 mb-6">
            We will review your request and follow up with you as soon as possible.
          </p>

          <hr className="border-gray-200 mb-8" />

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Row 1: Full Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
              <div>
                <label className="block text-[14px] font-bold text-gray-800 mb-2">
                  Full Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Type Your Full Name."
                  required
                  className="w-full border-0 border-b border-gray-300 focus:border-[#3aace3] focus:outline-none text-[14px] text-gray-500 placeholder-gray-400 py-2 bg-transparent transition-colors"
                />
              </div>
              <div>
                <label className="block text-[14px] font-bold text-gray-800 mb-2">
                  Phone No.<span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Type Your Mobile No."
                  required
                  className="w-full border-0 border-b border-gray-300 focus:border-[#3aace3] focus:outline-none text-[14px] text-gray-500 placeholder-gray-400 py-2 bg-transparent transition-colors"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="mb-6">
              <label className="block text-[14px] font-bold text-gray-800 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Type Your Email Address."
                className="w-full border-0 border-b border-gray-300 focus:border-[#3aace3] focus:outline-none text-[14px] text-gray-500 placeholder-gray-400 py-2 bg-transparent transition-colors"
              />
            </div>

            {/* Subject */}
            <div className="mb-6">
              <label className="block text-[14px] font-bold text-gray-800 mb-2">
                Subject<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Type Your Problem Subject"
                required
                className="w-full border-0 border-b border-gray-300 focus:border-[#3aace3] focus:outline-none text-[14px] text-gray-500 placeholder-gray-400 py-2 bg-transparent transition-colors"
              />
            </div>

            {/* Details */}
            <div className="mb-8">
              <label className="block text-[14px] font-bold text-gray-800 mb-2">
                Details<span className="text-red-500">*</span>
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Write Your Problem In Details."
                required
                rows={3}
                className="w-full border-0 border-b border-gray-300 focus:border-[#3aace3] focus:outline-none text-[14px] text-gray-500 placeholder-gray-400 py-2 bg-transparent resize-y transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#3aace3] hover:bg-[#2d99cc] text-white text-[16px] font-bold py-3.5 rounded transition-colors cursor-pointer"
            >
              Submit Your Request
            </button>
          </form>
        </div>

        {/* Mini Footer */}
        <div className="mt-8 px-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <img
                src="https://www.startech.com.bd/image/catalog/logo.png"
                alt="Star Tech"
                className="h-12"
              />
            </Link>
            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/star.tech.ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#3b5998] text-white text-sm hover:opacity-80 transition-opacity"
              >
                <i className="material-icons text-lg">thumb_up</i>
              </a>
              <a
                href="https://www.instagram.com/startech.com.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#e1306c] text-white text-sm hover:opacity-80 transition-opacity"
              >
                <i className="material-icons text-lg">camera_alt</i>
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0077b5] text-white text-sm hover:opacity-80 transition-opacity"
              >
                <i className="material-icons text-lg">work</i>
              </a>
            </div>
          </div>
          <p className="text-center text-[13px] text-gray-500 border-t border-gray-200 pt-4">
            © Power By SYP Solutions Ltd
          </p>
        </div>
      </div>
    </div>
  );
}
