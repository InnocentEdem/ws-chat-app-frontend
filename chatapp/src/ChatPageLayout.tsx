import { Box } from '@mui/material'
import React from 'react'
import Chats from './chats'
import Contacts from './contacts'


function ChatPageLayout() {
  return (
      <>
      <Box sx={{display:"flex", position:"fixed", width:"100%"}}>
        <Box sx={{ width:"20%"}}>
            <Contacts/>
        </Box>
        <Box sx={{ width:"80%"}}>
            <Chats/>
        </Box>

      </Box>
      </>
      )
}

export default ChatPageLayout