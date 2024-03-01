import React, { useState,useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack,ScrollView, HStack,Heading,useToast,Select } from '@chakra-ui/react';
import axios from 'axios';
import { useAppContext } from '../../context/appContext';

const CreateExam = () => {

// const options = [
//         { value: '1', label: 'Harvard University' },
//         { value: '2', label: 'Stanford University' },
//         { value: '3', label: 'Massachusetts Institute of Technology (MIT)' },
//         // Add more college options as needed 
//       ];

  const [selectedOptionName, setSelectedOptionName] = useState('');
  const [selectedOption, setSelectedOption] = useState({});
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [examCode, setExamCode] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '',''], correctOptionIndex: 0 }]);
  const toast=useToast()
  const{user}=useAppContext()
  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '',''], correctOptionIndex: 0 }]);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const optionObject = options.find(option => `${option.name},${option.location}` === value);
    setSelectedOption(optionObject)
    setSelectedOptionName(value);
    console.log(selectedOptionName);
    // onSelect(value);
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
  console.log(examCode);
    if(!title || !duration || !examCode || !questions ){
      toast({
        title: "Please Enter all the feilds!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return
    }
    const examData = {
      title,
      duration,
      college:selectedOptionName,
      examCode,
      questions,
      createdBy: user._id, // Replace with the appropriate user information
    };
  
    try {

      const response = await axios.post('/api/v1/quiz/createcollegeexam', examData);
      
      if (response.status === 201) {
        toast({
          title: "Exam Created Successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setTitle('');
        setDuration('');
        setExamCode('')
        setSelectedOptionName('')
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


  const [options,setOptions]=useState([])
    useEffect(() => {
      const getColleges=async()=>{
        try {
          const {data} = await axios.get('/api/v1/quiz/getcolleges');
          setOptions(data)
          console.log(options);
        } catch (error) {  
          console.error('Error Finding college:', error); 
        } 
      }     
      getColleges();
    }, [])
 
  return (
    <Box maxWidth="700px"  maxHeight="500px" overflowY="auto" margin={["10","auto"]} mb={10} mt={10} >
      <Heading marginBottom={"10"} marginTop={"10"}>Create Exam</Heading>
      <FormControl marginBottom="4">
        <FormLabel>Title</FormLabel>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormControl>

      <FormControl marginBottom="4">
        <FormLabel>Duration(in minutes)</FormLabel>
        <Input value={duration} onChange={(e) => setDuration(e.target.value)} />
      </FormControl>

      <Box
        bg="yellow.700" // Dark gray background color
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        p="3"
        mb={4}
        mt={4}
      >
        <Select
          placeholder="Select College/University"
          value={selectedOptionName}
          onChange={handleChange}
          size="lg" // Increase size for larger dropdown
          variant="outline"
          focusBorderColor="yellow.400" // Change focus border color
          color="white" // Text color
        >
          {options.map((option) => (
            <option key={option._id} value={`${option.name},${option.location}`} style={{ color: 'black' }}>
              {option.name},{option.location}
            </option>
          ))} 
        </Select>
      </Box>  

      <FormControl marginBottom="4">
        <FormLabel>Exam Code</FormLabel>
        <Input value={examCode} onChange={(e) => setExamCode(e.target.value)} />
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
        <Button bg={"green.500"} color={"white"} onClick={handleAddQuestion} marginBottom={"10"}>
        Add Question
      </Button>

      <Button bg={"blue.500"} color={"white"}  onClick={handleSubmit} marginBottom={"10"}>
        Submit Quiz
      </Button>
    </HStack>

    </Box>
  );
};

export default CreateExam;
