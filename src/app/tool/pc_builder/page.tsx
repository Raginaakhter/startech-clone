"use client";
import { useState } from "react";
import { searchProducts } from "@/data/helpers";

const COMPONENTS_SLOTS = [
  { id: "cpu", name: "Processor (CPU)", icon: "developer_board", keywords: ["processor", "amd", "intel", "ryzen"] },
  { id: "motherboard", name: "Motherboard", icon: "dns", keywords: ["motherboard", "msi", "asus", "gigabyte"] },
  { id: "ram", name: "RAM (Memory)", icon: "memory", keywords: ["ram", "corsair", "g.skill", "kingston", "team"] },
  { id: "storage", name: "Storage (SSD/HDD)", icon: "album", keywords: ["ssd", "hdd", "hard-disk"] },
  { id: "graphics", name: "Graphics Card", icon: "broken_image", keywords: ["graphics", "nvidia", "rtx", "rx", "gtx"] },
  { id: "power", name: "Power Supply", icon: "power", keywords: ["power supply", "cv550", "corsair", "antec"] },
  { id: "casing", name: "Casing", icon: "aspect_ratio", keywords: ["casing"] },
  { id: "monitor", name: "Monitor", icon: "desktop_windows", keywords: ["monitor", "dell", "aoc", "lg", "samsung"] },
];

export default function PCBuilderPage() {
  const [selectedItems, setSelectedItems] = useState<Record<string, any>>({});
  const [activeSlot, setActiveSlot] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Calculate totals
  const totalItems = Object.keys(selectedItems).length;
  const totalPrice = Object.values(selectedItems).reduce((sum: number, item: any) => sum + (item.price || 0), 0);

  const handleOpenSelector = (slot: any) => {
    setActiveSlot(slot);
    setModalOpen(true);
  };

  const handleSelectProduct = (product) => {
    setSelectedItems((prev) => ({
      ...prev,
      [activeSlot.id]: product,
    }));
    setModalOpen(false);
    setActiveSlot(null);
  };

  const handleRemoveProduct = (slotId) => {
    setSelectedItems((prev) => {
      const updated = { ...prev };
      delete updated[slotId];
      return updated;
    });
  };

  // Find candidate products for current active slot
  const getCandidateProducts = () => {
    if (!activeSlot) return [];
    
    // We search our products for matching keywords
    const matches = searchProducts("").filter((p) => {
      const pName = p.name.toLowerCase();
      const pHref = p.href.toLowerCase();
      return activeSlot.keywords.some(
        (kw) => pName.includes(kw) || pHref.includes(kw)
      );
    });

    // Fallback if no matching product, return first 5 general items
    return matches.length > 0 ? matches : searchProducts("").slice(0, 5);
  };

  const formatPrice = (price) => {
    return price.toLocaleString("en-BD") + "৳";
  };

  return (
    <div className="max-w-[1300px] mx-auto px-4 w-full" style={{ minHeight: "80vh" }}>
      {/* Page Header */}
      <div className="bg-white rounded-lg p-5 shadow-xs mt-5 border border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-text-main">PC Builder</h1>
          <p className="text-xs text-text-muted mt-1">Select components to build your custom desktop PC.</p>
        </div>
        <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
          <div className="text-right">
            <span className="text-xs text-text-muted block">Selected Components</span>
            <strong className="text-text-main text-sm">{totalItems} / {COMPONENTS_SLOTS.length}</strong>
          </div>
          <div className="h-8 w-[1px] bg-gray-200"></div>
          <div className="text-right">
            <span className="text-xs text-text-muted block">Total Price</span>
            <strong className="text-primary text-lg font-bold">{formatPrice(totalPrice)}</strong>
          </div>
        </div>
      </div>

      {/* Component Slots List */}
      <div className="bg-white rounded-lg shadow-xs mt-5 border border-gray-50 overflow-hidden divide-y divide-gray-100">
        {COMPONENTS_SLOTS.map((slot) => {
          const selectedProduct = selectedItems[slot.id];

          return (
            <div key={slot.id} className="p-4 md:p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                {/* Slot Icon */}
                <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center shrink-0">
                  <i className="material-icons text-xl">{slot.icon}</i>
                </div>

                {/* Slot Information / Selected Product Details */}
                <div className="flex-1">
                  <span className="text-[11px] text-text-muted uppercase tracking-wider block font-medium">
                    {slot.name}
                  </span>
                  
                  {selectedProduct ? (
                    <div className="flex items-center gap-3 mt-1.5">
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name} 
                        className="w-10 h-10 object-contain bg-gray-50 border border-gray-100 p-0.5 rounded"
                      />
                      <div>
                        <h4 className="text-[13px] font-medium text-text-main leading-tight line-clamp-1">
                          {selectedProduct.name}
                        </h4>
                        <span className="text-xs text-primary font-semibold block mt-0.5">
                          {formatPrice(selectedProduct.price)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400 block mt-1">Required</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div>
                {selectedProduct ? (
                  <button 
                    onClick={() => handleRemoveProduct(slot.id)}
                    className="text-xs text-red-500 hover:text-red-700 font-medium px-3 py-1.5 rounded-sm hover:bg-red-50 transition-all cursor-pointer"
                  >
                    Remove
                  </button>
                ) : (
                  <button 
                    onClick={() => handleOpenSelector(slot)}
                    className="text-xs text-primary hover:bg-primary/10 border border-primary/30 px-4 py-2 rounded-sm font-semibold transition-colors cursor-pointer"
                  >
                    Choose
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Build Summary Actions Footer */}
      <div className="flex justify-end gap-3 mt-5 mb-10">
        <button 
          onClick={() => {
            if (totalItems === 0) return alert("Select at least one component first!");
            window.print();
          }}
          className="bg-dark-1 hover:bg-neutral-800 text-white px-5 py-3 rounded-sm text-sm font-semibold transition-colors cursor-pointer"
        >
          Print Build
        </button>
        <button 
          onClick={() => {
            if (totalItems === 0) return alert("Select at least one component first!");
            alert("Build saved! Total price: " + formatPrice(totalPrice));
          }}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-sm text-sm font-semibold transition-colors cursor-pointer"
        >
          Save Build
        </button>
      </div>

      {/* Component Selector Modal */}
      {modalOpen && activeSlot && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-4 bg-dark-1 text-white flex items-center justify-between">
              <h3 className="font-semibold text-sm tracking-wider uppercase">Select {activeSlot.name}</h3>
              <button 
                className="text-white hover:text-primary transition-colors flex items-center" 
                onClick={() => setModalOpen(false)}
              >
                <i className="material-icons">close</i>
              </button>
            </div>

            {/* Modal Search results body */}
            <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100">
              {getCandidateProducts().map((product) => (
                <div key={product.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-12 h-12 object-contain bg-gray-50 border border-gray-100 p-0.5 rounded shrink-0"
                    />
                    <div>
                      <h4 className="text-[13px] font-medium text-text-main line-clamp-1">{product.name}</h4>
                      <span className="text-xs text-primary font-semibold mt-0.5 block">{formatPrice(product.price)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleSelectProduct(product)}
                    className="bg-primary hover:bg-primary-dark text-white text-xs font-semibold px-4 py-2 rounded-sm transition-colors cursor-pointer"
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
