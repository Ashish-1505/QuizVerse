import React from 'react';
import { Box, Flex, FormControl, FormLabel, Input, Button, Heading, Text,useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react'
import { useAppContext } from '../../context/appContext';

const initialState={
  name:'',
  email:'',
  password:'',
  isMember: true,
}
const Register = () => {
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
    if(!email || !password ||  !name){
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
      endPoint:'register',
    })

    // console.log(user);
  } 
  // useEffect(() => {
  //     if(user && user.verified==true){
  //       navigate("/")
  //     }else{
  //       navigate("/verifyotp")
  //     }
  // }, [user,navigate])
  
  return (
    <Flex align="center" justify="center" height="100vh">
      <Box p={8} borderWidth={1} borderRadius="md" boxShadow="lg">
        <Box textAlign="center" mb={6}>
          <Heading size="lg">Register</Heading>
        </Box>
        <form onSubmit={OnClickHandler}>
        <FormControl mb={4} >
            <FormLabel>Name</FormLabel>
            <Input type="text" placeholder="Enter your name" onChange={handleChange} name="name" value={values.name}/>
          </FormControl>
          <FormControl mb={4}  >
            <FormLabel>Email address</FormLabel>
            <Input type="email" placeholder="Enter your email" onChange={handleChange} name="email" value={values.email} />
          </FormControl>
          <FormControl mb={4} >
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" onChange={handleChange} name="password" value={values.password}/>
          </FormControl>
          <Button type="submit" isLoading={isLoading} colorScheme="teal"  mr={4} width={'full'}>Register</Button>
          <Box my={'4'}>
            Already Registered?{' '}
            <Link to="/login">
              <Button color={'orange'} variant="link" >
                Login
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </Box>
    </Flex>
  );
};

export default Register;
