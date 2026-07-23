import Link from "next/link";
import { featuredCategories } from "@/data/products";

export default function FeaturedCategories() {
  return (
    <div className="max-w-[1300px] mx-auto px-4 w-full">
      <div className="mt-8">
        <div className="text-center mb-5">
          <h2 className="text-xl md:text-2xl font-bold text-text-main">Featured Category</h2>
          <p className="text-sm text-text-muted mt-1">Get Your Desired Product from Featured Category!</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {featuredCategories.map((cat, idx) => (
            <div key={idx} className="text-center">
              <Link href={cat.href} className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg hover:shadow-md hover:-translate-y-1 transition-all shadow-xs">
                <span className="w-12 h-12 flex items-center justify-center rounded-full bg-linear-to-br from-[#fff5f2] to-[#ffe8e0] text-primary">
                  <i className="material-icons text-2xl">{cat.icon}</i>
                </span>
                <p className="text-xs font-medium text-text-main leading-tight">{cat.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
