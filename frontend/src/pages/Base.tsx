import { Header, LoggedinHeader } from '@/components/Header';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LoginState } from '@/states/state';
import { useEffect, useState } from 'react';
import { IUserInfo } from '@/states/types/login';
import { useRouter } from 'next/router';

export default function Base() {
  const login = useRecoilValue(LoginState);
  const setLogin = useSetRecoilState(LoginState);
  const router = useRouter();

  const getUserInfo = async () => {
    const result = await (
      await fetch('https://192.168.0.13:8888/user/login-check', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();

    return result;
  };

  const getNewAccessToken = async () => {
    const result = await (
      await fetch('https://192.168.0.13:8888/user/token', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();

    return result;
  };

  useEffect(() => {
    (async () => {
      const userInfoResult = await getUserInfo();

      if (userInfoResult.statusCode === 200) {
        setLogin(userInfoResult.data);
        router.push('/');
      } else {
        await getNewAccessToken();
        const result = await getUserInfo();

        if (result.statusCode !== 200) router.push('/login');

        setLogin(result.data);
        router.push('/');
      }
    })();
  }, []);

  return login?.name ? <LoggedinHeader /> : <Header />;
}
