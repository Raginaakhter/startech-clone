"use client";
import { useState } from "react";
import Link from "next/link";
import { featuredProducts } from "@/data/products";

export default function WishlistPage() {
  // Pre-populate with 2 products for demonstration
  const [wishlistItems, setWishlistItems] = useState([
    featuredProducts[17], // iPhone 15
    featuredProducts[9],  // AOC Gaming Monitor
  ]);

  const handleRemove = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const formatPrice = (price) => {
    return price.toLocaleString("en-BD") + "৳";
  };

  return (
    <div className="max-w-[1300px] mx-auto px-4 w-full" style={{ minHeight: "80vh" }}>
      {/* Page Header */}
      <div className="py-6">
        <h1 className="text-xl md:text-2xl font-bold text-text-main">My Wishlist</h1>
        <p className="text-xs text-text-muted mt-1">Keep track of the products you want to buy later.</p>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="bg-white rounded-lg shadow-xs overflow-hidden border border-gray-100 mb-12">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-[100px_1fr_150px_150px_100px] gap-4 p-4 bg-gray-50 border-b border-gray-100 text-xs font-bold text-text-light uppercase tracking-wider">
            <span>Image</span>
            <span>Product Name</span>
            <span className="text-center">Price</span>
            <span className="text-center">Stock Status</span>
            <span className="text-right">Action</span>
          </div>

          {/* Wishlist Items List */}
          <div className="divide-y divide-gray-100">
            {wishlistItems.map((item) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-[100px_1fr_150px_150px_100px] gap-4 p-4 items-center">
                
                {/* Product Image */}
                <div className="flex justify-center md:justify-start">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-contain bg-gray-50 p-1 border border-gray-100 rounded"
                  />
                </div>

                {/* Product Name */}
                <div>
                  <h4 className="text-sm font-semibold text-text-main hover:text-primary transition-colors leading-tight">
                    <Link href={item.href}>{item.name}</Link>
                  </h4>
                </div>

                {/* Product Price */}
                <div className="text-center">
                  <span className="text-sm font-bold text-primary block">
                    {formatPrice(item.price)}
                  </span>
                  {item.oldPrice && (
                    <span className="text-xs text-text-muted line-through">
                      {formatPrice(item.oldPrice)}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="text-center">
                  <span className="text-xs text-green-600 font-semibold bg-green-50 px-2.5 py-0.5 rounded-full border border-green-100 inline-block">
                    In Stock
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3.5">
                  <button 
                    onClick={() => alert("Added to cart: " + item.name)}
                    className="bg-primary hover:bg-primary-dark text-white text-xs font-semibold px-3.5 py-2 rounded-sm transition-colors cursor-pointer"
                  >
                    Buy Now
                  </button>
                  <button 
                    onClick={() => handleRemove(item.id)}
                    className="text-gray-400 hover:text-primary transition-colors flex items-center"
                    title="Remove from wishlist"
                  >
                    <i className="material-icons text-xl">delete</i>
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-xs p-10 text-center flex flex-col items-center gap-4 justify-center border border-gray-50 my-5 min-h-[350px]">
          <div className="w-20 h-20 rounded-full bg-blue-50 text-primary flex items-center justify-center">
            <i className="material-icons text-4xl">favorite_border</i>
          </div>
          <h2 className="text-lg font-bold text-text-main">Your Wishlist is Empty!</h2>
          <p className="text-sm text-text-muted max-w-[400px]">Save your favorite products here by clicking the wishlist icon on details pages.</p>
          <a href="/" className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-sm text-sm font-semibold transition-colors">
            Go to Shop
          </a>
        </div>
      )}
    </div>
  );
}
