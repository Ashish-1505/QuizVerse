import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import axios from 'axios';

const Instructions = ({ title, description, numQuestions,Id }) => {
  const {getAllQuizId} =useAppContext()
  const [questions, setQuestions] = useState([])
  const navigate=useNavigate();
  const handleClick=()=>{
    getAllQuizId(Id)
    navigate("/quiz");
  }
  useEffect(() => {
    const get=async()=>{
      try {
        const {data}=await axios.get(`/api/v1/quiz/getallquestions/${Id}`)
        setQuestions(data)
      } catch (error) {
        console.log("error occured");
      }
  }
  get()
  }, [])
  
  return (
    <Box bg="white" boxShadow="md" p={4} borderRadius="md" width="300px" mb={20}>
      <Heading as="h2" size="lg" mb={2}>
        {title}
      </Heading>
      {/* <Text mb={2}>{description}</Text> */}
      <Text mb={2}>{`${questions.length} questions`}</Text>
       <Button colorScheme='blue' onClick={handleClick}>Start Test</Button> 
    </Box>
  );
};

export default Instructions;
