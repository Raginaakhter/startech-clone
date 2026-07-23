"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { getRelatedProducts, getProductSpecs } from "@/data/helpers";
import ProductCard from "./ProductCard";

export default function ProductDetailView({ product }: { product: any }) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist, toggleCompare, isInCompare } = useApp();
  const [added, setAdded] = useState(false);

  const specs = getProductSpecs();
  const related = getRelatedProducts(product.id, 4);

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-BD") + "৳";
  };

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product);
    router.push("/checkout");
  };

  const inWish = isInWishlist(product.id);
  const inComp = isInCompare(product.id);

  return (
    <div className="max-w-[1300px] mx-auto px-4 w-full">
      {/* Breadcrumbs */}
      <div className="py-4 text-[13px] text-text-light">
        <a href="/" className="hover:text-primary transition-colors">Home</a> &gt; <span>Product Details</span> &gt; <strong className="text-text-main">{product.name}</strong>
      </div>

      {/* Main Product Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg p-6 md:p-8 shadow-xs mt-2">
        <div className="flex items-center justify-center border border-gray-100 rounded-lg p-5 bg-gray-50 min-h-[300px] md:min-h-[400px]">
          <img src={product.image} alt={product.name} className="max-h-[380px] object-contain" />
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-xl md:text-2xl font-bold text-text-main leading-snug">{product.name}</h1>
          
          <div className="flex flex-wrap gap-3.5 text-[13px] text-text-light">
            <span className="bg-body-bg px-2.5 py-1 rounded-full">Price: <strong className="text-text-main">{formatPrice(product.price)}</strong></span>
            <span className="bg-body-bg px-2.5 py-1 rounded-full">Status: <strong className="text-green-600">In Stock</strong></span>
            <span className="bg-body-bg px-2.5 py-1 rounded-full">Product Code: <strong className="text-text-main">ST-{product.id}</strong></span>
          </div>

          <div className="bg-[#fff8f6] border-l-4 border-primary p-4 rounded-r-lg">
            {product.oldPrice ? (
              <>
                <h2 className="text-2xl md:text-3xl font-bold text-primary flex items-baseline gap-2.5">
                  {formatPrice(product.price)}
                  <span className="text-base text-text-muted line-through font-normal">{formatPrice(product.oldPrice)}</span>
                </h2>
                {product.badge && <p className="text-[13px] text-primary mt-1.5 font-semibold">{product.badge}</p>}
              </>
            ) : (
              <h2 className="text-2xl md:text-3xl font-bold text-primary">{formatPrice(product.price)}</h2>
            )}
          </div>

          <div className="border-y border-gray-100 py-4">
            <h4 className="text-sm font-semibold mb-2.5 text-text-main">Key Features:</h4>
            <ul className="list-disc pl-4 flex flex-col gap-1.5 text-[13px] text-text-light">
              <li>Premium High Performance Build</li>
              <li>Official Brand Warranty Coverage</li>
              <li>Tested and Verified Quality assurance</li>
              <li>Latest model release for optimal efficiency</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              className="bg-primary hover:bg-primary-dark text-white py-3.5 px-6 text-sm font-semibold rounded-sm flex-1 text-center transition-colors cursor-pointer"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            <button
              className={`${
                added ? "bg-green-600" : "bg-dark-1 hover:bg-neutral-800"
              } text-white py-3.5 px-6 text-sm font-semibold rounded-sm flex-1 text-center transition-colors cursor-pointer flex items-center justify-center gap-2`}
              onClick={handleAddToCart}
            >
              <i className="material-icons text-lg">{added ? "check" : "shopping_cart"}</i>
              {added ? "Added to Cart!" : "Add to Cart"}
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-text-light pt-2">
            <button
              onClick={() => toggleWishlist(product)}
              className={`flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer ${
                inWish ? "text-primary font-bold" : ""
              }`}
            >
              <i className="material-icons text-base">{inWish ? "favorite" : "favorite_border"}</i>
              {inWish ? "Saved to Wishlist" : "Add to Wishlist"}
            </button>
            <button
              onClick={() => toggleCompare(product)}
              className={`flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer ${
                inComp ? "text-primary font-bold" : ""
              }`}
            >
              <i className="material-icons text-base">library_add</i>
              {inComp ? "Added to Compare" : "Add to Compare"}
            </button>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="mt-8 bg-white rounded-lg p-6 md:p-8 shadow-xs">
        <h3 className="text-lg font-bold mb-4 border-b border-gray-100 pb-2 text-text-main">Specification</h3>
        <table className="w-full border-collapse mt-4">
          <tbody>
            {specs.map((spec, idx) => (
              <tr key={idx} className="border-b border-gray-100 last:border-0 odd:bg-gray-50/50">
                <td className="p-3 text-[13px] font-medium text-text-light w-[30%]">{spec.label}</td>
                <td className="p-3 text-[13px] text-text-main">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Related Products */}
      <div className="mt-10 mb-10">
        <h3 className="text-lg md:text-xl font-bold mb-5 text-text-main">Related Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {related.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}
