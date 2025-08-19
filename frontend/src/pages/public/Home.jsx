import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import Searchbar from "../../components/Searchbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Learn from "./Learn";
import Play from "./Play";
import Shop from "./Shop";
import { sports } from "../../cluster/sportsData";
import SportsCard from "./SportsCard";
import Footer from "./Footer";

const Home = () => {
  const playRef = useRef();
  const learnRef = useRef();
  const shopRef = useRef();
  const [activeTab, setActiveTab] = useState("")

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


  const slides = [
    { id: 1, img: "https://images.unsplash.com/photo-1430232324554-8f4aebd06683?q=80&w=1632&auto=format&fit=crop", title: "" },
    { id: 2, img: "https://images.unsplash.com/photo-1625401586060-f12be3d7cc57?q=80&w=1170&auto=format&fit=crop", title: "" },
    { id: 3, img: "https://images.unsplash.com/photo-1646140715711-d118585579b0?q=80&w=1170&auto=format&fit=crop", title: "" },
    { id: 4, img: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=1638&auto=format&fit=crop", title: "" },
  ];

  return (
    <div className="relative h-screen">
      {/* Fixed background carousel (stays as page background) */}
      <div className="fixed inset-0 -z-10">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="w-full h-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="w-full h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.img})` }}
              >
              {<div className="w-full h-full bg-black/50 flex items-center justify-center">
                  <h2 className="text-white text-3xl md:text-5xl font-bold">
                    {slide.title}
                  </h2>
                </div>}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Sticky navbar */}
      {/* <div className="sticky top-2 z-50"> */}
        <Navbar scroller={[scrollToPlay, scrollToLearn, scrollToShop]} activeTab={activeTab} />
      {/* </div> */}

      {/* Searchbar overlay:
          - At top-right when scrolled
          - Centered over banner when at top */}
      {/* <div
        className={`z-40 transition-all duration-700 ease-in-out
          ${scrolled
            ? "fixed top-16 right-4 w-full max-w-sm translate-x-0"
            : "absolute top-[25%] left-1/2 -translate-x-1/2 w-full max-w-3xl"
          }`}
      >
        <Searchbar compact={scrolled} />
      </div> */}

      <div className="w-full h-full flex flex-col items-center justify-center mt-20 mb-12">
          <Searchbar />
          <>
            <p className="mt-6 text-lg md:text-2xl font-semibold text-white drop-shadow-lg text-center">
              Discover, Book & Play - Your Ultimate Sports Companion App
            </p>
            <p className="mt-2 text-sm md:text-base text-gray-200 max-w-xl mx-auto text-center">
              From booking turfs to learning from professional coaches,
              <span className="text-[#00df9a] font-medium"> PlayLearn </span> connects players, coaches, and ground owners seamlessly.
            </p>
          </>
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
  );
};

export default Home;
