import { Avatar, Box, Card, TextField } from '@mui/material'
import React from 'react'

function contacts() {

    const contacts = ['stephen','fred', 'james']

  return (
    <>
    <Box sx={{textAlign:"center",margin:"2rem"}}>Contacts</Box>
    <Box sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <TextField
        type="text"
        label="Search "
        
        />
    </Box>
    <Box sx={{height:"100vh", overflowY:"scroll"}}>
          <Card elevation={0} sx={{margin:"2rem"}}>
              {contacts?.length && contacts.map(element=> (
                  <Box sx={{display:"flex",justifyContent:"flex-start", alignItems:"center"}}>
                      <Avatar/><span>{element}</span>
                  </Box>
              )) }

          </Card>

      </Box>
    </>
  )
}

export default contacts