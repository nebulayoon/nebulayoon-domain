'use client';

import styled from '@emotion/styled';
import Logo from '../logo';

const Container = styled.header`
  width: 100%;
  min-width: 800px;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 5;
  background-color: white;
`;

const Base = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  max-width: 800px;
  justify-content: space-between;
  align-items: center;
`;

export const Header = () => {
  return (
    <Container>
      <Base>
        <Logo />
        <div>service1</div>
        <div>login</div>
      </Base>
    </Container>
  );
};
