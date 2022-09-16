import React from 'react';
import styles from '../../css/timePicker.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel, Pagination, FreeMode, Navigation } from 'swiper';
import 'swiper/css';

SwiperCore.use([Mousewheel, Pagination, Navigation]);

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
                direction={'vertical'}
                pagination={{ clickable: true }}
                // freeMode={true}
                modules={[FreeMode, Pagination]}
                breakpoints={{
                    768: {
                        slidesPerView: 5,
                    },
                }}>
                {mode.map((t) => {
                    return (
                        <div key={unit + t} ref={`${unit}${t}`}>
                            {time[unit] === t ? (
                                <SwiperSlide key={unit + t} className={`${styles.hour} ${styles.selected}`}>
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
