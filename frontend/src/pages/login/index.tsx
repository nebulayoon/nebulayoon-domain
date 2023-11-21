import { useState, ChangeEvent } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { LoginState } from '@/states/state';
import { useRouter } from 'next/router';
import { IUserInfo } from '@/states/types/login';
import { ENV } from '@/env/env';
import axios from 'axios';

const defaultTheme = createTheme();

export default function LoginPage() {
  const [value, setValue] = useState({ email: '', password: '' });
  // const [login, setLogin] = useRecoilState(LoginState);
  const setLogin = useSetRecoilState(LoginState);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const onClickLogin = async () => {
    if (!value.email || !value.password) {
      return alert('email과 password를 입력해주세요.');
    }
  
    const result = await (
      await fetch(`${ENV.API_URL}/user/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      })
    ).json();

    if (result.statusCode === 200) {
      const { data }: { data: IUserInfo } = await (
        await fetch(`${ENV.API_URL}/user/login-check`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json();

      if (!data) router.push('/login');
      setLogin(data);
      router.push('/');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{ justifyContent: 'center', marginTop: '200px' }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'lightgreen' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={onClickLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={value.email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={value.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <Button
              onClick={onClickLogin}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              LOGIN
            </Button>
            <Link href={'./register'}>
              <Button fullWidth variant="contained">
                REGISTER
              </Button>
            </Link>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
