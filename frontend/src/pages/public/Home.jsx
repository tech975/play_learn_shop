import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Searchbar from "../../components/Searchbar";
import { sports } from "../../cluster/sportsData";
import SportsCard from "./SportsCard";
import Footer from "./Footer";
import HeroSlider from "./HeroSlider";
import ModalForm from "../../components/ModalForm";
import SportsModal from "../../components/SportsModal";
import VenueCard from "../../components/VenueCard";
import CoachCard from "../../components/CoachCard";
import LoadingCard from "../../components/LoadingCard";
import { fetchVenues } from "../../features/venues/venueSlice";
import { fetchCoaches } from "../../features/coach/coachBookingSlice";
import EquipmentCard from "../../components/EquipmentCard";
import { sportsEquipment } from "../../cluster/equipmentData";
// import ScrollToTop from "../../components/ScrollToTop";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Refs for scrolling
  const playRef = useRef();
  const learnRef = useRef();
  const shopRef = useRef();

  const [ownerModalOpen, setOwnerModalOpen] = useState(false);
  const [sportsModalOpen, setSportsModalOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState("");
  const [pageLoaded, setPageLoaded] = useState(false);

  const loginUser = useSelector((state) => state.auth.user);
  const {
    venues,
    loading: venuesLoading,
    error: venuesError,
  } = useSelector((state) => state.venues);

  const {
    coaches,
    loading: coachesLoading,
    error: coachesError,
  } = useSelector((state) => state.coaches);

  // Fetch venues and coaches on component mount
  useEffect(() => {
    dispatch(fetchVenues({}));
    dispatch(fetchCoaches({}));

    // Set page as loaded after a short delay for smooth animations
    const timer = setTimeout(() => setPageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [dispatch]);

  // Scroll functions for navbar
  const scrollToPlay = () => {
    const yOffset = -100;
    const y =
      playRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const scrollToLearn = () => {
    const yOffset = -100;
    const y =
      learnRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const scrollToShop = () => {
    const yOffset = -100;
    const y =
      shopRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleSportClick = (sport) => {
    setSelectedSport(sport.name);
    setSportsModalOpen(true);
  };

  const handleVenueClick = (venue) => {
    if (!loginUser) {
      navigate("/login", {
        state: { nextRoute: `/user/bookings/turf/${venue._id}` },
      });
    } else {
      navigate(`/user/bookings/turf/${venue._id}`);
    }
  };

  const handleCoachClick = (coach) => {
    if (!loginUser) {
      navigate("/login", {
        state: { nextRoute: `/user/bookings/coach/${coach._id}` },
      });
    } else {
      navigate(`/user/bookings/coach/${coach._id}`);
    }
  };

  const handleViewAllVenues = () => {
    if (!loginUser) {
      navigate("/login", { state: { nextRoute: "/user/bookings/turf" } });
    } else {
      navigate("/user/bookings/turf");
    }
  };

  const handleViewAllCoaches = () => {
    if (!loginUser) {
      navigate("/login", { state: { nextRoute: "/user/bookings/coach" } });
    } else {
      navigate("/user/bookings/coach");
    }
  };

  return (
    <>
      {/* Hero Section with Background */}
      <div className="relative min-h-screen overflow-hidden">
        <HeroSlider />
        <Navbar scroller={[scrollToPlay, scrollToLearn, scrollToShop]} />

        {/* Hero Content */}
        <div className="relative z-20 w-full h-screen flex flex-col items-center justify-center px-4">
          <div
            className={`w-full sm:w-[60%] flex justify-center items-center mb-8 transition-all duration-1000 ${
              pageLoaded ? "animate-fade-in-up" : "opacity-0 translate-y-8"
            }`}
          >
            <Searchbar />
          </div>

          <div
            className={`text-center mb-8 transition-all duration-1000 delay-200 ${
              pageLoaded ? "animate-fade-in-up" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-6 leading-tight">
              Discover, Book & Play
            </h1>
            <p className="text-xl md:text-2xl text-[#00df9a] font-semibold mb-4">
              Your Ultimate Sports Companion Platform
            </p>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              From booking turfs to learning from professional coaches,
              <span className="text-[#00df9a] font-medium"> Colab Sports </span>
              connects players, coaches, and ground owners seamlessly.
            </p>
          </div>

          {/* {loginUser && (
            <div className={`transition-all duration-1000 delay-500 ${pageLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
              <button
                onClick={() => setOwnerModalOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-[#00df9a] to-[#00b87d] text-black font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg"
              >
                Become an Owner
              </button>
            </div>
          )} */}
        </div>
      </div>

      {/* Sports Categories Section */}
      <div className="relative z-30 bg-gradient-to-b from-black/90 via-gray-900 to-gray-800 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Explore Multiple Sports
          </h2>
          <p className="text-gray-300 text-lg text-center mb-12 max-w-2xl mx-auto">
            Choose your favorite sport and discover amazing venues and expert
            coaches
          </p>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {sports.map((sport) => (
              <SportsCard
                key={sport.id}
                {...sport}
                onClick={() => handleSportClick(sport)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Venues Section */}
      <div ref={playRef} className="bg-gray-900 py-20 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Popular Venues
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
              Discover top-rated sports venues near you for the perfect game
              experience
            </p>
            <button
              onClick={handleViewAllVenues}
              className="px-8 py-3 bg-[#00df9a] text-black font-semibold rounded-xl shadow-lg hover:bg-[#00b87d] transition duration-300"
            >
              View All Venues
            </button>
          </div>

          {venuesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <LoadingCard key={i} className="h-80" />
              ))}
            </div>
          ) : venuesError ? (
            <div className="text-center py-12">
              <p className="text-red-400 text-lg">Failed to load venues</p>
              <button
                onClick={() => dispatch(fetchVenues({}))}
                className="mt-4 px-6 py-2 bg-[#00df9a] text-black rounded-lg hover:bg-[#00b87d] transition"
              >
                Try Again
              </button>
            </div>
          ) : venues.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No venues available at the moment
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues.slice(0, 3).map((venue) => (
                <VenueCard
                  key={venue._id}
                  venue={venue}
                  onClick={() => handleVenueClick(venue)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Coaches Section */}
      <div ref={learnRef} className="bg-gray-800 py-20 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Expert Coaches
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
              Learn from certified professional coaches and take your game to
              the next level
            </p>
            <button
              onClick={handleViewAllCoaches}
              className="px-8 py-3 bg-[#00df9a] text-black font-semibold rounded-xl shadow-lg hover:bg-[#00b87d] transition duration-300"
            >
              View All Coaches
            </button>
          </div>

          {coachesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <LoadingCard key={i} className="h-80" />
              ))}
            </div>
          ) : coachesError ? (
            <div className="text-center py-12">
              <p className="text-red-400 text-lg">Failed to load coaches</p>
              <button
                onClick={() => dispatch(fetchCoaches({}))}
                className="mt-4 px-6 py-2 bg-[#00df9a] text-black rounded-lg hover:bg-[#00b87d] transition"
              >
                Try Again
              </button>
            </div>
          ) : coaches.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No coaches available at the moment
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coaches.slice(0, 3).map((coach) => (
                <CoachCard
                  key={coach._id}
                  coach={coach}
                  onClick={() => handleCoachClick(coach)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Shop Section */}
      <div
        ref={shopRef}
        className="bg-gradient-to-b from-gray-800 to-gray-700 py-20 scroll-mt-24"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🛒 Sports Equipment Store
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-4">
              Get the best sports equipment from top brands at unbeatable prices
            </p>
            <p className="text-[#00df9a] font-semibold">
              Powered by Colab Sports - Your trusted sports partner
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sportsEquipment.slice(0, 8).map((equipment) => (
              <EquipmentCard
                key={equipment.id}
                equipment={equipment}
                onClick={() => {
                  // Redirect to external website
                  window.open("https://colabsports.in/", "_blank");
                }}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => window.open("https://colabsports.in/", "_blank")}
              className="px-8 py-3 bg-[#00df9a] text-black font-semibold rounded-xl shadow-lg hover:bg-[#00b87d] transition duration-300"
            >
              View All Products
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Join Our Community
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Whether you're a coach looking to expand your reach or a venue owner wanting to maximize bookings, we have the perfect solution for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Coach Section */}
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🏃‍♂️</div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  For Coaches
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Share your expertise, grow your student base, and build a successful coaching career with our platform.
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-200">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>Access to thousands of potential students</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>Easy scheduling and booking management</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>Secure payments and instant withdrawals</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>Build your reputation with reviews</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/coach-landing')}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Join as a Coach
              </button>
            </div>

            {/* Owner Section */}
            <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🏟️</div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  For Venue Owners
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  List your sports venue, reach more customers, and maximize your revenue with our booking platform.
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-200">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>24/7 automated booking system</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>Reach thousands of sports enthusiasts</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>Easy venue and schedule management</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>Transparent pricing and payments</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/owner-landing')}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                List Your Ground
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-b from-gray-700 to-black py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Join thousands of satisfied users who trust Colab Sports for their
              sports needs
            </p>
          </div>

          {/* Testimonials Slider */}
          <div className="relative overflow-hidden rounded-2xl">
            <div className="flex space-x-6 animate-slide hover:animation-play-state-paused">
              {[
                {
                  name: "Rahul Sharma",
                  role: "Football Player",
                  text: "Amazing platform! Found the perfect turf for our weekend matches. The booking process is seamless.",
                  rating: 5,
                  avatar:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                },
                {
                  name: "Priya Patel",
                  role: "Tennis Enthusiast",
                  text: "The coaches here are incredible. My game has improved significantly in just 3 months!",
                  rating: 5,
                  avatar:
                    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
                },
                {
                  name: "Arjun Singh",
                  role: "Cricket Captain",
                  text: "Easy booking, great venues, and excellent customer service. Highly recommended!",
                  rating: 5,
                  avatar:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                },
                {
                  name: "Sneha Reddy",
                  role: "Badminton Player",
                  text: "Love the variety of coaches available. Found an amazing badminton coach nearby!",
                  rating: 5,
                  avatar:
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                },
                {
                  name: "Vikram Kumar",
                  role: "Basketball Coach",
                  text: "As a coach, this platform has helped me connect with so many passionate players.",
                  rating: 5,
                  avatar:
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-72 sm:w-80 bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white border border-white/20"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-200 mb-6 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <p className="font-semibold text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Scroll to Top Button */}
      {/* <ScrollToTop /> */}

      {/* Modals */}
      <ModalForm
        open={ownerModalOpen}
        onClose={() => setOwnerModalOpen(false)}
      />
      <SportsModal
        isOpen={sportsModalOpen}
        onClose={() => setSportsModalOpen(false)}
        selectedSport={selectedSport}
      />
    </>
  );
};

export default Home;
