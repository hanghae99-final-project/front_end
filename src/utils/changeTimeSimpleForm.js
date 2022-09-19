/**
 * second를 넣으면 00:00:00 형태로 변환시켜 주는 함수
 * @param {number} second
 * @param {string} className styles.className으로 전달
 * @returns <span className={styles.thisClassName}>00:00</span>
 */
const changeTimeSimpleForm = (second, thisClassName) => {
    const hour = parseInt(second / 3600);
    const minutes = parseInt((second % 3600) / 60);
    return (
        <>
            <span className={`${thisClassName}`}>
                {`${hour < 10 ? `0${hour}` : `${hour}`}시간 ${minutes < 10 ? `0${minutes}` : `${minutes}`}분`}
            </span>
        </>
    );
};

export default changeTimeSimpleForm;
