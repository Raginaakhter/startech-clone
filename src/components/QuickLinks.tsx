import Link from "next/link";
import { quickLinks } from "@/data/products";

export default function QuickLinks() {
  return (
    <div className="max-w-[1300px] mx-auto px-4 w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {quickLinks.map((item, idx) => (
          <Link key={idx} href={item.href} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
            <div className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-50 text-primary shrink-0">
              <i className="material-icons text-xl">{item.icon}</i>
            </div>
            <div>
              <span className="font-medium text-sm text-text-main block">{item.title}</span>
              <p className="text-xs text-text-muted mt-0.5 hidden sm:block">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
