import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function useUserActions() {
  const navigate = useNavigate();
  const baseURL = 'http://localhost:8000/api';

  function login(data){
    return axios.post(`${baseURL}/auth/login/`, data).then(
      (res) => {
        setUserData(data);
        navigate('/');
      }
    )
  }
  
  function logout(){
    localStorage.removeItem('auth');
    navigate('/login');
  }

  function register(data) {
    return axios.post(`${baseURL}/auth/register/`, data).then((res) => {
      setUserData(res.data);
      navigate("/");
    });
  }



  return {
    login,
    register,
    logout,
  }
}

function getUser(){
  const auth = JSON.parse(localStorage.getItem('auth'));
  return auth.user
}

function getAccessToken(){
  const auth = JSON.parse(localStorage.getItem('auth'));
  return auth.access;
}

function getRefreshToken(){
  const auth = JSON.parse(localStorage.getItem('auth'));
  return auth.refresh;
}

function setUserData(data){
  localStorage.setItem('auth', 
  JSON.stringify(
      {
        access: data.access,
        refresh: data.refresh,
        user: data.user
      }
    )
  );
}

export {
  useUserActions,
  getUser,
  getAccessToken,
  getRefreshToken,
  setUserData,
};
