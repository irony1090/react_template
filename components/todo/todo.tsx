import { FC, useState, useEffect, ChangeEvent } from 'react';

// import {useSelector} from 'react-redux'
// import {rootState} from 'reducers'
// import todoActions from 'reducers/todo/todoActions'

import {
  Grid,
  Button,
  TextField,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {Todo} from 'recoilStates/todo';
import { ThemeProvider } from '@material-ui/core/styles';
import { secondTheme } from 'theme/theme';
// import {
//   Todo
// } from 'reducers/todo/todoTypes'

import {isBlank} from 'src/format'


type TodoPropsDTO = {
  todo: Todo,
  onSubmit: (todo:Todo) => void,
  onModify: (todo:Todo) => void,
  onCancel: (todo:Todo) => void,
  onDelete: (todo:Todo) => void
}
const TodoItem:FC<TodoPropsDTO> = ({todo, onSubmit, onModify, onCancel, onDelete}) => {
  const viewOrEdit = todo.modify
    ? <Edit todo={todo} onCancel={onCancel} onSubmit={onSubmit} />
    : <View todo={todo} onDelete={onDelete} onModify={onModify} />
  // const viewOrEdit = <View todo={todo} />

  return (
    <Grid container spacing={2}>
      <ThemeProvider theme={secondTheme}>
        {viewOrEdit}

      </ThemeProvider>
    </Grid>
  )
}

export default TodoItem;



const useViewStyles = makeStyles((_theme) => ({
  buttons: {
    minWidth: 'auto'
  }
}))
type TodoProps = {
  todo: Todo,
  onModify: (todo:Todo) => void,
  onDelete: (todo:Todo) => void
}
const View:FC<TodoProps> = ({todo, onModify, onDelete}) =>{
  const classes = useViewStyles();

  return (<>
    <Grid item className='spacer'>
      <Typography variant="body1">{todo.title}</Typography>
    </Grid>
    <GridItemContainer>
      <Grid item>
        <Button 
          className={classes.buttons}
          fullWidth color="secondary"
          variant="contained" size="small" 
          onClick={ _ => onModify(todo) }
        >
          수정
        </Button>
      </Grid>
      <Grid item>
        <Button 
          className={classes.buttons}
          fullWidth color="secondary"
          variant="outlined" size="small"
          onClick={ _ => onDelete(todo)}
        >
          삭제
        </Button>
      </Grid>
    </GridItemContainer>
  </>)
}
const GridItemContainer:FC = ({children}) => 
  <Grid item><Grid container>{children}</Grid></Grid>

const useEditStyles = makeStyles((_theme) => ({
  inputWrapper: {
    flexGrow: 1
  },
  buttons: {
    minWidth: 'auto'
  }
}))
type EditProps = {
  todo: Todo
  onCancel: (todo:Todo)=>void,
  onSubmit: (todo:Todo) => void
}
export const Edit:FC<EditProps> = ({todo, onSubmit, onCancel}) => {
  const classes = useEditStyles();
  // const todoState = useSelector((state:rootState) =>state.TodoReducer)
  // const {list } = todoState;
  // const dispatch = useDispatch();

  const [todoClient, setTodoClient] = useState<Todo>(()=>{
    const todoProps:any = todo||{};
    const {id, title='', modify=true} = todoProps;
    return { id, title, modify}
  }) 

  useEffect(()=>{
    const todoProps:any = todo||{};
    const {id, title='', modify=true} = todoProps;
    setTodoClient({
      id, title, modify
    })
  }, [todo])


  const changeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    if(e.target){
      const {name, value} = e.target;
      setTodoClient({
        ...todoClient,
        [name]: value
      })
    }
  }

  const onSubmitAndSetNotModify = () => {
    if( isBlank(todoClient.title) ){
      alert('빈 문자열은 불가능합니다');
      return;
    }

    onSubmit({
      ...todoClient,
      modify: false
    })
    // setTodoClient({...todo, modify: false});

  }

  const onCancelAndInit = () => {
    onCancel({...todo});
    setTodoClient({...todo});
  }


  return (<>
    <Grid item className={classes.inputWrapper}>
      <TextField 
        value={todoClient.title}
        onChange={changeHandler}
        name="title"
      />
    </Grid>
    <Grid item>
      <Button 
        className={classes.buttons}
        color="default" 
        variant="contained" size="small" 
        onClick={ onSubmitAndSetNotModify }
      >
        저장
      </Button>
      <Button 
        className={classes.buttons}
        color="default"
        variant="outlined" size="small" 
        onClick={onCancelAndInit}
      >
        취소
      </Button>
    </Grid>
  </>)
}