import React, { memo } from "react";
import styled from "styled-components";
import styles from "./footer.module.css";
import { ReactComponent as Home } from "../../common/svg/home_icon.svg";
import { ReactComponent as Rank } from "../../common/svg/ranking_icon.svg";
import { ReactComponent as Stats } from "../../common/svg/stats_icon.svg";
import "../../common/css/color.css";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return (
    <FooterBar>
      <Link to="/ranking">
        <div className={styles.selected}>
          <Rank fillOpacity={location.pathname === "/ranking" ? 1 : 0.5} />
        </div>
      </Link>
      <Link to="/home">
        <div className={styles.selected}>
          <Home fillOpacity={location.pathname === "/home" ? 1 : 0.5} />
        </div>
      </Link>
      <Link to="/mypage">
        <div className={styles.selected}>
          <Stats fillOpacity={location.pathname === "/mypage" ? 1 : 0.5} />
        </div>
      </Link>
    </FooterBar>
  );
};

export default memo(Footer);

const FooterBar = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  background-color: #24262e;
  justify-content: space-around;
  width: 100%;
  border: none;
`;
