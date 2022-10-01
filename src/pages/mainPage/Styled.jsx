import styled from "styled-components";

const Blur = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  backdrop-filter: blur(3px);
  z-index: 8;
`;

export { Blur };
