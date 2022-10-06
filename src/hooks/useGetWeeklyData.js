import { useSelector } from "react-redux";

/**
 * 빈 데이터를 채워 넣어 반환해주는 hook
 * @returns weeklyStudyData
 */
const useGetWeeklyData = () => {
  //db에 데이터가 저장된 날짜만 불러옴(9.17, 9.20)
  const weeklyData = useSelector(state => state.my.weeklyStudy);

  //불러오지 않는 날짜에 요일 채워넣기
  const addDayArray = weeklyData?.map(data => {
    return { ...data, day: new Date(data.studyDate).getDay() };
  });
  const emptyArray = [1, 2, 3, 4, 5, 6, 0];

  //저장되지 않은 날짜에 studyTime : 0 데이터 넣기
  const weeklyStudyData = emptyArray
    .map(v => {
      return addDayArray?.filter(item => item.day === v);
    })
    .map((v, i) => {
      return v?.length !== 0 ? v : i + 1 === 7 ? { studyTime: 0, day: 0 } : { studyTime: 0, day: i + 1 };
    })
    .flat();

  return weeklyStudyData;
};

export default useGetWeeklyData;
