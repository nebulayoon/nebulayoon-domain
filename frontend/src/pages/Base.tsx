import { Header, LoggedinHeader } from '@/components/Header';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LoginState } from '@/states/state';
import { useEffect, useState } from 'react';
import { IUserInfo } from '@/states/types/login';
import { useRouter } from 'next/router';
import { ENV } from '@/env/env';
import axios from 'axios';

export default function Base() {
  const login = useRecoilValue(LoginState);
  const setLogin = useSetRecoilState(LoginState);
  const router = useRouter();

  const getUserInfo = async () => {
    const result = await (
      await fetch(`${ENV.API_URL}/user/login-check`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();

    // const result = await axios.post(`${ENV.API_URL}/user/login-check`);
    // console.log(result.data)

    return result;
  };

  const getNewAccessToken = async () => {
    const result = await (
      await fetch(`${ENV.API_URL}/user/token`, {
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

        if (result.statusCode === 200){
          setLogin(result.data);
          router.push('/');
        }
      }
    })();
  }, []);

  return login?.name ? <LoggedinHeader /> : <Header />;
}
