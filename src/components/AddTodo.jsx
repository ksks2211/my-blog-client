import { useCallback, useState } from 'react'
import { TextField, Paper, Grid, IconButton} from '@mui/material'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

export default function AddTodo({addItem}){

  const [item,setItem] = useState({ title : ""})

  const onInputChange = useCallback(
    (e)=>{
      setItem({ title : e.target.value})
    },[]
  )


  const onClickOrEnter = ()=>{
    // 사용자가 클릭을 누르거나 엔터를 누르면 발생하는 이벤트
    // 1. 유효성 검사

    // 2. 등록 api 호출   
    addItem({
      ...item,
      done:false,
      id:2
    })
    // 3. 상태변경
    setItem(prev=>({...prev,title:""}))
  }


  const onKeyPress =(e)=>{
    if(e.key === 'Enter'){
      onClickOrEnter();
    }
  }

  return (
    <Paper style={{margin: 16, padding:16}}>
      <Grid container>
        <Grid xs={11} md={11} item style={{ padding : "0 5"}}>
          <TextField onChange={onInputChange} placeholder="Add Todo Here" fullWidth value={item.title} onKeyPress={onKeyPress}/>
        </Grid>
        <Grid xs={1} md={1} item style={{ position:"relative", top:"0", bottom:"0", margin: "auto"}} >
          <IconButton size="large" color="primary"  onClick={onClickOrEnter}>
            <AddCircleOutlineRoundedIcon/>
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  )
}