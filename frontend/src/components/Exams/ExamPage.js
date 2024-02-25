import React, { useState, useEffect } from 'react';
import { Box, Heading, List, ListItem, Text, Radio, RadioGroup, Button, useToast,CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import { useAppContext } from '../../context/appContext';
import axios from 'axios';
import ScoreCard from '../Pages/ScoreCard';
import Loading from '../Pages/Loading';

import {useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
const ExamPage = () => {
  const { questions, setQuestions, refresh, setRefresh, flag, setFlag, correct, setCorrect, isSubmitClicked, setIsSubmitClicked ,user} = useAppContext();

  const navigate=useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const exam=localStorage.getItem("examData")
  const examData = JSON.parse(exam)
  const userObj=localStorage.getItem("userDetails");
  const userDetails=JSON.parse(userObj)
  const [showAlert, setShowAlert] = useState(false);
  const [isSelected,setIsSelected]=useState(false)
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(examData.duration*60); // 60 minutes timer
  const [isLoading, setLoading] = useState(false);
  const [finish, setFinish] = useState(false);

  const [confirmSubmit, setConfirmSubmit] = useState(false);

  const toast = useToast();
  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;
  console.log(isSubmitClicked);
  
  const storedId = localStorage.getItem('examId');
  useEffect(() => { 
    const getQuestions = async () => {
      if (refresh === true) {
        setCount(0);
        setRefresh(false);
        setCorrect(false);
        setTimer(examData.duration* 60); // Reset the timer
      }
      try {
        setFlag(false)
        setLoading(true);
        const { data } = await axios.get(`/api/v1/quiz/getAllExamQuestions/${storedId}`);
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.log("error occured");
      }
    };
    getQuestions();
  }, [refresh]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      submitTest()
      handleClick(); 
    }
  }, [timer]);

  const handleOptionChange = (questionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].selectedOption = value;
    setQuestions(updatedQuestions);
  };

  const submitTest = () => {
    setIsSubmitClicked(true);
    toast({
      title: "Time is over. Your test has been automatically submitted.",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };


  const handleClick = () => {
    if (count >= questions.length) {
      setCount(0);
      return;
    }
    questions.map((question, questionIndex) => {
      var idx = question.correctOptionIndex;
      var value = question.options[idx];
      var ans = question.selectedOption;
      if (ans === value) {
        question.result = "Correct";
        setCount(count => count + 1);
      } else {
        question.result = "Wrong";
      }
        
    });
    setFlag(true);
    onOpen()
  }

  const saveResult=async()=>{
    try {
      const testResult= {
        createdBy:examData.createdBy,
        examId:examData._id,
        examTitle:examData.title,
        name:userDetails.name,
        rollno:userDetails.rollNumber,
        email:user.email,
        maxScore:questions.length,
        score:count,
      };
      await axios.post("/api/v1/quiz/saveResult",testResult);
      toast({
        title: "Your test is submitted Successfully!!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Your test is not submitted!!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    
    if(localStorage.getItem("examData")){
      localStorage.removeItem("examData")
    }
    else if(localStorage.getItem("examId")){
      localStorage.removeItem("examId")
    }
    else if(localStorage.getItem("userDetails")){
      localStorage.removeItem("userDetails")
    }
    navigate("/")
    
  }


  
  

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit=()=>{
    setRefresh(true)
    setFlag(false)
    setIsSubmitClicked(false)
  }

  const handleOptionClick = (questionIndex, optionIndex) => {
    // console.log(optionIndex);
    setIsSelected(true)
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].selectedOption = updatedQuestions[questionIndex].options[optionIndex];
    setQuestions(updatedQuestions);
  };

  return (
    <Box height={"100%"}>
      {isLoading ? <Loading /> : <Box maxWidth="800px" margin="auto" p="4" mb={10} display={"flex"} flexDir={["column", "row"]} justifyContent={"space-arround"} >
        <List spacing="4" >
        <Heading as="h1" size="lg" mb="4">Exam Questions</Heading>
        {flag?<></>:<Box bg="gray.900" color="white" p="4" borderRadius="md" textAlign="center" mb="4" display={"flex"} justifyContent={"center"}
        position="sticky"
        top="0"
        zIndex="1000"
        
       >
          <Box bg="blue.500" borderRadius="md" p="2" mr="2" fontWeight={"bold"}>
        {hours}
      </Box>
      <Box bg="blue.500" borderRadius="md" p="2" mr="2" fontWeight={"bold"}>
        {minutes}
      </Box>
      <Box bg="blue.500" borderRadius="md" p="2" fontWeight={"bold"}>
        {seconds}
      </Box>
          </Box>}
          {questions.map((question, questionIndex) => (
            <ListItem key={question._id} p="4" borderWidth="1px" borderColor="gray.200" maxW="xl"
              overflow="hidden"
              boxShadow="md"
              bg="gray.800">
              <Heading as="h2" size="md" mb="2" color={"white"}>{question.question}</Heading>
              <Text fontWeight="bold">Options:</Text> 
              <RadioGroup
                onChange={(value) => handleOptionChange(questionIndex, value)}
                value={question.selectedOption || ''}
                variant={"primary"}
              >
                <List styleType="none" ml="4">
                  {question.options.map((option, index) => (
                    <ListItem key={index} bg={correct && index === question.correctOptionIndex ? 'green.200' : question.selectedOption === option ? 'red.600' : ''}  borderRadius="md" borderWidth="2px" p="2" mb="2"  _hover={!question.selectedOption || question.selectedOption !== option ? { bg: "gray.500" } : {}} cursor="pointer" color={"white"} onClick={() => handleOptionClick(questionIndex, index)}>
                      <Radio value={option}>{option}</Radio>
                    </ListItem>
                  ))}
                </List>
              </RadioGroup>
            </ListItem>
          ))}
          <Button bg={'green.500'} color={"white"} alignItems={"center"} mt={5} mb={10} onClick={handleClick} isDisabled={isSubmitClicked}>Submit</Button>
        </List>
        
      </Box>
      }
      <Box>
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Submit Exam</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to submit the exam?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="red" ml={3} onClick={saveResult}>
                Finish
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
    </Box>
  );
};

export default ExamPage;
