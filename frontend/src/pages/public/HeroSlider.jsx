import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const HeroSlider = () => {
  const slides = [
    { id: 1, img: "https://images.unsplash.com/photo-1430232324554-8f4aebd06683?q=80&w=1632&auto=format&fit=crop", title: "" },
    { id: 2, img: "https://images.unsplash.com/photo-1625401586060-f12be3d7cc57?q=80&w=1170&auto=format&fit=crop", title: "" },
    { id: 3, img: "https://images.unsplash.com/photo-1646140715711-d118585579b0?q=80&w=1170&auto=format&fit=crop", title: "" },
    { id: 4, img: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=1638&auto=format&fit=crop", title: "" },
  ];

  return (
    <div className="fixed inset-0 -z-10">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="w-full h-full"
        speed={2000}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-screen bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="w-full h-full bg-black/50 flex items-center justify-center">
                <h2 className="text-white text-3xl md:text-5xl font-bold">
                  {slide.title}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
