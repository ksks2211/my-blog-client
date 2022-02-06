import {useCallback, useState} from 'react';
import { ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton} from '@mui/material'
import { DeleteOutlined } from '@mui/icons-material';

export default function Todo({item, setItem, deleteItem}){


  const [ title, setTitle ] = useState(item.title);
  const [ checked, setChecked] = useState(item.done)
  const [ readOnly, setReadOnly] = useState(true)





  const onCheckedChange = useCallback(()=>{
    // 1. API 호출해서 done 변경하기
    // 2. 전역 state 변경
    setItem({...item,done:!checked})
    // 3. 
    setChecked(!checked);
  },[item,checked,setItem]);


  const onTitleChange = useCallback((e)=>{
    setTitle(e.target.value)
  },[])


  const onDeleteClick = useCallback(()=>{
    deleteItem(item);
  },[deleteItem, item])

  const offReadOnlyMode = useCallback(()=>{
    setReadOnly(false)
  },[])

  const enterKeyHandler = (e)=>{
    if(e.key === "Enter"){
      // 1. API 호출로 저장
      // 2. 전역 state 변경(한번에 전역값도 수정?)
      setItem({...item,title})
      // 3. 읽기전용으로 다시 변경하기
      setReadOnly(true)
    }
  }

  return (
    <ListItem>
      <Checkbox onChange={onCheckedChange} checked={checked}/>
      <ListItemText>
        <InputBase 
          inputProps={{
            "aria-label":"naked",
            readOnly : readOnly
          }}
          type="text"         
          value={title}
          multiline={true}
          fullWidth={true}
          onClick = {offReadOnlyMode}
          onChange = {onTitleChange}
          onKeyPress={enterKeyHandler}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete Todo"  onClick={onDeleteClick} >
          <DeleteOutlined/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}