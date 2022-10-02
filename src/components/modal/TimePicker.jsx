import React from "react";
import styles from "./timePicker.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Navigation } from "swiper";
import font from "../../common/css/font.module.css";
import "swiper/css";

SwiperCore.use([Mousewheel, Navigation]);

const TimePicker = ({ time, setTime, mode, unit }) => {
  return (
    <div className={styles.hourBox}>
      <Swiper
        onSlideChange={swiper => {
          setTime({ ...time, [unit]: swiper.activeIndex });
        }}
        className="mySwiper"
        spaceBetween={10}
        slidesPerView={5}
        scrollbar={{ draggable: true }}
        centeredSlides={true}
        mousewheel={true}
        direction={"vertical"}
      >
        {mode.map(t => {
          return (
            <div key={unit + t} ref={`${unit}${t}`}>
              {time[unit] === t ? (
                <SwiperSlide
                  key={unit + t}
                  className={`${styles.hour} ${styles.selected} ${font.subtitle2_600_16}`}
                  style={{ width: "70px" }}
                >
                  {t}
                </SwiperSlide>
              ) : (
                <SwiperSlide key={unit + t} className={`${styles.hour} ${font.subtitle2_600_16}`}>
                  {t}
                </SwiperSlide>
              )}
            </div>
          );
        })}
      </Swiper>
    </div>
  );
};

export default TimePicker;
