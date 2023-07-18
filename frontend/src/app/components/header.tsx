import styled from "@emotion/styled";
import { render } from "react-dom";

const Base = styled.div`
  min-width: 1200px;
  height: 88px;
  display: flex;
  justify-content: center;
`;

const Header = () => {
  return (
    <Base>
      <div></div>
      <div></div>
    </Base>
  );
};
