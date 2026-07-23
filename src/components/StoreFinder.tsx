import Link from "next/link";

export default function StoreFinder() {
  return (
    <div className="max-w-[1300px] mx-auto px-4 w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg p-6 md:px-8 md:py-5 mt-8" style={{ background: "linear-gradient(to right, #00b4d8, #1a5276, #0a1f3f)" }}>
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/15 text-white shrink-0">
            <i className="material-icons text-2xl">place</i>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">20+ Physical Stores</h3>
            <p className="text-sm text-white/80 mt-0.5">Visit Our Store &amp; Get Your Desired IT Product!</p>
          </div>
        </div>
        <Link href="/information/contact" className="flex items-center gap-2 bg-[#f5a623] hover:bg-[#e6951a] text-[#1a1a2e] px-7 py-3 rounded-full text-sm font-semibold transition-colors shrink-0">
          Find Our Store
          <i className="material-icons text-lg">search</i>
        </Link>
      </div>
    </div>
  );
}
