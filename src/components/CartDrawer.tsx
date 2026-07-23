"use client";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function CartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { cart, updateCartQty, removeFromCart } = useApp();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
            <i className="material-icons text-lg">shopping_basket</i>
            <span>YOUR CART ({cart.reduce((sum, i) => sum + i.quantity, 0)})</span>
          </h3>
          <button className="text-white hover:text-primary transition-colors flex items-center cursor-pointer" onClick={onClose}>
            <i className="material-icons">close</i>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 flex flex-col divide-y divide-gray-100">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="py-3 flex items-center gap-3">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-14 h-14 object-contain bg-gray-50 rounded p-1 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-text-main line-clamp-2 leading-tight">{item.name}</h4>
                  <div className="text-xs font-bold text-primary mt-1">
                    {formatPrice(item.price)} x {item.quantity}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex items-center border border-gray-200 rounded text-xs bg-gray-50">
                      <button
                        onClick={() => updateCartQty(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 text-gray-700"
                      >
                        -
                      </button>
                      <span className="px-2 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQty(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 text-gray-700"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 text-xs flex items-center gap-0.5 ml-auto"
                    >
                      <i className="material-icons text-sm">delete_outline</i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center text-text-muted my-auto py-12">
              <i className="material-icons text-5xl opacity-30 mb-2">shopping_cart</i>
              <p className="text-sm font-medium">Your cart is empty!</p>
              <p className="text-xs text-text-muted mt-1">Add items to get started.</p>
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-100 flex flex-col gap-3 bg-gray-50">
            <div className="flex items-center justify-between text-sm font-bold text-text-main">
              <span>Subtotal:</span>
              <span className="text-primary text-base">{formatPrice(subtotal)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="w-full text-center bg-primary hover:bg-primary-dark text-white py-2.5 rounded-sm text-xs font-semibold transition-colors block uppercase tracking-wider shadow-sm"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
