import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import Searchbar from "../../components/Searchbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useSelector } from 'react-redux';
import "swiper/css";
import Learn from "./Learn";
import Play from "./Play";
import Shop from "./Shop";
import { sports } from "../../cluster/sportsData";
import SportsCard from "./SportsCard";
import Footer from "./Footer";
import HeroSlider from "./HeroSlider";
import ModalForm from "../../components/ModalForm";

const Home = () => {
  const playRef = useRef();
  const learnRef = useRef();
  const shopRef = useRef();
  const [activeTab, setActiveTab] = useState("");
  const [ownerModalOpen, setOwnerModalOpen] = useState(false);

  const loginUser = useSelector((state) => state.auth.user);

  const scrollToPlay = () => {
    const yOffset = -100;
    const y = playRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const scrollToLearn = () => {
    const yOffset = -100;
    const y = learnRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" })
  }

  const scrollToShop = () => {
    const yOffset = -100;
    const y = shopRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" })
  }

  useEffect(() => {
  const handleScroll = () => {
    const playTop = playRef.current.offsetTop - 120; // navbar height
    const learnTop = learnRef.current.offsetTop - 120;
    // const shopTop = shopRef.current.offsetTop - 120;

    const scrollY = window.scrollY;

    if (scrollY >= learnTop) {
      setActiveTab("learn");
    } else if (scrollY >= playTop) {
      setActiveTab("play");
    } else {
      setActiveTab("shop")
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <>
      <div className="relative h-screen">
        <HeroSlider />

        <Navbar scroller={[scrollToPlay, scrollToLearn, scrollToShop]} activeTab={activeTab} />

        <div className="w-full h-full flex flex-col items-center justify-center mt-20 mb-12">
            <div className="w-full sm:w-[60%] flex justify-center items-center">
              <Searchbar />
            </div>
            <>
              <p className="mt-6 text-lg md:text-2xl font-semibold text-white drop-shadow-lg text-center">
                Discover, Book & Play - Your Ultimate Sports Companion App
              </p>
              <p className="mt-2 text-sm md:text-base text-gray-200 max-w-xl mx-auto text-center">
                From booking turfs to learning from professional coaches,
                <span className="text-[#00df9a] font-medium"> PlayLearn </span> connects players, coaches, and ground owners seamlessly.
              </p>
            </>

            {loginUser && (
              <button
                onClick={() => setOwnerModalOpen(true)}
                className="mt-6 px-6 py-2 bg-[#00df9a] text-black font-semibold rounded-lg shadow-md hover:bg-[#00b87d] transition duration-300"
              >
                Become an Owner
              </button>
            )}
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12 mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Explore Multiple Sports
          </h2>
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {sports.map((sport) => (
              <SportsCard key={sport.id} {...sport} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button className="px-6 py-2 bg-[#00df9a] text-black font-semibold rounded-lg shadow-md hover:bg-[#00b87d] transition duration-300">
              View More
            </button>
          </div>
        </div>

        {/* Content (scrollable) */}
        <div>
          <Play ref={playRef} />
        </div>

        <div className="">
          <Learn ref={learnRef} />
        </div>

        <div className="mt-32">
          <Shop ref={shopRef} />
        </div>

        <Footer />

      </div>

      <ModalForm open={ownerModalOpen} onClose={() => setOwnerModalOpen(false)} />
    </>
  );
};

export default Home;
