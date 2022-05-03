import { Box, Container, FormControl, TextField } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react'
import SendIcon from '@mui/icons-material/Send';
import SentChatText from './SentChatText';
import ReceivedChatText from './ReceivedChatText';
import { useAuth0 } from "@auth0/auth0-react";
import useChatScroll from "../hooks/useChatRef"


interface IMessage {
    createdAt: Date;
    id: number;
    msg_text: string;
    sent_by: string;
    sent_to: string;
    updatedAt: Date;
}



function Chats({
  messages,
  messageString,
  sendNewMessage,
  handleSnackAlert
}: {
  messages?: IMessage [];
  messageString: string;
  sendNewMessage:any
  handleSnackAlert:any;
}) {
  const [messageValue, setMessageValue] = useState("")
  const {user} = useAuth0()
  const chatRef = useRef<HTMLDivElement>(null)
  const ref = useChatScroll(messages)


  const  handleMessageInput = (event:any)=>{
    setMessageValue(event.target.value)
  }
 useEffect(()=>{
   const scroll =()=>{
    if(chatRef.current){
      chatRef.current.scrollIntoView({ block: "end", inline: "nearest"})
    }
   }
   scroll()
 
 },[messages])
  return (
    <Box
      style={{
        position: "relative",
        width: "100%",
        height: "2vh",
        maxWidth: "100rem",
        minWidth: "40rem",
        marginBottom:"300vh"
      }}
    >
      <Box sx={{ height: "73vh", overflowY: "scroll" }}>
        <div ref={chatRef}>
        {messages?.length &&
          messages.map((element:IMessage)=>(
            <>
            {element?. sent_by===user?.email &&
            (<SentChatText chat ={element}/>)
            }
            {
              element?. sent_by!==user?.email &&
              (<ReceivedChatText chat ={element}/>)
            }
            </>
          ))
        }
        </div>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "73vh",
          left: "0vw",
          width: "94%",
          display: "flex",
          justifyContent: "center",
          zIndex: "100",
          backgroundColor: "#f7f7f7",
          marginRight:"10vw"
        }}
      >
        <FormControl sx={{ width: "30vw", margin: "5rem" }}>
          <TextField 
          onChange={handleMessageInput} 
          value={messageValue} />
        </FormControl>

        <SendIcon
          sx={{ fontSize: "4.5rem", margin: "auto 0.5rem", cursor: "pointer" }}
          onClick={()=>{sendNewMessage(messageValue); setMessageValue("")}}
        />
      </Box>
    </Box>
  );
}

export default Chats;
