import React from 'react';
import styles from './join.module.css';
import arrowBtn2 from '../../common/svg/arrowback_icon2.svg';
import check from '../../common/svg/check_icon.svg';

const Age = ({ setMode, setUserInfo, userInfo }) => {
    const pickAge = ['20대', '30대', '기타'];
    return (
        <div className={styles.layout}>
            <div className={styles.container}>
                <button className={styles.arrowBack} onClick={() => setMode('nickname')}>
                    <img className={styles.arrowbackIcon} src={arrowBtn2} alt='arrowBtn2' />
                </button>
                <p className={styles.infoText}>
                    현재 연령대를
                    <br />
                    선택해주세요
                </p>
                <div>
                    {pickAge.map((pick, i) => {
                        return (
                            <div key={i}>
                                {userInfo.ageGroup === pick ? (
                                    <button
                                        className={styles.agePickBtn}
                                        onClick={() => {
                                            setUserInfo({ ...userInfo, ageGroup: pick });
                                        }}>
                                        <img src={check} alt='check' />
                                        {pick}
                                    </button>
                                ) : (
                                    <button
                                        className={userInfo.ageGroup === '' ? styles.ageBase : styles.ageAfter}
                                        onClick={() => {
                                            setUserInfo({ ...userInfo, ageGroup: pick });
                                        }}>
                                        {pick}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            {userInfo.age === '' ? (
                <button disabled className={styles.ageBtnNo}>
                    확인
                </button>
            ) : (
                <button className={styles.ageBtnYes} onClick={() => setMode('Specialty')}>
                    확인
                </button>
            )}
        </div>
    );
};

export default Age;
