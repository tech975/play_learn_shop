import { useNavigate } from "react-router-dom";

const Cards = ({ img, name, owner, rating, price, location, module }) => {
  const navigate = useNavigate();
  const turfId = 1;

  const handleClick = () => {
    if (module === "play") {
      navigate("/login", { state: { from: `/bookings/turf/${turfId}` } });
    } else if (module === "learn") {
      navigate("/login", { state: { from: `/bookings/coach/${turfId}` } });
    } else if (module === "shop") {
      console.log("Shop module clicked");
    }
  };

  return (
    <div className="min-w-[320px] sm:min-w-[250px] bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 duration-300">
      <img src={img} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        {owner && <p className="text-sm text-gray-500">Owner: {owner}</p>}
        {rating && <p className="text-yellow-500 font-medium">⭐ {rating}</p>}
        {location && <p className="text-gray-700 mt-2">{location}</p>}
        {price && <p className="text-green-600 font-bold mt-1">{price}</p>}

        {module !== "shop" && (
          <button
            className="mt-4 w-full py-2 bg-[#00df9a] text-black font-semibold rounded-lg hover:bg-[#00b87d]"
            onClick={handleClick}
          >
            Book Now
          </button>
        )}
      </div>
    </div>
  );
};

export default Cards;
