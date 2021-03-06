import React from 'react';
import {
  Button,
  TextField,
  Link,
  Grid,
  Container,
  Typography
} from '@mui/material'

import { useNavigate } from 'react-router-dom';
import { signup } from '../api/SecurityApi'

export default function SignUp(){
  const navigate = useNavigate()
  const onSubmit = (e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data)

    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");

    console.log(username);
    console.log(email);
    console.log(password);

    signup({email,username,password})
      .then((res)=>{
        alert("회원가입 완료")
        navigate("/")
      })
      .catch((e)=>{
        console.error(e)
        alert("check your form")
      })
  }


  return (
    <Container component="main" maxWidth="xs" style={{ marginTop:"8%"}}>
      <form noValidate onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">계정생성</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField autoComplete='fname' name="username" variant="outlined" required fullWidth id="username" label="사용자이름" autoFocus>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField autoComplete='email' name="email" variant="outlined" required fullWidth id="email" label="이메일 주소" autoFocus>            
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField autoComplete='current-password' type="password" name="password" variant="outlined" required fullWidth id="password" label="패스워드" autoFocus>            
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">계정 생성</Button>
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              이미 계정이 있습니까? 로그인 하세요.
            </Link>
          </Grid>
        </Grid>        
      </form>
    </Container>
  )
}