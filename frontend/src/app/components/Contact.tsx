'use client';

import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  width: 100%;
  min-width: 800px;
  background-color: #a9a9a9;
  justify-content: center;
  padding: 25vh 0px 25vh 0px;
`;

const Base = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  height: 100%;
  justify-content: space-between;
`;

const CircleBox = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 70%;
  overflow: hidden;
`;

const Contact = () => {
  return (
    <Container>
      <Base>
        <a href="https://nebulayoon.tistory.com/" target="_blank">
          <CircleBox>
            <img
              src="/tistory-icon2.png"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </CircleBox>
        </a>
        <a
          href="https://hot-sassafras-a68.notion.site/949f95ceb7a24fc5bb7874c0f0da531d?pvs=4"
          target="_blank"
        >
          <CircleBox>
            <img
              src="/notion-icon.png"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </CircleBox>
        </a>
        <a href="https://github.com/nebulayoon" target="_blank">
          <CircleBox>
            <img
              src="/github-icon.png"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </CircleBox>
        </a>
      </Base>
    </Container>
  );
};

export default Contact;
