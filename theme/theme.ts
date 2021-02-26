
import { createMuiTheme, Theme } from '@material-ui/core/styles'
import { ButtonProps, useMediaQuery, useTheme } from '@material-ui/core'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'
import {pxToRem} from 'src/util'


import {LayoutGrade, SIZE_INFO} from 'recoilStates/layout';
const {LG, MD, SM, XS} = SIZE_INFO;

const breakpoints = createBreakpoints({});

export type ComponentSize = 'sm' | 'md' | 'lg';
export type ComponentColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
export type LayoutType = {
  size?: ComponentSize
}

export const defButtonProps:ButtonProps = {
  variant: 'contained',
  size: 'small'
}

const defaultTheme = createMuiTheme({
  breakpoints: {
    values: {
      xs: XS.max,
      sm: SM.max,
      md: MD.max,
      lg: LG.max,
      xl: 1920
    }
  }
});

export default createMuiTheme({
  breakpoints:{
    ...defaultTheme.breakpoints
  },
  typography:{
    fontFamily:"roboto"
  },
  palette: {
    primary:{
      main: '#FEDE3D',
      contrastText: '#000'
    },
    secondary: {
      main:'#fff',
      contrastText: defaultTheme.palette.grey[900]
    }
  },
  overrides:{
    MuiFormGroup: {
      root: {
        '&[role="radiogroup"]': { display: 'block' }
      }
    },
    MuiButton: {
      root: {
        minWidth: '70px'
      },
      
    },
    MuiGrid: {
      root: {
        '&.spacer': {
          flexGrow: 1
        }
      }
    },
    MuiTypography:{
      root:{
          '&.bold': {
            fontWeight: 600
          },
          '&.regular': {
            fontWeight: 400
          },
          '&.light': {
            fontWeight: 300
          },
      },
      caption:{
        fontSize:pxToRem(14)
        ,[breakpoints.down(SM.max)]:{
          fontSize:pxToRem(12)
        }
        // ,fontFamily:'noto'
        ,fontWeight:500
        
      },
   
      body2:{
        fontSize:pxToRem(16)
        ,[breakpoints.down(SM.max)]:{
          fontSize:pxToRem(13)
        }
        // ,fontFamily:'noto'
        ,fontWeight:500
      },
         
      body1:{
        fontSize:pxToRem(20)
        ,[breakpoints.down(SM.max)]:{
          fontSize:pxToRem(16)
        }
        // ,fontFamily:'noto'
        ,fontWeight:500 
      },
      subtitle2:{
        fontSize:pxToRem(24)
        ,[breakpoints.down(SM.max)]:{
          fontSize:pxToRem(17)
        }
        // ,fontFamily:'noto'
        ,fontWeight:500
      },
      subtitle1:{
        fontSize:pxToRem(32)
        ,[breakpoints.down(SM.max)]:{
          fontSize:pxToRem(18)
        }
        // ,fontFamily:'noto'
        ,fontWeight:500
      },
     
      h6:{
        fontSize:pxToRem(40)
        ,[breakpoints.down(SM.max)]:{
          fontSize:pxToRem(21)
        }
        // ,fontFamily:'noto'
        ,fontWeight:500
      },
      h5:{//메인 섹션1 텍스트 사이즈
        fontSize:pxToRem(140)
        ,[breakpoints.down(SM.max)]:{
          fontSize:pxToRem(46)
        }
        // ,fontFamily:'noto'
        ,fontWeight:500
      },
      h4:{//pc 메인에서만 사용
        fontSize:pxToRem(60)
        // ,fontFamily:'noto'
        ,fontWeight:500
      },
    
    },
  }
})

// export const InputTheme = (theme: Theme): Theme => {
//   const newTheme = clone(theme);

//   if(!newTheme.overrides) return newTheme;

//   newTheme.overrides.MuiTextField = {
//     root: {
//       padding: theme.spacing(3),
//       borderRadius: theme.spacing(1),
//       '&.radius-xs'
//     }
//   }
//   return newTheme;
// }

export const secondTheme = createMuiTheme({

  palette: {
    primary:{
      main: '#FEDE3D',
      contrastText: '#000'
    },
    secondary: {
      main:'#000',
      contrastText: '#fff'
    }
  },
})

type UseLayoutGrade = {
  isDownSm: boolean,
  isDownXs:boolean,
  isMd: boolean,
  isUpMdAndIsDownLg: boolean,
  isUpLg: boolean
}
export const useLayoutGrade = (theme?: Theme ): UseLayoutGrade => {
  const theme_ = theme || useTheme();
  if(!theme_) return {isDownSm: false, isMd: false, isUpMdAndIsDownLg: false,isDownXs:false, isUpLg: false};


  const isUpSm = useMediaQuery(theme_.breakpoints.up(SIZE_INFO.SM.max));
  const isDownMd = useMediaQuery(theme_.breakpoints.down(SIZE_INFO.MD.max-0.01));
  const isMd = isUpSm && isDownMd;

  const isUpMd = useMediaQuery(theme_.breakpoints.up(SIZE_INFO.MD.max));
  const isDownLg = useMediaQuery(theme_.breakpoints.down(SIZE_INFO.LG.max));
  const isUpMdAndIsDownLg = isUpMd && isDownLg;

  // console.log( isUpSm, isDownMd, isMd)
  return {
    isDownSm: useMediaQuery(theme_.breakpoints.down(SIZE_INFO.SM.max-0.01)),
    isMd,  
    isUpMdAndIsDownLg,
    isDownXs: useMediaQuery(theme_.breakpoints.down(LayoutGrade.XS)),
      // useMediaQuery(theme_.breakpoints.up(SIZE_INFO.SM.max)) 
      // && useMediaQuery(theme_.breakpoints.up(SIZE_INFO.MD.max)),
    isUpLg: useMediaQuery(theme_.breakpoints.up(LayoutGrade.LG))
  }
}