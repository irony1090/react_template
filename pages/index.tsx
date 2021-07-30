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
  Grid,
  Box
} from '@material-ui/core'

import {defButtonProps} from 'theme/theme'

import {clone} from 'src/util'
import AspectRatioBox from 'components/shape/aspectRatioBox';
import LineSwiper from 'components/slider/lineSwiper';
import { useState, useEffect } from 'react';
import KakaoButton from 'components/button/kakaoButton';
import NaverButton from 'components/button/naverButton';
import GoogleButton from 'components/button/googleButton';
import { defError, defSuccess, NextAxios } from 'src/axios';
import { IamportResponse, RequestPayment } from 'recoilStates/payment';

import firebase from 'firebase';
import 'firebase/messaging'

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
  const [index, setIndex] = useState<number>(0);
  const [init, setInit] = useState<boolean>(true);
  useEffect(() => {
    if(!init) return;
    setInit(false);
    if(!IMP) return;

    IMP.init('imp32203738')
    NextAxios().post('http://localhost:3000/users/sign/in', {
      identity: "user-1",
      password: "1234"
    }).then(res => {
      console.log('성공');
    }).catch(err =>{
      const {data} = defError(err);
      console.log('실패', data);
    })


    if(!firebase) return;

    const fbConfig = {
      apiKey: "AIzaSyB0rIZZDP7Ba6ICFo27Nx2ye6CbRF-2HuQ",
      authDomain: "peng-d67b0.firebaseapp.com",
      databaseURL: "https://peng-d67b0.firebaseio.com",
      projectId: "peng-d67b0",
      storageBucket: "peng-d67b0.appspot.com",
      messagingSenderId: "347758805174",
      appId: "1:347758805174:web:494f1515bd832751"
    };

    // Initialize Firebase
    // if(Firebase.auth() &&  Firebase.) return ;

    if (!firebase.apps.length)
      firebase.initializeApp(fbConfig);
    else 
      firebase.app();
    

    const messaging = firebase.messaging();
    messaging.getToken({vapidKey: 'BPZGx3Nq2Y8uwIYalq48Wk_SYr9ihhPvtykIrtL4mCjvov0KwiVuKUEW3AYglrUgEvY9izAxdQMfLmkZJzQcWV0'})
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      })
    messaging.onMessage((payload) => {
      console.log(payload.notification.title);
      console.log(payload.notification.body);
    })

  })

  const onSave = () => 
    setTempList(clone(list))

  const reqPay = () => {
    NextAxios()
    .post(`http://localhost:3000/payments/dummy`, {
      point: 450, 
      paymentType: "iamport",
      paymentPg: 'html5_inicis',
      paymentMethod: 'vcard', // 'vcard' 'vbank',
      // buyer: {
      //   refundCode: '88', //은행 코드 https://api.iamport.kr/ 
      //   refundTitle: '은행명', // 중요하지 않음. 그러나 필수
      //   refundNumber: '계좌번호',
      //   refundName: '계좌주'
      // }
    })
    .then(res => {
      const {data} = defSuccess<RequestPayment>(res)
      const {histories, uk, title: produtName} = data;
      const extPayHistory = histories.find(h => h.externalPayment);
      if(!extPayHistory || !extPayHistory.externalPayment){
        alert('데이터가 없습니다');
        return;
      }
      const {pg, method, price, buyer } = extPayHistory.externalPayment;
      if(!buyer){
        alert('유저 정보가 없습니다');
        return;
      }
      const {name, tel, email} = buyer;
      
      IMP.request_pay({
        pg,
        pay_method: method,
        merchant_uid: uk,
        name: produtName,
        amount: price,
        buyer_email: email,
        buyer_name: name,
        buyer_tel: tel
      }, (rsp:IamportResponse) => {
        console.log(rsp);
        NextAxios().patch(`http://localhost:3000/payments/${uk}/status`, {
          isApplyID: rsp.success ? 1 : -2
        }).then(patchRes => {
          const {data: patchData} = defSuccess<RequestPayment>(patchRes);
          console.log(patchData);
        }).catch(patchErr => {
          const {data: patchData} = defError(patchErr);
          console.log(patchData);
        })

      })
    }).catch(err => {
      const {data} = defError(err);
      console.log(data);
    })

  }

  //   dispatch(todoActions.SET_TEMP_LIST(list))
  

  return <Main>
    <Box width="250px" style={{margin: '0 auto'}}>
      <LineSwiper index={index} onClick={_ => setIndex(index+1)} >
        <AspectRatioBox width="250px" style={{backgroundColor:'red'}} aspectRatio={0.5625}>
          첫번째
        </AspectRatioBox>
        <AspectRatioBox width="250px" style={{backgroundColor:'yellow'}} aspectRatio={0.75}>
          두번째
        </AspectRatioBox>
        <AspectRatioBox width="250px" style={{backgroundColor:'green'}} aspectRatio={0.5625}>
          세번째
        </AspectRatioBox>
      </LineSwiper>

      <GoogleButton />
      <KakaoButton />
      <NaverButton />
      <Button onClick={reqPay}>결제 하기</Button>

    </Box>


    <Dialog 
      className={classes.container}
      open={false} 
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