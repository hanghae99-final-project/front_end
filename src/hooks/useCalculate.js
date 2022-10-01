import { useEffect } from "react";

/**
 * 공부 중, 휴식 중일 때 각각에 맞는 시간을 설정하는 함수
 * 저장된 시간(0 또는 공부한 시간) + ( 현재 시간 - (다시) 시작한 시간 )
 * @param {*} savedTime : 저장된 시간
 * @param {*} startTime : 시작한 시간
 * @param {*} setSecond : 설정할 시간
 * @param {*} setRun : 자동 시작
 */
const useCalculate = (savedTime, startTime, setSecond, setRun) => {
  const date = new Date().getTime();
  let time = savedTime + date - startTime;
  useEffect(() => {
    if (startTime === 0) {
      setSecond(Math.floor(savedTime / 1000));
    } else {
      setSecond(Math.floor(time / 1000));
      setRun && setRun(true);
    }
  }, [savedTime, startTime]);
};

export default useCalculate;
