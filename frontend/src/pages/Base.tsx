import { Header, LoggedinHeader } from '@/components/Header';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LoginState } from '@/states/state';
import { useEffect, useState } from 'react';
import { IUserInfo } from '@/states/types/login';
import { useRouter } from 'next/router';
import { ENV } from '@/env/env';
import axios from 'axios';

interface IServerResult {
  status: number;
  message: string[];
  data: any;
}

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

    // const result = (await axios.post(`${ENV.API_URL}/user/login-check`)).data;

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

  // useEffect(() => {
  //   (async () => {
  //     const userInfoResult = await getUserInfo();

  //     if (userInfoResult.statusCode === 200) {
  //       setLogin(userInfoResult.data);
  //       router.push('/');
  //     } else {
  //       console.log('call this branch')
  //       await getNewAccessToken();
  //       const result = await getUserInfo();

  //       if (result.statusCode === 200){
  //         setLogin(result.data);
  //         router.push('/');
  //       }
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      const userInfoResult: IServerResult = await getUserInfo();
      
    
      if(userInfoResult.message.includes('success')){
        setLogin(userInfoResult.data)
        // console.log('1234')
      }
    })()
  }, []);

  return login?.name ? <LoggedinHeader /> : <Header />;
}
