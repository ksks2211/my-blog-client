import Todo from './Todo';
import { useCallback, useState,useEffect } from 'react';
import {Paper, List,Container } from '@mui/material'
import AddTodo from './AddTodo';
import {call} from '../api/SecurityApi'
import {useContext } from 'react';
import LoginContext from '../context/LoginContext'
import NavigationBar from './NavigationBar';



function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true)

  const { logOut } = useContext(LoginContext);

  const errorHandler = useCallback((err)=>{
    if(err.status===403){
      logOut()
    }
    const message = err.error || err.message || "Invalid Token" ;
    alert(message);
  },[logOut])


  useEffect(()=>{
    call("/todo","GET",null)
      .then(res=>{
        setItems(res.data)
        setLoading(false);
      })
      .catch(errorHandler)
  },[errorHandler])

  const addItem = useCallback( (item)=>{
    call("/todo","POST",item)
      .then(res=>{
        setItems(res.data)
      })
      .catch(errorHandler)
  },[errorHandler])

  const deleteItem = useCallback((item)=>{
    call("/todo","DELETE",item)
      .then(()=>{
        setItems(prev=>prev.filter(p_item=> p_item.id!==item.id))
      })
      .catch(errorHandler)
  },[errorHandler])

  const setItem = useCallback((item)=>{
    call("/todo","PUT",item)
      .then(res=>{
        setItems(res.data)
      })
      .catch(errorHandler)
  },[errorHandler])

  return (
    <div className="App">
      { !loading  ? 
      (<>
        <NavigationBar/>
          <Container>
            <AddTodo addItem={addItem}/>
            <div className="TodoList">
              { items && items.length > 0 && (
                <Paper style={{margin:16}}>
                  <List>
                    {
                      items.map(
                        item=>(<Todo setItem={setItem} item={item} key={item.id} deleteItem={deleteItem} />)
                      )
                    }
                  </List>
                </Paper>
              )}
            </div>
          </Container>
      </>
      ) : (<h1>Loading...</h1>)
      }
    </div>
  )
}

export default App;
