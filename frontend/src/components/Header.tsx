'use client';

import styled from '@emotion/styled';
import Logo from './logo';
import Link from 'next/link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

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
        <Link href={'./login'}>
          <Button
            fullWidth
            variant="contained"
            style={{ backgroundColor: 'lightgreen' }}
          >
            login
          </Button>
        </Link>
      </Base>
    </Container>
  );
};

export const LoggedinHeader = () => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Container>
      <Base>
        <Logo />
        <div>service1</div>

        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
      </Base>
    </Container>
  );
};
