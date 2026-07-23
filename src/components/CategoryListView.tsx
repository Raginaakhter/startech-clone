"use client";
import { useState, useEffect } from "react";
import { getProductsByCategory } from "@/data/helpers";
import ProductCard from "./ProductCard";

export default function CategoryListView({ category }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("default");
  const [filteredList, setFilteredList] = useState([]);

  const baseList = getProductsByCategory(category);

  const applyFilters = () => {
    let results = [...baseList];

    if (minPrice) {
      results = results.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      results = results.filter((p) => p.price <= Number(maxPrice));
    }

    if (sort === "price-low") {
      results.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      results.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredList(results);
  };

  useEffect(() => {
    setMinPrice("");
    setMaxPrice("");
    setSort("default");
    setFilteredList(baseList);
  }, [category]);

  return (
    <div className="max-w-[1300px] mx-auto px-4 w-full">
      {/* Breadcrumbs */}
      <div className="py-4 text-[13px] text-text-light">
        <a href="/" className="hover:text-primary transition-colors">Home</a> &gt; <span>Category</span> &gt; <strong className="text-text-main">{category.name}</strong>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5 mt-2">
        {/* Sidebar Filters */}
        <aside className="bg-white rounded-lg p-5 shadow-xs h-fit lg:sticky lg:top-[140px] border border-gray-50">
          <div className="mb-6 border-b border-gray-100 pb-5">
            <h4 className="text-[15px] font-bold mb-3 text-text-main">Price Range</h4>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full h-9 border border-gray-200 rounded-sm px-2.5 outline-none text-[13px] focus:border-primary"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full h-9 border border-gray-200 rounded-sm px-2.5 outline-none text-[13px] focus:border-primary"
              />
            </div>
            <button className="bg-primary hover:bg-primary-dark text-white text-[13px] font-medium py-2 px-4 rounded-sm mt-3 w-full text-center transition-colors cursor-pointer" onClick={applyFilters}>
              Apply Filter
            </button>
          </div>

          <div>
            <h4 className="text-[15px] font-bold mb-3 text-text-main">Availability</h4>
            <label className="flex items-center gap-2 cursor-pointer text-[13px] text-text-light">
              <input type="checkbox" defaultChecked className="accent-primary" /> In Stock
            </label>
          </div>
        </aside>

        {/* Main Content Area */}
        <div>
          <div className="bg-white rounded-lg p-4 md:px-5 md:py-3 shadow-xs flex items-center justify-between mb-4 border border-gray-50">
            <div className="category-title">
              <h1 className="text-base md:text-lg font-bold text-text-main">{category.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[13px] text-text-light whitespace-nowrap">Sort By:</label>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setTimeout(() => {
                    const selectVal = e.target.value;
                    let sorted = [...filteredList];
                    if (selectVal === "price-low") {
                      sorted.sort((a, b) => a.price - b.price);
                    } else if (selectVal === "price-high") {
                      sorted.sort((a, b) => b.price - a.price);
                    } else if (selectVal === "name") {
                      sorted.sort((a, b) => a.name.localeCompare(b.name));
                    } else {
                      sorted = getProductsByCategory(category).filter(
                        (p) =>
                          (!minPrice || p.price >= Number(minPrice)) &&
                          (!maxPrice || p.price <= Number(maxPrice))
                      );
                    }
                    setFilteredList(sorted);
                  }, 0);
                }}
                className="h-9 border border-gray-200 rounded-sm px-3 outline-none text-[13px] bg-white cursor-pointer text-text-main focus:border-primary"
              >
                <option value="default">Default</option>
                <option value="price-low">Price (Low &gt; High)</option>
                <option value="price-high">Price (High &gt; Low)</option>
                <option value="name">Name (A &gt; Z)</option>
              </select>
            </div>
          </div>

          {filteredList.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredList.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center min-h-[300px] bg-white rounded-lg p-10 shadow-xs border border-gray-50">
              <div className="w-16 h-16 rounded-full bg-orange-50 text-primary flex items-center justify-center mb-4">
                <i className="material-icons text-3xl">info_outline</i>
              </div>
              <h3 className="text-base font-bold text-text-main mb-1">No products in this category</h3>
              <p className="text-sm text-text-muted max-w-[400px]">We are updating this category soon. Please check back later!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
