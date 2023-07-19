'use client';

import styled from '@emotion/styled';
import Logo from '../logo';

const Container = styled.header`
  min-width: 1200px;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Base = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  max-width: 1200px;
  justify-content: space-between;
  align-items: center;
`;

export const Header = () => {
  return (
    <Container>
      <Base>
        <Logo />
        <div>test</div>
        <div>test2</div>
      </Base>
    </Container>
  );
};
