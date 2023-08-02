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

const defaultTheme = createTheme();

export default function RegisterPage() {
  const [value, setValue] = useState({ email: '', password: '', name: '' });
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handlePasswordAgain = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const onClickRegister = async () => {
    if (!value.email || !value.password) {
      return alert('email과 password를 입력해주세요.');
    }

    if (value.password !== confirmPassword) {
      return alert('비밀번호와 비밀번호확인은 같아야 합니다.');
    }

    const result = await (
      await fetch('https://192.168.0.13:8888/user/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      })
    ).json();

    if (result.statusCode === 200) {
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
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={onClickRegister}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={value.name}
              onChange={handleChange}
              autoComplete="name"
              autoFocus
            />
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="passwordAgain"
              name="passwordAgain"
              label="Password Again"
              type="password"
              value={confirmPassword}
              onChange={handlePasswordAgain}
              autoComplete="current-password"
            />
            <Button
              onClick={onClickRegister}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              REGISTER
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
