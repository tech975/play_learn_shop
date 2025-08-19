import React from "react";
import { Clock } from "lucide-react";

const ComingSoon = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-r from-gray-900 to-black text-white text-center px-6">
      {/* Icon */}
      <Clock size={64} className="text-[#00df9a] mb-6 animate-pulse" />

      {/* Heading */}
      <h1 className="text-5xl font-bold mb-4">Coming Soon 🚀</h1>

      {/* Description */}
      <p className="text-lg text-gray-300 max-w-xl mb-8">
        We're working hard to bring you something awesome. Stay tuned for
        updates and get notified when we launch!
      </p>

      {/* Notify Form */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 rounded-lg text-black outline-none w-72"
        />
        <button className="px-6 py-2 bg-[#00df9a] text-black font-semibold rounded-lg hover:bg-[#00b87d] transition">
          Notify Me
        </button>
      </div>

      {/* Footer */}
      <p className="text-sm text-gray-500 mt-10">
        © {new Date().getFullYear()} YourApp. All rights reserved.
      </p>
    </div>
  );
};

export default ComingSoon;
