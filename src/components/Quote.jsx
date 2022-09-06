import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_quote } from '../app/slice/mainSlice';

const Quote = () => {
    const dispatch = useDispatch();
    const quote = useSelector((state) => state.main.quote?.quote);
    console.log(quote);

    useEffect(() => {
        dispatch(get_quote());
    }, []);

    return <div>{quote}</div>;
};

export default Quote;
