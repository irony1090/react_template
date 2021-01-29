// import { useEffect } from 'react';
import {NextPage} from 'next';
// import * as THREE from 'three'


import Main from 'components/layout/main';
import TodoList from 'components/todo/List';
import Actions from 'components/todo/actions';
import Search from 'components/todo/search'
// import Text,{TextMesh} from 'components/three/text'

import {useRecoilValue, useSetRecoilState} from 'recoil';
import {todoListAtom, todoTempListAtom, todoSearchSelector} from 'recoilStates/todo';


// import {useDispatch, useSelector} from 'react-redux';
// import {rootState} from 'reducers';
// import todoActions from 'reducers/todo/todoActions';
// import dotoActions from 'reducers/todo/todoActions'


import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  makeStyles,
  Grid
} from '@material-ui/core'

import {defButtonProps} from 'theme/theme'

import {clone} from 'src/util'

const useStyles = makeStyles((theme) =>({
  container: {
    "& .MuiDialog-paper":{
      minWidth: '350px',
      position: 'absolute',
      left: '0',
      top: '0'
    }
  },
  actions: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  submit: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    '& .MuiButton-root': {
      minWidth: '200px'
    }
  }
}))
const Index:NextPage = () => {
  const classes = useStyles();
  const list = useRecoilValue(todoListAtom);
  const filterList = useRecoilValue(todoSearchSelector);
  const setTempList = useSetRecoilState(todoTempListAtom);
  // const {list} = useSelector((state:rootState) => state.TodoReducer);
  // const dispatch = useDispatch();


  const onSave = () => 
    setTempList(clone(list))

  //   dispatch(todoActions.SET_TEMP_LIST(list))
  

  return <Main>
    
    <Dialog 
      className={classes.container}
      open={true} 
      scroll="body" 
    >
      
      <DialogTitle>
        <Grid container>
          <Grid item>DoToList</Grid> 
          <Grid item className='spacer' />
          <Grid item>[{filterList.length}]</Grid>
        </Grid>
      </DialogTitle>

      <DialogActions className={classes.actions}>
        <Actions />
      </DialogActions>
      <DialogActions className={classes.actions}>
        <Search />
      </DialogActions>

      <DialogContent >
        <TodoList />
      </DialogContent>

      <DialogActions className={classes.submit} >
        <Grid container justify="center">
          <Button {...defButtonProps}
            size="medium" color="primary"
            onClick={onSave}
          >
            저장
          </Button>
        </Grid>
      </DialogActions>

    </Dialog>
  </Main>
}

export default Index;