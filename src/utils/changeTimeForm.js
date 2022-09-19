/**
 * second를 넣으면 00:00:00 형태로 변환시켜 주는 함수
 * @param {number} second
 * @param {string} className styles.className으로 전달
 * @returns <span className={styles.thisClassName}>00:00:00</span>
 */
const changeTimeForm = (second, thisClassName) => {
    const hour = parseInt(second / 3600);
    const minutes = parseInt((second % 3600) / 60);
    const seconds = second % 60;
    return (
        <>
            <span className={`${thisClassName}`}>
                {hour < 10 ? `0${hour}` : `${hour}`}:{minutes < 10 ? `0${minutes}` : `${minutes}`}:
                {seconds < 10 ? `0${seconds}` : `${seconds}`}
            </span>
        </>
    );
};

export default changeTimeForm;
