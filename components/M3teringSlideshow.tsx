import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

function M3teringSlideshow() {
  return (
    <div className="relative h-64 w-full">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper h-full"
      >
        <SwiperSlide className="flex items-center justify-center text-green-600 text-2xl">
          Slide 1
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center text-green-600 text-2xl">
          Slide 2
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center text-green-600 text-2xl">
          Slide 3
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center text-green-600 text-2xl">
          Slide 4
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default M3teringSlideshow;
