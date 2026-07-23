"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function Header({
  onCartOpen,
  onCompareOpen,
}: {
  onCartOpen: () => void;
  onCompareOpen: () => void;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { cart, compareList } = useApp();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="bg-[#1c2336] sticky top-0 z-50">
      <div className="max-w-[1300px] mx-auto px-4 w-full">
        <div className="flex items-center justify-between py-3 min-h-[70px] gap-4">

          {/* Mobile hamburger */}
          <div
            className="flex md:hidden flex-col justify-center gap-1 w-9 h-9 cursor-pointer"
            id="nav-toggler"
          >
            <span className="w-6 h-0.5 bg-white transition-all"></span>
            <span className="w-6 h-0.5 bg-white transition-all"></span>
            <span className="w-6 h-0.5 bg-white transition-all"></span>
          </div>

          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center">
              <img
                src="https://www.startech.com.bd/image/catalog/logo.png"
                alt="Star Tech Ltd"
                width={144}
                height={52}
                className="h-[40px] md:h-[52px] w-auto"
              />
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-[550px] relative"
          >
            <input
              type="text"
              placeholder="Search"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-11 border-none rounded-l-full px-5 outline-none text-sm bg-white"
            />
            <button
              type="submit"
              className="material-icons bg-white text-gray-500 hover:text-primary rounded-r-full h-11 w-12 flex items-center justify-center transition-colors border-l border-gray-200"
            >
              search
            </button>
          </form>

          {/* Actions - Desktop */}
          <div className="hidden lg:flex items-center gap-1.5 shrink-0">
            <Link href="/information/offer" className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-sm transition-colors cursor-pointer whitespace-nowrap">
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-primary shrink-0">
                <i className="material-icons text-xl">card_giftcard</i>
              </div>
              <div>
                <h5 className="text-[13px] font-medium text-white leading-tight">Offers</h5>
                <p className="text-[11px] text-gray-400">Latest Offers</p>
              </div>
            </Link>

            <Link href="/happy-hour" className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-sm transition-colors cursor-pointer whitespace-nowrap">
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-orange-400 animate-blink shrink-0">
                <i className="material-icons text-xl">flash_on</i>
              </div>
              <div>
                <h5 className="text-[13px] font-medium text-white leading-tight">Happy Hour</h5>
                <p className="text-[11px] text-gray-400">Special Deals</p>
              </div>
            </Link>

            <Link href="/account/login" className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-sm transition-colors cursor-pointer whitespace-nowrap">
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-primary shrink-0">
                <i className="material-icons text-xl">person</i>
              </div>
              <div>
                <h5 className="text-[13px] font-medium text-white leading-tight">Account</h5>
                <p className="text-[11px] text-gray-400">Register or Login</p>
              </div>
            </Link>

            <Link href="/tool/pc_builder" className="flex items-center gap-2 px-5 py-2.5 bg-[#3749bb] hover:bg-[#2d3da0] text-white rounded transition-colors cursor-pointer whitespace-nowrap ml-2">
              <i className="material-icons text-xl">important_devices</i>
              <h5 className="text-[13px] font-semibold text-white leading-tight">PC Builder</h5>
            </Link>

            {/* <div
              className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-sm transition-colors cursor-pointer whitespace-nowrap"
              onClick={onCompareOpen}
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-primary shrink-0">
                <i className="material-icons text-xl">library_add</i>
              </div>
              <div>
                <h5 className="text-[13px] font-medium text-white leading-tight">Compare ({compareList.length})</h5>
              </div>
            </div> */}
          </div>

          {/* Mobile Actions/Icons */}
          <div className="flex lg:hidden items-center gap-2 ml-auto shrink-0">
            <button
              className="w-9 h-9 flex items-center justify-center rounded-full text-text-main hover:bg-body-bg transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <i className="material-icons">{searchOpen ? "close" : "search"}</i>
            </button>
            <button
              className="w-9 h-9 flex items-center justify-center rounded-full text-text-main hover:bg-body-bg transition-colors relative"
              onClick={onCartOpen}
            >
              <i className="material-icons">shopping_basket</i>
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
            </button>
          </div>
        </div>

        {/* Mobile Search - Slide down search */}
        {searchOpen && (
          <form
            onSubmit={handleSearch}
            className="flex md:hidden w-full pb-3 border-t border-gray-100 pt-2"
          >
            <input
              type="text"
              placeholder="Search"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 h-10 border-2 border-primary rounded-l px-3 outline-none text-sm"
              autoFocus
            />
            <button
              type="submit"
              className="material-icons bg-primary hover:bg-primary-dark text-white rounded-r h-10 w-11 flex items-center justify-center"
            >
              search
            </button>
          </form>
        )}
      </div>
    </header>
  );
}
