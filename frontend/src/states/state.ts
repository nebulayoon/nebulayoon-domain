import { atom } from 'recoil';
import { IUserInfo } from './types/login';

export const LoginState = atom<IUserInfo>({
  key: 'LoginState',
  default: { name: '', email: '' },
});
