import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { get_login } from "../app/slice/mainSlice";
import styled from "styled-components";
import { DotWave } from "@uiball/loaders";

const KakaoFinish = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const use = useSelector((state) => state.main);
    const authCode = location.search.split("=")[1];

    useEffect(() => {
        dispatch(get_login(authCode));
    }, []);
    console.log(authCode);

    useEffect(() => {
        localStorage.setItem("token", use.token);
        if (use?.user?.nickname !== "") {
            if (use.token !== undefined) {
                console.log(use.token);
                if (localStorage.token !== undefined) {
                    navigate("/home", { state: localStorage.token });
                }
            }
        } else {
            navigate("/join");
        }
    }, [use]);

    return (
        <Background>
            <DotWave size={47} speed={1} color='white' />
        </Background>
    );
};

export default KakaoFinish;

const Background = styled.div`
    background-color: #1a1b23;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;
