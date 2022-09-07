import React, { useEffect, useRef, useState } from 'react';
import styles from '../../css/timePicker.module.css';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel, Pagination, FreeMode, Navigation } from 'swiper';
import 'swiper/css';

SwiperCore.use([Mousewheel, Pagination, Navigation]);

const TimePicker = ({ time, setTime, mode, unit }) => {
    console.log(time);
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
                hashNavigation={{ watchState: true }}
                centeredSlides={true}
                freeMode={true}
                mousewheel={true}
                direction={'vertical'}
                pagination={{ clickable: true }}
                modules={[FreeMode, Pagination]}
                breakpoints={{
                    768: {
                        slidesPerView: 5,
                    },
                }}>
                {mode.map((t) => {
                    return (
                        <>
                            {time[unit] === t ? (
                                <SwiperSlide
                                    style={{ backgroundColor: 'white', height: '12px', width: '50px' }}
                                    key={unit + t}
                                    className={styles.hour}>
                                    {t}
                                </SwiperSlide>
                            ) : (
                                <SwiperSlide style={{ height: '12px', width: '50px' }} key={unit + t} className={styles.hour}>
                                    {t}
                                </SwiperSlide>
                            )}
                        </>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default TimePicker;
