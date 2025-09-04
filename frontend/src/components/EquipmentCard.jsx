import { Star, ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";

const EquipmentCard = ({ equipment, onClick }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const discountPercentage = Math.round(((equipment.originalPrice - equipment.price) / equipment.originalPrice) * 100);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Redirect to external website
    window.open('https://colabsports.in/', '_blank');
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden group"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={equipment.image}
          alt={equipment.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discountPercentage}%
          </div>
        )}
        
        {/* Stock Status */}
        {!equipment.inStock && (
          <div className="absolute top-3 right-3 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full">
            Out of Stock
          </div>
        )}

        {/* Wishlist Button - only show if in stock */}
        {equipment.inStock && (
          <button
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
          >
            <Heart 
              size={16} 
              className={`${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'} transition-colors`}
            />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
          {equipment.brand}
        </p>

        {/* Name */}
        <h3 className="font-bold text-lg text-gray-800 line-clamp-2 mb-2">
          {equipment.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star size={14} className="text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-gray-700 ml-1">
              {equipment.rating}
            </span>
          </div>
          <span className="text-xs text-gray-500 ml-2">
            ({equipment.reviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-[#00df9a]">
              ₹{equipment.price.toLocaleString()}
            </span>
            {equipment.originalPrice > equipment.price && (
              <span className="text-sm text-gray-500 line-through">
                ₹{equipment.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!equipment.inStock}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
            equipment.inStock
              ? 'bg-[#00df9a] text-black hover:bg-[#00b87d]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          title={equipment.inStock ? 'Shop on Colab Sports' : 'Out of Stock'}
        >
          <ShoppingCart size={16} />
          <span>{equipment.inStock ? 'Shop Now' : 'Out of Stock'}</span>
        </button>
      </div>
    </div>
  );
};

export default EquipmentCard;
