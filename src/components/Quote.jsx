import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_quote } from '../app/slice/mainSlice';
import styles from '../css/quote.module.css';

const Quote = () => {
    const dispatch = useDispatch();
    const quote = useSelector((state) => state.main.quote);
    useEffect(() => {
        dispatch(get_quote());
    }, [dispatch]);

    return (
        <div className={styles.heightBox}>
            <div className={styles.quoteBox}>
                <span className={styles.quotes}>"</span>
                <div className={styles.quote}>{quote}</div>
                <span className={styles.quotes}>"</span>
            </div>
        </div>
    );
};

export default Quote;
