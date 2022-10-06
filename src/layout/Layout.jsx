import React from "react";
import styled from "styled-components";
import "../common/css/color.css";
import { ReactComponent as Logo } from "../common/svg/logo.svg";
import intro from "../common/svg/left_box.png";
import phone from "../common/svg/phone.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Layout = props => {
  const navigate = useNavigate();
  const preventAccess = ["/home", "/mypage", "/ranking", "/mytodo", "/modify", "dday", "/postdday"];

  useEffect(() => {
    if (preventAccess.includes(location.pathname)) {
      localStorage.getItem("token") === null && navigate("/");
    }
  }, []);

  return (
    <Background>
      <div className="logoBox">
        <Logo className="logo"></Logo>
        <span className="title">
          <b>취준생</b>을 위한 시간, <span className="name">랭플</span>
        </span>
      </div>
      <div className="introBox">
        <img src={intro} alt="" />
      </div>
      <img src={phone} alt="" className="phone" />
      <div className="phoneFrame">
        <StyledLayout path={window.location.pathname}>{props.children}</StyledLayout>
      </div>
    </Background>
  );
};

const StyledLayout = styled.div`
  margin: 0 auto;
  min-height: ${props => props.path !== "/" && "800px"};
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
  @media (min-width: 600px) and (max-width: 1024px) {
    width: 360px;
    height: 800px;
    position: absolute;
    left: calc(50% - 180px);
    top: 191px;
  }
  @media (min-width: 1025px) {
    width: 360px;
    height: 800px;
    position: absolute;
    right: 0px;
    margin-right: 0;
    top: 0;
  }
`;
const Background = styled.div`
  width: 100vw;
  position: relative;
  @media (max-width: 360px) {
    background-color: transparent;
    .logoBox {
      display: none;
    }
    .logo {
      display: none;
    }
  }
  @media (min-width: 360px) {
    .logoBox {
      display: none;
    }
  }

  @media (min-width: 600px) {
    display: block;
  }
  .phone {
    display: none;
  }
  .logoBox {
    position: absolute;
    top: 44.5px;
    left: calc(50% - 115px);
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
  .introBox {
    display: none;
  }
  .name {
    font-weight: 600;
    color: var(--primary-50);
  }
  @media (min-width: 1025px) {
    width: 1024px;
    height: 700px;
    position: relative;
    margin: auto;
    top: -3rem;
    transform: scale(0.7);
    .phoneFrame {
      position: absolute;
      height: 800px;
      width: 360px;
      right: 38px;
      top: 51px;
      border-radius: 20px;
      overflow: hidden;
    }
    .logoBox {
      display: none;
    }
    .logo {
      display: none;
    }
    .introBox {
      display: block;
      position: absolute;
      overflow: scroll;
      top: 20px;
      height: 900px;
      overflow-x: hidden;
      margin-left: 80px;
    }
    .introBox::-webkit-scrollbar {
      display: none;
    }
    .phone {
      display: block;
      position: absolute;
      z-index: 15;
      right: 16px;
      top: 30px;
      pointer-events: none;
    }
  }
`;
export default Layout;
