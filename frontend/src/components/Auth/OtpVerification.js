import React, { useState } from 'react';
import {
  Box,
  Heading,
  Stack,
  Button,
  PinInput,
  PinInputField,
  Center
  ,useToast
} from '@chakra-ui/react';
import { useAppContext } from '../../context/appContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const navigate=useNavigate()
  const {user}=useAppContext()
  const [loading, setLoading] = useState(false)
  const toast=useToast()
  const handleSubmit = async () => {
    setLoading(true)
    const {data}=await axios.post('/api/v1/auth/verifyOTP',{
        userId:user._id,
        otp:otp
    })
    console.log(data); 
    if(data.status==="Verified"){
      const storedUserJSON = localStorage.getItem('user');
      if (storedUserJSON) {
        const storedUser = JSON.parse(storedUserJSON);
        
        // Update the verification status in the user object
        storedUser.verified = true;
        
        // Store the updated user object back in localStorage
        localStorage.setItem('user', JSON.stringify(storedUser));
        if(user.role==='user') navigate("/")
        else navigate("/dashboard")
      } 
      toast({
        title: "Email Verified Successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
        
    }else{
      toast({
        title: "Please enter correct otp",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    setLoading(false)
  };
 
  return (
    <Center>
    <Box p={4} marginTop={"200px"} alignItems={"center"}>
      <Heading size={["sm","lg"]} marginBottom={4}>Enter 4-Digit OTP</Heading>
      <Stack spacing={4} align="center" display={"flex"} flexDir={"row"}>
      <PinInput
      value={otp} 
      onChange={(value) => setOtp(value)}
      autoFocus
      size="lg"
      onBlur={(value) => {
        if (value.length === 4) {
          handleSubmit();
        }
      }}
      type="alphanumeric"
      pattern="[0-9]*"
      inputMode="numeric"
    >
      <PinInputField />
      <PinInputField />
      <PinInputField />
      <PinInputField />
</PinInput>
        <Button isLoading={loading} colorScheme="blue" size="lg" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </Box>
    </Center>
  );
};

export default OtpPage;
