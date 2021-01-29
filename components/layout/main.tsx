import {FC} from 'react'
import {
  Box
} from '@material-ui/core'



const Layout:FC = ({children, }) =>{
  return (
    <Box  width="100%">
      <main>{children}</main>
    </Box>
  )
}

export default Layout;