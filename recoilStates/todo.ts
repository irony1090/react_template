import { atom, selector } from 'recoil';

import {isBlank} from 'src/format';


export type Todo = {
  id?: number,
  title: string,
  modify: boolean
}

export const todoListAtom = atom<Array<Todo>>({
  key: 'todoListAtom',
  default: []
})
export const todoTempListAtom = atom<Array<Todo>>({
  key: 'todoTempListAtom',
  default: []
})
export const todoIsCreatingAtom = atom<boolean>({
  key: 'todoIsCreateAtom',
  default: false
})

export type TodoSearch = {
  type: string,
  word: string
}
export const searchTypeList = [
  {id: 'title', title: '제목'},
  {id: 'id', title: '아이디'}
]
export const todoSearchAtom = atom<TodoSearch>({
  key: 'todoSearchAtom',
  default: {
    type: searchTypeList[0].id,
    word: ''
  }
})

export const todoSearchSelector = selector({
  key: 'todoSearchSelector',
  get: ({get}) => {
    const search = get(todoSearchAtom);
    const {type, word} = search;
    const list = get(todoListAtom);
    if(isBlank(search.word) || (search.type !== 'title' && search.type !== 'id'))
      return list;
      
    return list.filter(todo => 
      type === 'title' 
        ? todo.title.indexOf(word) > -1 
        : todo.id?.toString() === word 
    )
    // console.log(f_)
    // return f_;
  }
})




// const 

