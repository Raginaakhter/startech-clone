"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function ProductCard({ product }: { product: any }) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist, toggleCompare, isInCompare } = useApp();
  const [added, setAdded] = useState(false);

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-BD") + "৳";
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    router.push("/checkout");
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(product);
  };

  const inWish = isInWishlist(product.id);
  const inComp = isInCompare(product.id);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all relative flex flex-col h-full group border border-gray-100">
      {product.badge && (
        <span className="absolute top-2 left-2 bg-primary text-white text-[11px] font-medium px-2 py-0.5 rounded-xs z-10">
          {product.badge}
        </span>
      )}

      {/* Top right quick actions */}
      <div className="">
        <button
          onClick={handleWishlist}
          title={inWish ? "Remove from Wishlist" : "Add to Wishlist"}
          className={`w-7 h-7 rounded-full bg-white/90 shadow-xs flex items-center justify-center transition-colors ${inWish ? "text-primary font-bold" : "text-gray-400 hover:text-primary"
            }`}
        >
          <i className="material-icons text-sm">{inWish ? "favorite" : "favorite_border"}</i>
        </button>
        <button
          onClick={handleCompare}
          title={inComp ? "Remove from Compare" : "Add to Compare"}
          className={`w-7 h-7 rounded-full bg-white/90 shadow-xs flex items-center justify-center transition-colors ${inComp ? "text-primary font-bold" : "text-gray-400 hover:text-primary"
            }`}
        >
          <i className="material-icons text-sm">library_add</i>
        </button>
      </div>

      <div className="p-4 flex items-center justify-center aspect-square bg-gray-50 relative overflow-hidden shrink-0">
        <Link href={product.href} className="w-full h-full flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            width={228}
            height={228}
            className="max-w-[85%] max-h-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="p-3.5 flex flex-col flex-1">
        <h4 className="text-[13px] font-normal text-text-main leading-snug line-clamp-2 mb-2 min-h-[38px]">
          <Link href={product.href} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </h4>

        <div className="text-sm font-bold text-primary flex items-center gap-1.5 mb-3 mt-auto">
          {product.oldPrice ? (
            <>
              <span>{formatPrice(product.price)}</span>
              <span className="text-xs text-text-muted line-through font-normal">{formatPrice(product.oldPrice)}</span>
            </>
          ) : (
            <span>{formatPrice(product.price)}</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-gray-100 mt-auto">
          <button
            onClick={handleBuyNow}
            className="bg-primary hover:bg-primary-dark text-white text-[12px] font-semibold py-1.5 px-2 rounded-xs text-center transition-colors cursor-pointer"
          >
            Buy Now
          </button>
          <button
            onClick={handleAddToCart}
            className={`${added ? "bg-green-600" : "bg-dark-1 hover:bg-neutral-800"
              } text-white text-[12px] font-semibold py-1.5 px-2 rounded-xs text-center transition-colors cursor-pointer flex items-center justify-center gap-1`}
          >
            <i className="material-icons text-xs">{added ? "check" : "shopping_cart"}</i>
            <span>{added ? "Added!" : "Add"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
