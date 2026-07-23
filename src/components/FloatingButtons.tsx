"use client";
import { useApp } from "@/context/AppContext";

export default function FloatingButtons({
  onCartOpen,
  onCompareOpen,
}: {
  onCartOpen: () => void;
  onCompareOpen: () => void;
}) {
  const { cart, compareList } = useApp();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const compareCount = compareList.length;

  return (
    <>
      {/* Floating Cart Button */}
      <div 
        className="fixed bottom-20 right-5 w-14 h-14 bg-primary hover:bg-primary-dark text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer z-40 transition-all hover:scale-110" 
        onClick={onCartOpen}
      >
        <i className="material-icons text-2xl">shopping_basket</i>
        <span className="absolute -top-0.5 -right-0.5 bg-dark-1 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {cartCount}
        </span>
      </div>

      {/* Floating Compare Button */}
      <div 
        className="fixed bottom-5 right-5 w-14 h-14 bg-dark-1 hover:bg-neutral-800 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer z-40 transition-all hover:scale-110" 
        onClick={onCompareOpen}
      >
        <i className="material-icons text-2xl">library_add</i>
        <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {compareCount}
        </span>
      </div>
    </>
  );
}
