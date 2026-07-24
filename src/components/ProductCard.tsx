"use client";
import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {
  const formatPrice = (price: number) => {
    return price.toLocaleString("en-BD") + "৳";
  };

  const savings = product.oldPrice ? product.oldPrice - product.price : 0;
  const discountPercent = product.oldPrice
    ? Math.round((savings / product.oldPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all relative flex flex-col h-full group border border-gray-100">
      {product.oldPrice && savings > 0 && (
        <span className="absolute top-2 left-2 bg-violet-900 text-white text-[11px] font-medium px-2 py-0.5 rounded z-10">
          Save: {formatPrice(savings)} (-{discountPercent}%)
        </span>
      )}

      <div className="p-4 flex items-center justify-center aspect-square bg-white relative overflow-hidden shrink-0">
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

        <div className="text-sm font-bold text-[#333] flex items-center gap-2 mt-auto">
          <span>{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-text-muted line-through font-normal">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
