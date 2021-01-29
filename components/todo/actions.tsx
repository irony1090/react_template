import { FC, useEffect, useState } from 'react'
// import {} from 're'

import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {Todo, todoListAtom, todoIsCreatingAtom, todoTempListAtom, todoSearchAtom} from 'recoilStates/todo';
// import {useSelector, useDispatch} from 'react-redux'
// import {rootState} from 'reducers'
// import todoActions from 'reducers/todo/todoActions'
// import {Todo} from 'reducers/todo/todoTypes'

import {
  Button,
  Grid
} from '@material-ui/core'

import {Edit} from 'components/todo/todo'


import {defButtonProps} from 'theme/theme'
import {clone} from 'src/util'
// import { isNumberForm, isNotDecared } from 'src/format';

const EDIT_TODO = {
  id: undefined,
  title: '',
  modify: true
}
const Actions:FC = ({}) => {
  // const todoState = useSelector((state:rootState) => state.TodoReducer);
  // const dispatch = useDispatch();
  // const {open, list} = todoState;
  const [list, setList] = useRecoilState(todoListAtom);
  const setTempList = useSetRecoilState(todoTempListAtom);
  const [isCreating, setIsCreating] = useRecoilState(todoIsCreatingAtom);
  const [init, setInit] = useState(true)

  useEffect(() => {
    if(init){
      setInit(false);
      setTempList(clone(list));
      // dispatch(todoActions.SET_TEMP_LIST(clone(list)))
    }
  }, [init])
  // useEffect(()=>{
  //   console.log(list);
  // }, [list])

  const submit = (todo:Todo) => {
    const maxIdTodo = list.length === 0 
      ? {id: -1}
      : list.slice(0).sort((prev,cur) => {
          // console.log((b.id - a.id), b, a)
          if( prev.id === undefined  )
            return -1;
          else if( cur.id === undefined )
            return 1;
          else 
            return cur.id - prev.id;
        })[0];
    const listClone = clone(list);
    listClone.push({
      ...todo,
      id: (maxIdTodo.id===undefined ? -1 : maxIdTodo.id)+1,
      modify: false
    })
    setList(listClone);
    // dispatch(todoActions.SET_LIST(listClone));
    onClose();
  }
  const onClose = () => 
    setIsCreating(false);
    // dispatch(todoActions.SET_ADDER(false))
  
  return (
    <Grid container>
      {isCreating 
        ? <Edit todo={EDIT_TODO} 
            onSubmit={submit}
            onCancel={onClose}
          />
        : <Menu />
      } 
    </Grid>
  )
}

const Menu:FC = ({}) => {
  const tempList = useRecoilValue(todoTempListAtom);
  const setList = useSetRecoilState(todoListAtom);
  const setSearch = useSetRecoilState(todoSearchAtom);
  const setIsCreating = useSetRecoilState(todoIsCreatingAtom);
  // const todoState = useSelector((state:rootState) => state.TodoReducer);
  // const {tempList} = todoState;
  // const dispatch = useDispatch();

  const onInit = () => {
    setSearch({type: 'title', word: ''})
    setList(clone(tempList))
  }
    // dispatch(todoActions.SET_LIST(clone(tempList)))
  

  return <>
    <Grid item xs={6}>
      <Grid container >
        <Button 
          {...defButtonProps}
          color="secondary"
          onClick={onInit}
        >
          초기화
        </Button>
      </Grid>
    </Grid>
    <Grid item xs={6}>
      <Grid container justify="flex-end">
        <Button 
          {...defButtonProps}
          color="primary"
          onClick={ _ => setIsCreating(true)}
          // onClick={ _ => dispatch(todoActions.SET_ADDER(true))}
        >
          추가
        </Button>
      </Grid>
    </Grid>
  </>
}

export default Actions;