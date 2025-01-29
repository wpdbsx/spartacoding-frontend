import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/atom';

// recoil < - recoil
export const useAuthGuard = () => {
  const { isLogin } = useRecoilValue(authState);
  //login true ==> '/'
  //login false => target path
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin]);
};
