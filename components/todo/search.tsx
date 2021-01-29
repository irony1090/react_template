import {ChangeEvent, FC} from 'react';

import {
  Grid,
  TextField,
  Select,
  Button,
  MenuItem
} from '@material-ui/core';
import {defButtonProps} from 'theme/theme';

import { useRecoilState } from 'recoil';
import { searchTypeList, todoSearchAtom } from 'recoilStates/todo';

const Search:FC = ()=>{
  const [search, setSearch] = useRecoilState(todoSearchAtom);

  const chageHandler = (e:ChangeEvent<({name?: string | undefined, value?: string | unknown})>) => {
    if(!e.target) return;

    const {name, value} = e.target;

    if(typeof value !== 'string') return;
    
    if(name === 'id')
      setSearch({
        type: value,
        word: ''
      });
    else
      setSearch((ordState)=> ({
        ...ordState,
        word: value
      }));
  }

  const optionListComponent = searchTypeList.map((type, i) => <MenuItem key={i} value={type.id}>{type.title}</MenuItem>);
  return (
    <Grid container>
      <Grid item >
        <Button {...defButtonProps} 
          variant='outlined' color='secondary' fullWidth
          onClick={_ => setSearch({type: 'title', word: ''})}
        >초기화</Button>
      </Grid>
      <GridItemContainer>
        <Grid item xs={4}>
          <Select 
            name='id'
            value={search.type}
            fullWidth
            onChange={chageHandler}
          >
            {optionListComponent}
          </Select>
        </Grid>
        <Grid item xs={8}>
          <TextField 
            name='word'
            value={search.word}
            fullWidth
            onChange={chageHandler}
          />
        </Grid>  
      </GridItemContainer>

      
      {/* <Grid item xs={3}>
        <Button {...defButtonProps} variant='outlined' color='primary' fullWidth>검색</Button>
      </Grid> */}
    </Grid>
  )
}

const GridItemContainer:FC = ({children}) => 
  <Grid item><Grid container>{children}</Grid></Grid>


export default Search;