import React from 'react';
import styled from 'styled-components';
import styles from '../css/timerButton.module.css';
import setting from '../image/setting_icon.svg';

const TimerButton = () => {
    return (
        <Button>
            <div className={styles.settingBox}>
                <img src={setting} alt='목표 설정' className={styles.setting} />
            </div>
            <div className={styles.text}>목표설정</div>
        </Button>
    );
};

export default TimerButton;

const Button = styled.button`
    width: 20.5rem;
    height: 3.75rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 3.438rem 1rem 1rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: none;
    background-color: var(--neutral-10);
`;
