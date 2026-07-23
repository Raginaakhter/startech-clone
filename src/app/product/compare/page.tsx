"use client";
import { featuredProducts } from "@/data/products";

export default function CompareProductsPage() {
  // Take 3 sample products to compare side-by-side
  const p1 = featuredProducts[0]; // MSI Supercomputer
  const p2 = featuredProducts[5]; // MSI Brand PC
  const p3 = featuredProducts[6]; // Ryzen 5 PC

  const formatPrice = (price) => {
    return price ? price.toLocaleString("en-BD") + "৳" : "N/A";
  };

  return (
    <div className="max-w-[1300px] mx-auto px-4 w-full" style={{ minHeight: "85vh" }}>
      {/* Page Header */}
      <div className="py-6">
        <h1 className="text-xl md:text-2xl font-bold text-text-main">Product Comparison</h1>
        <p className="text-xs text-text-muted mt-1">Compare technical specifications, features, and pricing side-by-side.</p>
      </div>

      {/* Comparison Layout Table */}
      <div className="bg-white rounded-lg shadow-xs overflow-hidden border border-gray-100 mb-10 overflow-x-auto">
        <table className="w-full border-collapse text-left min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="p-4 text-xs font-semibold text-text-light uppercase tracking-wider w-[25%]">Specification</th>
              <th className="p-4 w-[25%] text-center">
                <div className="flex flex-col items-center gap-2">
                  <img src={p1.image} alt={p1.name} className="w-20 h-20 object-contain bg-white border border-gray-100 p-1 rounded" />
                  <span className="text-[13px] font-bold text-text-main line-clamp-2 text-center h-9 leading-tight">{p1.name}</span>
                </div>
              </th>
              <th className="p-4 w-[25%] text-center">
                <div className="flex flex-col items-center gap-2">
                  <img src={p2.image} alt={p2.name} className="w-20 h-20 object-contain bg-white border border-gray-100 p-1 rounded" />
                  <span className="text-[13px] font-bold text-text-main line-clamp-2 text-center h-9 leading-tight">{p2.name}</span>
                </div>
              </th>
              <th className="p-4 w-[25%] text-center">
                <div className="flex flex-col items-center gap-2">
                  <img src={p3.image} alt={p3.name} className="w-20 h-20 object-contain bg-white border border-gray-100 p-1 rounded" />
                  <span className="text-[13px] font-bold text-text-main line-clamp-2 text-center h-9 leading-tight">{p3.name}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Price Row */}
            <tr>
              <td className="p-4 text-sm font-semibold text-text-light">Price</td>
              <td className="p-4 text-center text-sm font-bold text-primary">{formatPrice(p1.price)}</td>
              <td className="p-4 text-center text-sm font-bold text-primary">{formatPrice(p2.price)}</td>
              <td className="p-4 text-center text-sm font-bold text-primary">{formatPrice(p3.price)}</td>
            </tr>

            {/* Brand Row */}
            <tr className="bg-gray-50/20">
              <td className="p-4 text-sm font-semibold text-text-light">Brand</td>
              <td className="p-4 text-center text-sm text-text-main">MSI</td>
              <td className="p-4 text-center text-sm text-text-main">MSI</td>
              <td className="p-4 text-center text-sm text-text-main">AMD</td>
            </tr>

            {/* Model Row */}
            <tr>
              <td className="p-4 text-sm font-semibold text-text-light">Model</td>
              <td className="p-4 text-center text-sm text-text-main">EdgeXpert MS-C931</td>
              <td className="p-4 text-center text-sm text-text-main">BZ09</td>
              <td className="p-4 text-center text-sm text-text-main">PRO 5650G</td>
            </tr>

            {/* Status Row */}
            <tr className="bg-gray-50/20">
              <td className="p-4 text-sm font-semibold text-text-light">Availability</td>
              <td className="p-4 text-center text-sm text-green-600 font-medium">In Stock</td>
              <td className="p-4 text-center text-sm text-green-600 font-medium">In Stock</td>
              <td className="p-4 text-center text-sm text-green-600 font-medium">In Stock</td>
            </tr>

            {/* Warranty Row */}
            <tr>
              <td className="p-4 text-sm font-semibold text-text-light">Warranty</td>
              <td className="p-4 text-center text-sm text-text-main">3 Years Warranty</td>
              <td className="p-4 text-center text-sm text-text-main">3 Years Warranty</td>
              <td className="p-4 text-center text-sm text-text-main">2 Years Warranty</td>
            </tr>

            {/* Action Row */}
            <tr className="bg-gray-50/30">
              <td className="p-4 text-sm font-semibold text-text-light">Actions</td>
              <td className="p-4 text-center">
                <button className="bg-primary hover:bg-primary-dark text-white text-xs font-semibold px-4 py-2 rounded-sm transition-colors cursor-pointer" onClick={() => alert("Added to cart: " + p1.name)}>
                  Add to Cart
                </button>
              </td>
              <td className="p-4 text-center">
                <button className="bg-primary hover:bg-primary-dark text-white text-xs font-semibold px-4 py-2 rounded-sm transition-colors cursor-pointer" onClick={() => alert("Added to cart: " + p2.name)}>
                  Add to Cart
                </button>
              </td>
              <td className="p-4 text-center">
                <button className="bg-primary hover:bg-primary-dark text-white text-xs font-semibold px-4 py-2 rounded-sm transition-colors cursor-pointer" onClick={() => alert("Added to cart: " + p3.name)}>
                  Add to Cart
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
