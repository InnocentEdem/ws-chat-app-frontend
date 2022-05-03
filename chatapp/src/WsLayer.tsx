import React, { useEffect, useState } from 'react'
import ChatPageLayout from './ChatPageLayout'
import { IMessageEvent, w3cwebsocket as W3CWebsocket } from "websocket";
import { useAuth0 } from '@auth0/auth0-react';
import Api from "./components/services/api"
import useFetchMetaData from "./hooks/useFetchMetadata";



function WsLayer() {
 const {getAccessTokenSilently} = useAuth0()
 const [token, setToken] = useState("");
 const [ready, setReady] = useState(false)
 const userMetaData = useFetchMetaData()





    const show = async () => {
      const newToken = await getAccessTokenSilently({
        audience: `localhost:5003`,
        scope: "read:current_user",
      });
      
      setToken(newToken);      
    };


    const handleLiveMessages =  () => {
        
    const client = new W3CWebsocket(`ws://127.0.0.1:5003/websockets?check=${token}`);  
      return client
    };
      
      const registerToken = async () => {        
        try {
          const accessToken = await getAccessTokenSilently({
            audience: `localhost:5003`,
            scope: "read:current_user",
          });
          await Api("http://localhost:5003", accessToken).get("/authorized");
          handleLiveMessages();
        } catch (err) {}
      };
      useEffect(()=>{
        show();
        registerToken()
        // handleLiveMessages()
      },[])


  return (
    <>
    <ChatPageLayout client = {handleLiveMessages()}/>
    
    </>
  )
}

export default WsLayer


