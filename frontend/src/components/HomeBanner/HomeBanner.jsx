import React from "react";
import "./styles/HomeBanner.style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import banner1 from "../../assets/Sample-Banner1.png";
import banner2 from "../../assets/Sample-Banner2.png";
import banner3 from "../../assets/Sample-Banner3.png";

const HomeBanner = () => {
  return (
    <div className="home-banner-container">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <img src={banner1} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner3} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeBanner;
