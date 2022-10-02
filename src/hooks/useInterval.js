import { useEffect } from "react";

const useInterval = (run, stop, setSecond, type) => {
  useEffect(() => {
    let interval;
    if (run && !stop) {
      interval = setInterval(() => {
        setSecond(prev => prev + 1);
      }, 1000);
    } else if (!run || (type ? !stop : stop)) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [run, stop]);
};

export default useInterval;
