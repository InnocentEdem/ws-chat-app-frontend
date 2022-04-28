import React,{useState} from 'react'
import {Card, TextField,Box} from '@mui/material';

function Login() {
    const [userDetails,setUserDetails] = useState({email:"",password:""})

    const handleUserDetails = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setUserDetails((prev)=>{return {...prev,[event?.target?.name]:event.target.value}})
    }

    return (
        <>
            <Card>
                <TextField
                    label="Email"
                    name='email'
                    value={userDetails?.email}
                    onChange={handleUserDetails}

                />
                <TextField
                    label="Password"
                    name='password'
                    value={userDetails?.password}
                    onChange={handleUserDetails}

                />
                <Box>
                    Sign Up
                </Box>

            </Card>
        </>
    )
}

export default Login