import Searchbar from "../../components/Searchbar";
import Cards from "../../components/Cards"; // Agar tum generic card use karte ho

const Learn = ({ ref }) => {
  const learnOptions = ["Monthly", "Quarterly", "Yearly"];

  // const coaches = [
  //   {
  //     id: 1,
  //     name: "Rahul Sharma",
  //     specialty: "Football Coach",
  //     rating: 4.9,
  //     price: "₹800/hr",
  //     location: "Mumbai, India",
  //     img: "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  //   },
  //   {
  //     id: 2,
  //     name: "Priya Desai",
  //     specialty: "Tennis Trainer",
  //     rating: 4.7,
  //     price: "₹1000/hr",
  //     location: "Bangalore, India",
  //     img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  //   },
  //   {
  //     id: 3,
  //     name: "Arjun Mehta",
  //     specialty: "Cricket Coach",
  //     rating: 5.0,
  //     price: "₹1200/hr",
  //     location: "Delhi, India",
  //     img: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  //   },
  // ];

  return (
    <div ref={ref} className="relative z-30 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 pb-10 mt-20">

        {/* Section Title */}
        <h2 className="text-6xl font-bold text-white mb-10 text-center drop-shadow-lg">
          Learn Module
        </h2>

        {/* Features */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12 text-center">
          <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 hover:bg-black/50 transition duration-300">
            <h3 className="text-lg font-semibold text-white">🎓 Expert Coaches</h3>
          </div>
          <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 hover:bg-black/50 transition duration-300">
            <h3 className="text-lg font-semibold text-white">📅 Flexible Scheduling</h3>
          </div>
          <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 hover:bg-black/50 transition duration-300">
            <h3 className="text-lg font-semibold text-white">📍 Online & Offline Sessions</h3>
          </div>
          <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 hover:bg-black/50 transition duration-300">
            <h3 className="text-lg font-semibold text-white">⭐ Verified Trainers</h3>
          </div>
          <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 hover:bg-black/50 transition duration-300">
            <h3 className="text-lg font-semibold text-white">📊 Progress Tracking</h3>
          </div>
          <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 hover:bg-black/50 transition duration-300">
            <h3 className="text-lg font-semibold text-white">🏅 Personalized Training Plans</h3>
          </div>
        </div>

        {/* Coaches Section */}
        {/* <div className="w-full sm:flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">
              Coaches available for you
            </h3>
          </div>
          <div className="mb-5">
            <Searchbar width={"2xl"} customIcon={true} placeholder={'Search coaches...'} />
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible">
          {coaches.map((coach) => (
            <Cards key={coach.id} {...coach} module={'learn'} />
          ))}
        </div> */}
        {/* ✅ Buttons Section */}
        <h3 className="text-6xl font-bold text-white mb-10 text-center drop-shadow-lg">
          Select Coaching type
        </h3>
        <div className="flex flex-wrap justify-center gap-6">
          {learnOptions.map((option, index) => (
            <button
              key={index}
              // onClick={handleClick}
              className="px-6 py-3 bg-[#00df9a] text-black font-semibold rounded-xl shadow-md hover:bg-[#00b87d] transition duration-300"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learn;
