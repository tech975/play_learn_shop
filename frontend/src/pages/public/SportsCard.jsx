const SportsCard = ({ name, img }) => {

  return (
    <div className="bg-white rounded-xl shadow-md hover:scale-105 duration-300 cursor-pointer">
      <img
        src={img}
        alt={name}
        className="w-full h-32 object-cover rounded-t-xl"
      />
      <div className="p-2 text-center">
        <h3 className="text-md font-semibold text-gray-700">{name}</h3>
      </div>
    </div>
  );
};

export default SportsCard;
