import React from "react";
import styled from "styled-components";
import "../common/css/color.css";
import { ReactComponent as Logo } from "../common/svg/logo.svg";

const Layout = (props) => {
    return (
        <Background>
            <div className='logoBox'>
                <Logo className='logo'></Logo>
                <span className='title'>
                    <b>취준생</b>을 위한 시간, <span className='name'>랭플</span>
                </span>
            </div>
            <StyledLayout>{props.children}</StyledLayout>
        </Background>
    );
};

const StyledLayout = styled.div`
    margin: 0 auto;
    min-height: 800px;
    justify-content: center;
    align-items: center;
    background-color: var(--neutral-20);
    overflow: hidden;
    min-width: 360px;
    position: relative;
    @media (max-width: 360px) {
        height: 800px;
    }
    @media (min-width: 360px) {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
    }
    @media (min-width: 600px) {
        width: 360px;
        height: 800px;
        position: absolute;
        left: calc(50% - 180px);
        top: 219px;
    }
    @media (min-width: 1024px) {
        width: 360px;
        height: 800px;
        position: absolute;
        right: 1rem;
        margin-right: 0;
    }
`;
const Background = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgb(169, 169, 234);
    z-index: -1;
    @media (max-width: 360px) {
        background-color: transparent;
        .logoBox {
            display: none;
        }
        .logo {
            display: none;
        }
    }
    @media (min-width: 600px) {
        display: block;
    }
    .logoBox {
        position: relative;
        top: 44.5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .title {
        margin: 1rem;
        font-family: "Pretendard";
        font-style: normal;
        font-size: 21px;
        line-height: 150%;
        color: white;
    }

    .name {
        font-weight: 600;
        color: var(--primary-50);
    }
    @media (min-width: 1024px) {
        width: 1024px;
        background-color: #828282;
        position: relative;
        margin: auto;
    }
`;
export default Layout;
