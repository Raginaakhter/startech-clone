"use client";
import Link from "next/link";
import { navigationData } from "@/data/navigation";

export default function Navigation() {
  return (
    <nav className="bg-white sticky top-[70px] z-40 border-b border-gray-200" id="main-nav">
      <div className="max-w-[1300px] mx-auto px-4 w-full">
        <ul className="flex items-center flex-wrap">
          {navigationData.map((item, idx) => (
            <li key={idx} className="relative group shrink-0">
              <Link 
                className="block px-3.5 py-3 text-black text-[13px] font-normal hover:bg-primary hover:text-white transition-all whitespace-nowrap" 
                href={item.href}
              >
                {item.name}
              </Link>
              {item.children && (
                <ul className="absolute top-full left-0 bg-white min-w-[220px] shadow-lg rounded-b opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-50">
                  {item.children.map((child, cIdx) => (
                    <li key={cIdx} className="relative group/sub">
                      <Link 
                        className="block px-4 py-2 text-text-main text-[13px] hover:bg-primary hover:text-white border-b border-gray-50 transition-colors flex items-center justify-between" 
                        href={child.href}
                      >
                        <span>{child.name}</span>
                        {child.children && (
                          <i className="material-icons text-base">chevron_right</i>
                        )}
                      </Link>
                      {child.children && (
                        <ul className="absolute left-full top-0 bg-white min-w-[220px] shadow-lg rounded-r opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible translate-x-1 group-hover/sub:translate-x-0 transition-all duration-200 z-50">
                          {child.children.map((sub, sIdx) => (
                            <li key={sIdx}>
                              <Link 
                                className="block px-4 py-2 text-text-main text-[13px] hover:bg-primary hover:text-white border-b border-gray-50 transition-colors" 
                                href={sub.href}
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                  <li>
                    <Link 
                      href={item.href} 
                      className="block p-2.5 text-primary font-medium text-[13px] border-t border-gray-100 text-center bg-body-bg hover:bg-primary hover:text-white transition-colors"
                    >
                      Show All {item.name}
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
