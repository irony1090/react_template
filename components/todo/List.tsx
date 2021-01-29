import {FC} from 'react'

import {
  Box,
  Typography
} from '@material-ui/core'

import TodoItem from 'components/todo/todo'

import { useRecoilState, useRecoilValue } from 'recoil';
import { Todo, todoListAtom, todoSearchSelector } from 'recoilStates/todo';
// import {useSelector, useDispatch} from 'react-redux'
// import {rootState} from 'reducers/index'
// import {Todo} from 'reducers/todo/todoTypes'
// import todoActions from 'reducers/todo/todoActions'

// import {clone} from 'src/util'



const ToDoList:FC = () =>{
  const [list, setList] = useRecoilState(todoListAtom);
  const filterList = useRecoilValue(todoSearchSelector);

  // const {list} = useSelector((state:rootState) => state.TodoReducer);
  // const dispatch = useDispatch();

  const setTodoItem = (todo:Todo) => {
    const findIndex = list.findIndex(todoOrg => todoOrg.id === todo.id)
    if(findIndex > -1){
      // const listClone = clone(list);
      // listClone.splice(findIndex, 1, todo);
      // setList(listClone);
      setList([...list.slice(0, findIndex), todo, ...list.slice(findIndex+1)])
      // dispatch(todoActions.SET_LIST(listClone));
    }
  }
  const onSubmit = (todo:Todo) => 
    setTodoItem({...todo, modify: false});
  
  const onCancel = (todo:Todo) => 
    setTodoItem({...todo, modify: false});

  const onDelete = (todo:Todo) => {
    const findIndex = list.findIndex(todoOrg => todoOrg.id === todo.id)
    if(findIndex > -1){
      // const listClone = clone(list);
      // listClone.splice(findIndex, 1);
      // setList(listClone);
      setList([...list.slice(0, findIndex), ...list.slice(findIndex+1)])

      // dispatch(todoActions.SET_LIST(listClone));
    }
  }

  const onModify = (todo:Todo) => 
    setTodoItem({...todo, modify: true});
  
  

  const listComponent = filterList.length > 0 
    ? (
      filterList.map((todo, index) => (
        <TodoItem 
          key={index}
          todo={todo} 
          onSubmit={onSubmit}
          onModify={onModify}
          onCancel={onCancel}
          onDelete={onDelete}
        />
      ))
    )
    : (
      <Typography variant="body2">리스트가 없습니다</Typography>
    )

  return (
    <Box>
      {listComponent}
    </Box>
  )
}

export default ToDoList;