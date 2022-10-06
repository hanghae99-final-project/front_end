/**
 * second를 넣으면 00시간 00분 형태로 변환시켜 주는 함수
 * @param {number} second
 * @returns 00시간 00분
 */
export const changeSecondToTime = second => {
  const hour = parseInt(second / 3600);
  const minutes = parseInt((second % 3600) / 60);
  return `${hour}시간 ${minutes}분`;
};
