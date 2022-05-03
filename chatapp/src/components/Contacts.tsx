import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  FormControl,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth0 } from "@auth0/auth0-react";
import contactStyle from "../styles.module.css"
import MoreVertIcon from '@mui/icons-material/MoreVert'

interface IUser {
  nickname: string;
  name: string;
  picture: string;
  updated_at: Date;
  email: string;
  email_verified: boolean;
  sub: string;
}

function Contacts({ contactList, fetchOneChat, setRecipientEmail,blockUser,blockList,unBlockUser}: { contactList?: any, fetchOneChat:any, setRecipientEmail:any,blockUser:any,blockList:string[]|undefined, unBlockUser:any }) {
  const { user, isAuthenticated } = useAuth0();
  const [self, setSelf] = useState<IUser>();
  const [toggleMenu, setToggleMenu] = useState(false)
  const [openDialog, setOpenDialog] = React.useState(false);
  const [blockUserIndex, setBlockUserIndex] = useState<number>()
  const [modalText,setModalText] = useState({heading:" ",text:" "})


  const[ activeContact, setActiveContact] = useState(0)
  console.log(contactList);
  const setStyle = (value:number)=>{
    setActiveContact(value)
    setRecipientEmail(contactList[value])
    fetchOneChat(contactList[value])
    console.log(value);
  }
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event?:any) => {
    if(event){event.stopPropagation()}
    
    setAnchorEl(null);
  };
  const handleSelection = (index:number) =>{
      handleClose()
      setBlockUserIndex(index)
      if(blockList?.includes(contactList[index])){
        setModalText(prev => {return {...prev,heading:"Unblock User?", text:"Do you want to unblock this User?"}})
      }
      else{
        setModalText(prev => {return {...prev,heading:"Block User?", text:"Do you want to block this User?"}})
      }
      handleClickOpen()
  }
  const handleBlockUserAccept = ()=>{
      
    if( typeof blockUserIndex==="number"){

      if(blockList?.includes(contactList[blockUserIndex])){
        unBlockUser(contactList[blockUserIndex])

      }else{
        blockUser(contactList[blockUserIndex])
      }
      setTimeout(()=>{
        window.location.reload()
      },2000)
    

    }

    handleCloseDialog()

  }

  return (
    <Box>
      <Card sx={{ margin: "5rem", height: "92vh" }}>
        <Box
          sx={{
            display: "flex",
            justifyItems: "center",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            margin: "5rem 0",
          }}
        >
          <Avatar src={user?.picture}></Avatar>
          <Box sx={{ margin: "1rem 0 4rem 0" }}>
            <b>Account:</b> {user?.email}
          </Box>
          <hr
            style={{
              border: "solid 1px #f7f7f7",
              width: "80%",
              margin: "0 10rem",
            }}
          ></hr>
        </Box>
        {/* <Box sx={{display:"flex", justifyContent:"center", alignItems:"center"}}> */}
        {/* <FormControl
        sx={{margin:"8 5rem", width:"15vw"}}
      >
      <TextField
        type="text"
        size='small'
        label="Search "
        // InputProps={{
        //   endAdornment: <InputAdornment position="start"><SearchIcon sx={{fontSize:"2.5rem", cursor:"pointer"}}/></InputAdornment>,
        // }}
        
        
        />

      </FormControl> */}

        {/* </Box> */}
        <Box sx={{ textAlign: "center", margin: "5rem 0 1rem 0rem" }}>
          <b>Users Online</b>
        </Box>

        <Box sx={{ height: "100vh", overflowY: "scroll" }}>
          <Card elevation={0} sx={{ margin: "0rem 1rem" }}>
            {contactList?.length &&
              contactList.map((element: any,index:number) => (
                <Box
                  className = {index === activeContact? contactStyle.activeclass: contactStyle.inactiveclass}
                  onClick = {()=>setStyle(index)}
                  sx={{
                    display: "flex",
                    justifyContent: "space_between",
                    alignItems: "center",
                    margin: "2rem",
                    padding: "0.8rem",
                    borderRadius: "15px",
                    cursor:"pointer",
                    minWidth:"25rem"
                  }}
                >
                  <Avatar sx={{ marginRight: "3rem" }} />
                  <span style={{width:"60%"}}>{element}</span>
                  <Box
                    onClick={handleClick}
                    sx={{display:"flex", justifyContent:"flex-end"}}
                  >
                  <MoreVertIcon
                    sx={{marginLeft:"0rem",fontSize:"2.5rem"}}
                  />
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick = {()=>handleSelection(index)}>
                      {(blockList && blockList.includes(contactList[index])) ? "Unblock" : "Block"}
                    </MenuItem>
                  </Menu>
                  
              
                  </Box>
                </Box>
              ))}
          </Card>
        </Box>
      </Card>
      <Dialog
        open={openDialog}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{modalText?.heading}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          {modalText.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleBlockUserAccept}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Contacts;
