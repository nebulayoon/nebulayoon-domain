'use client';

import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  width: 100%;
  min-width: 800px;
  background-color: white;
  justify-content: center;
  padding: 25vh 0px 25vh 0px;
`;

const HiThereDiv = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Introduce = () => {
  return (
    <Container>
      <HiThereDiv>
        <img src="/nebulayoon.jpg" />
        <div style={{ flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontSize: '30px' }}>안녕하세요</p>
          <p style={{ paddingTop: '30px' }}>Nebulayoon의 개인 서버입니다.</p>
        </div>
      </HiThereDiv>
    </Container>
  );
};

export default Introduce;
