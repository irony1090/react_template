
import {
  createMuiTheme
} from '@material-ui/core/styles'
import {
  ButtonProps,
  
} from '@material-ui/core'
  


export const defButtonProps:ButtonProps = {
  variant: 'contained',
  size: 'small'
}

export default createMuiTheme({
  overrides:{
    MuiButton: {
      root: {
        minWidth: '70px'
      }
    },
    MuiGrid: {
      root: {
        '&.spacer': {
          flexGrow: 1
        }
      }
    }
  }
})