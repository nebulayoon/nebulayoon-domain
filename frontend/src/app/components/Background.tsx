'use client';

import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  min-width: 1200px;
  overflow: hidden;
  position: relative;
`;

const VideoTextDiv = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  display: block;
`;

const VideoTextP = styled.p`
  text-align: center;
  font-size: 80px;
  color: white;
`;

const BackgroundVideo = () => {
  return (
    <Container>
      <video
        style={{ width: '100%', height: '1200px', objectFit: 'fill' }}
        autoPlay
        loop
        muted
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
      <VideoTextDiv>
        <VideoTextP>Nebulayoon&apos;s Web Site</VideoTextP>
      </VideoTextDiv>
    </Container>
  );
};

export default BackgroundVideo;
