import Searchbar from "../../components/Searchbar";
import Cards from "../../components/Cards"; // Agar tum generic card use karte ho

const Play = ({ ref }) => {

  const turfs = [
    { id: 1, name: "Greenfield Arena", owner: "Vikram Singh", rating: 4.8, price: "₹1200/hr", location: "Mumbai, India", img: "https://images.unsplash.com/photo-1503515091255-ab8063a1796d?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, name: "Elite Turf", owner: "Kavya Reddy", rating: 4.6, price: "₹900/hr", location: "Bangalore, India", img: "https://images.unsplash.com/photo-1610684082661-5d4763eecb39?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D " },
    { id: 3, name: "Royal Sports Club", owner: "Sahil Kapoor", rating: 4.9, price: "₹1500/hr", location: "Delhi, India", img: "https://images.unsplash.com/photo-1661587535658-50048b8ec242?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", },
    { id: 4, name: "Elite Turf", owner: "Kavya Reddy", rating: 4.6, price: "₹900/hr", location: "Bangalore, India", img: "https://images.unsplash.com/photo-1610684082661-5d4763eecb39?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D " },
  ];

  return (
    <div ref={ref} className="relative z-30 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 pb-20">
        
        {/* Section Title */}
        <h2 className="text-6xl font-bold text-white mb-10 text-center drop-shadow-lg">
          Play Module
        </h2>

        {/* Features (headings only) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12 text-center">
          <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 hover:bg-black/50 transition duration-300">
            <h3 className="text-lg font-semibold text-white">⚡ Instant Booking</h3>
          </div>
          <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 hover:bg-black/50 transition duration-300">
            <h3 className="text-lg font-semibold text-white">⭐ Top Rated Turfs</h3>
          </div>
          <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 hover:bg-black/50 transition duration-300">
            <h3 className="text-lg font-semibold text-white">💳 Easy Payments</h3>
          </div>
          <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 hover:bg-black/50 transition duration-300">
            <h3 className="text-lg font-semibold text-white">👥 Connect with Players</h3>
          </div>
          <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 hover:bg-black/50 transition duration-300">
            <h3 className="text-lg font-semibold text-white">🎯 Match Scheduling</h3>
          </div>
          <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 hover:bg-black/50 transition duration-300">
            <h3 className="text-lg font-semibold text-white">🏆 Tournaments & Events</h3>
          </div>
        </div>

        {/* Cards Section */}
        <div className="w-full sm:flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">
              Turfs near by you
            </h3>
          </div>
          <div className="mb-5">
            <Searchbar width={'2xl'} customIcon={true} placeholder={'Search grounds...'} />
          </div>
        </div>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible">
          {turfs.map((turf) => (
            <Cards key={turf.id} {...turf} module={'play'} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Play;
