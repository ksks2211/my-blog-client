import React,{useContext} from 'react';
import { signin } from '../api/SecurityApi'
import {Button, TextField,Grid, Typography, Container,Link} from '@mui/material'
import LoginContext from '../context/LoginContext'

export default function Login(){
  

  const { logOut,logIn } = useContext(LoginContext);

  const onSubmit = async (e)=>{
    e.preventDefault()

    const data = new FormData(e.target);
    const email = data.get("email")
    const password = data.get("password")

    try{
      await signin({email:email, password:password})
      logIn()
    }catch(e){
      alert("Invalid Information")
      logOut();
    }
  }
  return(
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%"}}>
      <Grid container spacing={2}>       
        <Grid item xs={12}>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
        </Grid>
      </Grid>
      <form noValidate onSubmit={onSubmit}>
        {" "}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              id="email"
              label="이메일주소"
              name="email"
              autoComplete='email'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              id="password"
              label="패스워드"
              name="password"
              type="password"
              autoComplete='current-password'
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              로그인
            </Button>
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
            <Link href="/signup" variant="body2">
              <Grid item>계정 생성</Grid>
            </Link>
          </Grid>
      </form>
    </Container>
  )
}