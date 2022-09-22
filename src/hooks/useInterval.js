import { useEffect } from "react";

const useInterval = (run, stop, setSecond) => {
    useEffect(() => {
        let interval;
        if (run && !stop) {
            interval = setInterval(() => {
                setSecond((prev) => prev + 1);
            }, 1000);
        } else if (!run || stop) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [run, stop]);
};

export default useInterval;
