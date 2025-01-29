import { atom } from 'recoil';

export const authState = atom({
  key: 'auth',
  default: { isLogin: true },
});
