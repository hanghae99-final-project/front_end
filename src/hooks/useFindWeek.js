import dayjs from "dayjs";
import { useState } from "react";

/**
 *
 * @returns 해당 week의 월요일과 일요일을 가져오는 hook
 */
const useFindWeek = () => {
  const now = dayjs();
  const monday = now.startOf("week");
  const sunday = now.endOf("week");
  const [move, setMove] = useState(0);

  const findDay = day => {
    return (
      "20" +
      day
        .add(1, "day")
        .add(now.get("day") === 0 ? move - 1 : move, "week")
        .format("YY-MM-DD")
    );
  };

  return [findDay(monday), findDay(sunday), setMove];
};

export default useFindWeek;
