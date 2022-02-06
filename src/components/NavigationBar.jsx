import { useNavigate } from 'react-router-dom';
import { Grid, Button,AppBar,Toolbar, Typography} from '@mui/material'
import {useContext } from 'react';
import LoginContext from '../context/LoginContext'

export default function NavigationBar(){
  const { logOut } = useContext(LoginContext);
  const navigate = useNavigate();
  const onClick = ()=>{
    logOut();
    navigate("/login");
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid justify="space-between" container>
          <Grid item>
            <Typography variant="h6">오늘의 할일</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={onClick}>로그아웃</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}