import React from "react";
import { Search } from "lucide-react";

const Searchbar = ({ customIcon = false, width, placeholder }) => {
  return (
    <div className={`w-full max-w-${width || '3xl'} px-4`}>
      {/* Search input */}
      <div className="flex items-center bg-white/20 backdrop-blur-md border border-gray-300/30 rounded-full shadow-lg overflow-hidden">
        <input
          type="text"
        //   placeholder="Search grounds, coaches, shops..."
          placeholder={`${!customIcon ? 'Search grounds, coaches, shops....' : placeholder}`}
          className="flex-grow px-4 py-2 bg-transparent text-white placeholder-gray-200 focus:outline-none"
        />
        {
          customIcon ? (
            <button
              className=" font-semibold px-6 py-2 rounded-full transition text-white"
            >
              <Search />
            </button>
          ) : (
            <button
              className="bg-[#00df9a] text-black font-semibold px-6 py-2 rounded-full hover:bg-[#00b87a] transition"
            >
              Search
            </button>
          )
        }
      </div>
    </div>
  );
};

export default Searchbar;
