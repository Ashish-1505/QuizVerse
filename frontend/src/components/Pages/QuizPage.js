import React, { useState, useEffect} from 'react';
import { Box, Heading, List, ListItem, Text ,Radio,RadioGroup, Button,useToast} from '@chakra-ui/react';
import { useAppContext } from '../../context/appContext';
import axios from 'axios';
import ScoreCard from './ScoreCard';
import Loading from './Loading';

const QuizPage = () => {
  const {questions,setQuestions,refresh,setRefresh,flag,setFlag,correct,setCorrect}=useAppContext()
  // const [flag,setFlag]=useState(false);
  var [count,setCount]=useState(0)
  const [isLoading,setLoading]=useState(false)
  const toast=useToast();
  useEffect(() => {
    const getQuestions=async()=>{
      if(refresh===true){
        setCount(0);
        setRefresh(false)
        setCorrect(false)
      }
      const storedId=localStorage.getItem('quizId');
      try {
        setLoading(true)
        const {data}=await axios.get(`/api/v1/quiz/getallquestions/${storedId}`)
        setQuestions(data)
        setLoading(false)
      } catch (error) {
        console.log("error occured");
      }
    } 
    getQuestions()
  }, [refresh]);  
  
   const handleOptionChange = (questionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].selectedOption = value;
    setQuestions(updatedQuestions);
  };
  const handleClick=()=>{
    if(count>=questions.length){
      setCount(0)
      return;
    }
    questions.map((question,questionIndex)=>{
      var idx=question.correctOptionIndex
      var value=question.options[idx];
      var ans=question.selectedOption
      if(ans===value){
        question.result="Correct"
        setCount(count=count+1)
      }else{
        question.result="Wrong"
      }
      setFlag(true)
    })
    if(window.innerWidth<748){
      console.log("1");
      toast({
        title: "Please scroll down to check your score!",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }
  
  return (
    <Box bg={"gray.100"}>
    {isLoading?<Loading/>:<Box maxWidth="800px" margin="auto" p="4"  mb={10} display={"flex"} flexDir={["column","row"]} justifyContent={"space-arround"} >
            
      <List spacing="4" > 
      <Heading as="h1" size="lg" mb="4">Quiz Questions</Heading>
        {questions.map((question, questionIndex) => (
          <ListItem key={question._id} p="4" borderWidth="1px" borderColor="gray.200" maxW="sm"
        
          overflow="hidden"
          boxShadow="md"
          bg="white">
            <Heading as="h2" size="md" mb="2">{question.question}</Heading>
            <Text fontWeight="bold">Options:</Text>
            <RadioGroup
              onChange={(value) => handleOptionChange(questionIndex, value)}
              value={question.selectedOption || ''}
              variant={"primary"}
            >
              <List styleType="none" ml="4">
                {question.options.map((option, index) => (
                  <ListItem key={index} bg={correct&&index===question.correctOptionIndex?'green.200':""}>
                    <Radio value={option}>{option}</Radio>
                  </ListItem> 
                ))}
              </List>
            </RadioGroup>
            {flag?<Box mt={"5"} bg={question.result==="Correct"?"green.200":"red.200"} borderRadius={"4px"} textAlign={"center"}>{question.result}</Box>:""}
          </ListItem>
        ))}
        <Button bg={'yellow.200'} alignItems={"center"} mt={5} mb={10} onClick={handleClick}>Submit</Button>
      </List>
      
    { flag? <Box >
        <ScoreCard score={count} totalQuestions={questions.length}/>
      </Box>:""}
    </Box>}
    </Box>
  );
};

export default QuizPage;
