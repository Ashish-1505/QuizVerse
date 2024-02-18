import React from 'react';
import { Box, Flex, FormControl, FormLabel, Input, Button, Heading, Text, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react'
import { useAppContext } from '../../context/appContext';

const initialState={
  name:'',
  email:'',
  password:'',
  isMember: true,
}


const Login = () => {
  const navigate=useNavigate()
  const toast=useToast()
  const [values, setValues] = useState(initialState)
  const {user,isLoading,showAlert,displayAlert,registerUser,loginUser,setupUser}=useAppContext()
 
  const handleChange=(e)=>{
    setValues({...values,[e.target.name]:e.target.value})
  }
  const OnClickHandler=(e)=>{
    e.preventDefault()
    const {name,email,password,isMember}=values
    if(!email || !password ){
      toast({
        title: "Please enter all the fields!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return
    }

    const currentUser={name,email,password}
    setupUser({currentUser,
      endPoint:'login',
    })
    
  }
  useEffect(() => {
    if(user && user.verified===false){
      navigate("/verifyotp")
    }
    else if(user && user.role==='admin'){
      navigate("/dashboard")
    }else if(user && user.role==='user'){
      navigate("/")
    }
   else if(user && user.role==='college'){
    navigate("/collegeDashboard")
  }
}, [user,navigate])
  return (
    <Flex align="center" justify="center" height="100vh" >
      <Box p={8} borderWidth={1} borderRadius="md" boxShadow="lg" marginBottom={"100px"}>
        <Box textAlign="center" mb={6}>
          <Heading size="lg">Login</Heading>
        </Box>
        <form onSubmit={OnClickHandler}>
          <FormControl mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input type="email" placeholder="Enter your email"  onChange={handleChange} name="email" value={values.email} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" onChange={handleChange} name="password" value={values.password}/>
          </FormControl>
          <Button type="submit" isLoading={isLoading} bg={"blue.400"}  color={"white"}  mr={4} width={'full'}>Login</Button>
          <Box my={'4'}>
            New User?{' '}
            <Link to="/register">
              <Button color={'#2d3748'} variant="link">
                Sign Up
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
