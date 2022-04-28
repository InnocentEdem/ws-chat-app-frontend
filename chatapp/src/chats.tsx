import { Box, FormControl, TextField } from '@mui/material'
import React from 'react'
import SendIcon from '@mui/icons-material/Send';

function chats() {
  return (
    <Box sx={{position:"relative", width:"100%", height:"100%", border:"solid 4px black"}}>        
        <Box sx={{position:"absolute",bottom:"15rem", left:"1rem"}}>
            <FormControl
            sx={{width:"60vw"}}>
            <TextField

            />

            </FormControl>

            <SendIcon sx={{fontSize:"4.5rem",margin:"auto 0.5rem",cursor:"pointer"}}/>

        </Box>
    </Box>
  )
}

export default chats