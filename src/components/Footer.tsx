import Link from "next/link";
import { footerLinks } from "@/data/products";

export default function Footer() {
  return (
    <footer className="bg-dark-1 text-gray-400 mt-10 pt-10">
      <div className="max-w-[1300px] mx-auto px-4 w-full">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[280px_1fr_280px] gap-8 pb-8">
          
          {/* Support Column */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Support</h4>
            <a href="tel:16793" className="flex items-center gap-3 p-3.5 bg-dark-2 hover:bg-neutral-800 rounded-lg mb-3 transition-colors">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white shrink-0">
                <i className="material-icons text-xl">phone</i>
              </div>
              <div>
                <p className="text-[11px] text-text-muted leading-tight">9 AM - 8 PM</p>
                <h5 className="text-base text-white font-semibold">16793</h5>
              </div>
            </a>
            <Link href="/information/contact" className="flex items-center gap-3 p-3.5 bg-dark-2 hover:bg-neutral-800 rounded-lg transition-colors">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white shrink-0">
                <i className="material-icons text-xl">place</i>
              </div>
              <div>
                <p className="text-[11px] text-text-muted leading-tight">Store Locator</p>
                <h5 className="text-base text-white font-semibold">Find Our Stores</h5>
              </div>
            </Link>
          </div>

          {/* About Us Column */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">About Us</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {footerLinks.aboutUs.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-[13px] text-gray-400 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Connected Column */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Stay Connected</h4>
            <p className="text-[13px] leading-relaxed mb-3">
              <strong className="text-white">Star Tech Ltd</strong>
              <br />
              Head Office: 28 Kazi Nazrul Islam Ave, Navana Zohura Square, Dhaka 1000
            </p>
            <p className="text-[13px]">
              <strong className="text-white">Email:</strong>
              <br />
              <a href="mailto:webteam@startechbd.com" className="text-primary hover:underline">
                webteam@startechbd.com
              </a>
            </p>
          </div>
        </div>

        {/* Social & App Links Footer */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 py-5 border-y border-neutral-800">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-[13px] text-gray-400">Experience Star Tech App on your mobile:</span>
            <div className="flex gap-3">
              <a
                className="flex items-center gap-2 bg-dark-2 hover:bg-neutral-800 px-4 py-2 rounded-sm transition-colors"
                href="https://play.google.com/store/apps/details?id=com.startech.shop"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="material-icons text-xl text-white">shop</i>
                <span>
                  <span className="text-[10px] text-gray-400 block leading-none">Download on</span>
                  <span className="text-sm text-white font-medium block leading-tight">Google Play</span>
                </span>
              </a>
              <a
                className="flex items-center gap-2 bg-dark-2 hover:bg-neutral-800 px-4 py-2 rounded-sm transition-colors"
                href="https://apps.apple.com/app/id6443544088"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="material-icons text-xl text-white">apple</i>
                <span>
                  <span className="text-[10px] text-gray-400 block leading-none">Download on</span>
                  <span className="text-sm text-white font-medium block leading-tight">App Store</span>
                </span>
              </a>
            </div>
          </div>
          
          <div className="flex gap-2.5">
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-dark-2 text-gray-400 hover:bg-primary hover:text-white transition-colors"
              title="WhatsApp"
            >
              <i className="material-icons text-xl">chat</i>
            </a>
            <a
              href="https://www.facebook.com/star.tech.ltd/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-dark-2 text-gray-400 hover:bg-primary hover:text-white transition-colors"
              title="Facebook"
            >
              <i className="material-icons text-xl">thumb_up</i>
            </a>
            <a
              href="https://www.youtube.com/@StarTechLtd"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-dark-2 text-gray-400 hover:bg-primary hover:text-white transition-colors"
              title="YouTube"
            >
              <i className="material-icons text-xl">play_circle</i>
            </a>
            <a
              href="https://www.instagram.com/startech.com.bd/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-dark-2 text-gray-400 hover:bg-primary hover:text-white transition-colors"
              title="Instagram"
            >
              <i className="material-icons text-xl">camera_alt</i>
            </a>
          </div>
        </div>

        {/* Sub Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-600 py-5 gap-2">
          <p>© 2026 Star Tech Ltd | All rights reserved</p>
          <p>Powered By: Star Tech</p>
        </div>
      </div>
    </footer>
  );
}
