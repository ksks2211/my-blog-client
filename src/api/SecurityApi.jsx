import { API_BASE_URL } from "./address/security";
import axios from 'axios';
const ACCESS_TOKEN = "ACCESS_TOKEN";

// api 호출
export function call(path, method, body, headers={}){
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios({
    method,
    url: API_BASE_URL+path,
    headers :{
      'Accept': 'application/json',
      'Content-Type': 'application/json',      
      ...(accessToken && {"Authorization": `Bearer ${accessToken}`}),
      ...headers
    },
    ...( body && { data: body }),
  })
    .then(res=>res.data)
    .catch(err=>Promise.reject(err));
}

// 로그인
export function signin(userDTO){
  return call("/auth/signin","POST",userDTO)
    .then(res=>{      
      const token = res.token
      if (!token || token.length === 0 ) return Promise.reject("Invalid Token")
      localStorage.setItem(ACCESS_TOKEN,token);
      return token;
    })
}

// 로그아웃
export function signout(){
  localStorage.removeItem(ACCESS_TOKEN);  
}

// 회원가입
export function signup(userDTO){
  return call("/auth/signup","POST",userDTO);
}