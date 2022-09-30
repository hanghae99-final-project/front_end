import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getDday } from "../../app/slice/DdaySlice";
import styles from "./mainDday.module.css";
import font from "../../common/css/font.module.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Navigation, Autoplay } from "swiper";
import "swiper/css";

SwiperCore.use([Mousewheel, Navigation, Autoplay]);

const MainDday = () => {
  const dispatch = useDispatch();
  const dDay = useSelector(state => state.dDay?.myDday);
  const today = new Date();

  useEffect(() => {
    dispatch(__getDday());
  }, []);

  return (
    <div className={styles.dayBox}>
      <Swiper
        className="d-day"
        slidesPerView={1}
        centeredSlides={true}
        direction={"vertical"}
        loop={true}
        autoplay={dDay.length > 1 ? { delay: 5000 } : false}
        speed={1500}
      >
        {dDay.length === 0 ? (
          <SwiperSlide>
            <Link to="/dday">
              <span className={`${styles.text} ${font.subtitle3_300_14}`}>디데이를 추가해 보세요</span>
            </Link>
          </SwiperSlide>
        ) : (
          <>
            {dDay.map(target => {
              const targetDay = new Date(target.deadline);
              const remainDay = Math.ceil((targetDay - today) / 1000 / 3600 / 24);

              return (
                <SwiperSlide key={target._id}>
                  <div className={styles.daySlide}>
                    <span className={`${styles.day} ${font.subtitle3_600_14}`}>
                      D{remainDay === 0 ? "-day" : remainDay > 0 ? "-" + remainDay : "+" + remainDay * -1}
                    </span>
                    <span className={`${styles.text} ${font.subtitle3_300_14}`}>{target.content}</span>
                  </div>
                </SwiperSlide>
              );
            })}
          </>
        )}
      </Swiper>
    </div>
  );
};

export default MainDday;
