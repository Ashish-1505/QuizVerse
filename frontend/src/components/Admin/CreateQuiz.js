import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack,ScrollView, HStack,Heading,useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useAppContext } from '../../context/appContext';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '',''], correctOptionIndex: 0 }]);
  const toast=useToast()
  const{user}=useAppContext()
  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '',''], correctOptionIndex: 0 }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (questionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctOptionIndex = value; 
    setQuestions(updatedQuestions);
  };

 
const handleSubmit = async () => {
    if(!title || !description || !questions){
      toast({
        title: "Please Enter all the feilds!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return
    }
    const quizData = {
      title,
      description,
      questions,
      createdBy: user.name, // Replace with the appropriate user information
    };
  
    try {

      const response = await axios.post('/api/v1/quiz/createquiz', quizData);
      
      if (response.status === 201) {
        toast({
          title: "Quiz Created Successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setTitle('');
        setDescription('');
        setQuestions([{ question: '', options: ['', '', '',''], correctOptionIndex: 0 }]);

      } else {
        toast({
          title: "Error Occurred!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      toast({
        title: "Internal Server Error!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }; 
 
  return (
    <Box maxWidth="700px"  maxHeight="500px" overflowY="auto" margin={["10","auto"]} mb={10} mt={10} >
      <Heading marginBottom={"10"} marginTop={"10"}>Create Quiz</Heading>
      <FormControl marginBottom="4">
        <FormLabel>Title</FormLabel>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormControl>

      <FormControl marginBottom="4">
        <FormLabel>Description</FormLabel>
        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
      </FormControl>

      {questions.map((question, index) => (
        <Box key={index} marginBottom="4">
          <FormControl marginBottom="2">
            <FormLabel>Question #{index + 1}</FormLabel>
            <Input
              value={question.question}
              onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
            />
          </FormControl> 

          <Stack spacing="2">
            {question.options.map((option, optionIndex) => (
              <FormControl key={optionIndex}>
                <FormLabel>Option #{optionIndex + 1}</FormLabel>
                <Input
                  value={option}
                  onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                />
              </FormControl>
            ))}
          </Stack>

          <FormControl marginTop="2">
            <FormLabel>Correct Option</FormLabel>
            <Input
              type="number"
              value={question.correctOptionIndex}
              onChange={(e) => handleCorrectOptionChange(index, parseInt(e.target.value))}
            />
          </FormControl>
        </Box>
      ))}

    <HStack>
        <Button colorScheme="teal" onClick={handleAddQuestion} marginBottom={"10"}>
        Add Question
      </Button>

      <Button colorScheme="teal"  onClick={handleSubmit} marginBottom={"10"}>
        Submit Quiz
      </Button>
    </HStack>

    </Box>
  );
};

export default CreateQuiz;
