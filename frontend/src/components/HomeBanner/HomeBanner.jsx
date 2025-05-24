import React from "react";
import "./styles/HomeBanner.style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import banner1 from "../../assets/Banner1.png";
import banner2 from "../../assets/Banner2.png";
import banner3 from "../../assets/Banner3.png";
import { Link } from "react-router";

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
          <Link to={"/books/362922298"}>
            <img src={banner1} />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={"/books/361141292"}>
            <img src={banner2} />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={"/books/362863268"}>
            <img src={banner3} />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeBanner;
