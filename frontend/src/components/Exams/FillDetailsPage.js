import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { VStack, Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const FillDetailsPage = ({ selectedOptionName, onClose }) => {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [group, setGroup] = useState('');
  const [examCode, setExamCode] = useState('');
  const toast=useToast()
  const userDetails = {
    name,
    rollNumber,
    group
  };
  const exam=localStorage.getItem("examData")
  const examData = JSON.parse(exam)
  const storedId = localStorage.getItem('examId');
  useEffect(() => {
    const getExamDetails=async(examId)=>{
      try {
          const {data}= await axios.get(`/api/v1/quiz/examDetail/${storedId}`);
          localStorage.setItem("examData",JSON.stringify(data))
        } catch (error) {  
          console.error('Error Finding exam:', error); 
        }  
     }
     getExamDetails()
  }, [])
  

  const navigate=useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    if(examCode==examData.examCode){
       navigate("/exam")
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
    }
    toast({
      title: "Please enter the correct exam code.",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
   
    // onClose();
  };
  const CloseForm=()=>{
    localStorage.removeItem("examId")
    navigate("/collegeTest")
  }

  return (
    <VStack align="center" spacing="4" mt="8">
      <Box bg="gray.200" p="8" borderRadius="md" boxShadow="md" w="400px">
        <form onSubmit={handleSubmit}>
          <FormControl id="name" mb="4">
            <FormLabel>Name</FormLabel>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} background={"white"}/>
          </FormControl>
          <FormControl id="rollNumber" mb="4">
            <FormLabel>Roll Number</FormLabel>
            <Input type="text" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} background={"white"}/>
          </FormControl>
          <FormControl id="group" mb="4">
            <FormLabel>Exam Code</FormLabel>
            <Input type="text" value={examCode} onChange={(e) => setExamCode(e.target.value)} background={"white"}/>
          </FormControl>
          <FormControl id="group" mb="4">
            <FormLabel>Group</FormLabel>
            <Input type="text" value={group} onChange={(e) => setGroup(e.target.value)} background={"white"}/>
          </FormControl>
          <Button type="submit" colorScheme="blue">Submit</Button>
          <Button ml="2" onClick={CloseForm}>Cancel</Button>
        </form>
      </Box>
    </VStack>
  );
};

export default FillDetailsPage;
