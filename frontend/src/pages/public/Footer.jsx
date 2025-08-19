import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-10 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        
        {/* Brand / Logo */}
        <div>
          <h2 className="text-2xl font-bold text-[#00df9a]">REACT.</h2>
          <p className="mt-3 text-sm">
            Play, Learn, and Shop with the best sports platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#00df9a] cursor-pointer">Play</li>
            <li className="hover:text-[#00df9a] cursor-pointer">Learn</li>
            <li className="hover:text-[#00df9a] cursor-pointer">Shop</li>
            <li className="hover:text-[#00df9a] cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <p className="text-sm">📍 Mumbai, India</p>
          <p className="text-sm">📞 +91 98765 43210</p>
          <p className="text-sm flex items-center gap-2 mt-1">
            <Mail size={16} /> support@sportsapp.com
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <Facebook className="cursor-pointer hover:text-[#00df9a]" />
            <Instagram className="cursor-pointer hover:text-[#00df9a]" />
            <Twitter className="cursor-pointer hover:text-[#00df9a]" />
            <Youtube className="cursor-pointer hover:text-[#00df9a]" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        © {new Date().getFullYear()} SportsApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
