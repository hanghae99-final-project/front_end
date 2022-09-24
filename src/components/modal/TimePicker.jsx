import React from "react";
import styles from "./timePicker.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Navigation } from "swiper";
import "swiper/css";

SwiperCore.use([Mousewheel, Navigation]);

const TimePicker = ({ time, setTime, mode, unit }) => {
    return (
        <div className={styles.hourBox}>
            <Swiper
                onSlideChange={(swiper) => {
                    setTime({ ...time, [unit]: swiper.activeIndex });
                }}
                className='mySwiper'
                spaceBetween={10}
                slidesPerView={5}
                scrollbar={{ draggable: true }}
                navigation={true}
                centeredSlides={true}
                mousewheel={true}
                direction={"vertical"}
                pagination={{ clickable: true }}
                loop={true}
                // freeMode={true}
                breakpoints={{
                    768: {
                        slidesPerView: 5,
                    },
                }}>
                {mode.map((t) => {
                    return (
                        <div key={unit + t} ref={`${unit}${t}`}>
                            {time[unit] === t ? (
                                <SwiperSlide key={unit + t} className={`${styles.hour} ${styles.selected}`} style={{ width: "70px" }}>
                                    {t}
                                </SwiperSlide>
                            ) : (
                                <SwiperSlide key={unit + t} className={styles.hour}>
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
