"use client";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function CompareDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { compareList, toggleCompare, clearCompare } = useApp();

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-BD") + "৳";
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-all duration-200 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={onClose}
      />
      
      {/* Drawer Container */}
      <div 
        className={`fixed top-0 right-0 h-screen w-[380px] max-w-full bg-white z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 bg-dark-1 text-white">
          <h3 className="text-sm font-semibold tracking-wider uppercase flex items-center gap-2">
            <i className="material-icons text-lg">library_add</i>
            <span>Compare ({compareList.length}/3)</span>
          </h3>
          <button className="text-white hover:text-primary transition-colors flex items-center cursor-pointer" onClick={onClose}>
            <i className="material-icons">close</i>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 flex flex-col divide-y divide-gray-100">
          {compareList.length > 0 ? (
            compareList.map((item) => (
              <div key={item.id} className="py-3 flex items-center gap-3">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-contain bg-gray-50 rounded p-1 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-text-main line-clamp-2 leading-tight">{item.name}</h4>
                  <div className="text-xs font-bold text-primary mt-1">{formatPrice(item.price)}</div>
                </div>
                <button
                  onClick={() => toggleCompare(item)}
                  className="text-gray-400 hover:text-red-500 text-xs flex items-center p-1"
                  title="Remove"
                >
                  <i className="material-icons text-base">close</i>
                </button>
              </div>
            ))
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center text-text-muted my-auto py-12">
              <i className="material-icons text-5xl opacity-30 mb-2">library_add</i>
              <p className="text-sm font-medium">No products in compare list!</p>
              <p className="text-xs text-text-muted mt-1">Select up to 3 products to compare specs.</p>
            </div>
          )}
        </div>
        
        {compareList.length > 0 && (
          <div className="p-4 border-t border-gray-100 flex flex-col gap-2 bg-gray-50">
            <Link 
              href="/product/compare" 
              onClick={onClose}
              className="w-full text-center bg-primary hover:bg-primary-dark text-white py-2.5 rounded-sm text-xs font-semibold transition-colors block uppercase tracking-wider"
            >
              Compare Products Page
            </Link>
            <button
              onClick={clearCompare}
              className="text-xs text-text-muted hover:text-red-500 text-center py-1 cursor-pointer transition-colors"
            >
              Clear All Items
            </button>
          </div>
        )}
      </div>
    </>
  );
}
