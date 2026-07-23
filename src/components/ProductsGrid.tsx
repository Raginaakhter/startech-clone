import ProductCard from "./ProductCard";
import { featuredProducts } from "@/data/products";

export default function ProductsGrid() {
  return (
    <div className="max-w-[1300px] mx-auto px-4 w-full">
      <div className="mt-8">
        <div className="text-center mb-5">
          <h3 className="text-xl md:text-2xl font-bold text-text-main">Featured Products</h3>
          <p className="text-sm text-text-muted mt-1">Check &amp; Get Your Desired Product!</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
