import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_quote } from '../app/slice/mainSlice';
import styles from '../css/quote.module.css';

const Quote = () => {
    const dispatch = useDispatch();
    const quote = useSelector((state) => state.main.quote);
    console.log(quote);
    useEffect(() => {
        dispatch(get_quote());
    }, [dispatch]);

    return <div className={styles.quote}>{quote}</div>;
};

export default Quote;
