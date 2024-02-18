import React, { useEffect,useState} from 'react'
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, useDisclosure, FormControl, FormLabel, Input, Stack,ScrollView, HStack,Heading,useToast } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import axios from 'axios';
import { useAppContext } from '../../context/appContext';
import  io  from 'socket.io-client';
const ENDPOINT='https://quizverse.onrender.com/';
var socket;
const AllQuizes = () => {

  const toast=useToast()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '',''], correctOptionIndex: 0 }]);
const [quizzes, setQuizzes] = useState([]);
const [flag,setFlag]=useState(false)
const[socketConnected,setSocketConnected]=useState(false)
const {user}=useAppContext()
const { isOpen, onOpen, onClose } = useDisclosure()
useEffect(() => {
  socket=io(ENDPOINT,{
    transports:["websocket","polling"]
  }); 
  socket.emit("setup",user);
  socket.on("connected",()=>{
    console.log('Connected to socket.io');
  });
  socket.on('deletequiz', () => {
    fetch();
  });
}, [])

  useEffect(() => {
   fetch()
  }, [flag])

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
  const handleUpdateClick=async(quizId,title,description)=>{
    setTitle(title)
    setDescription(description)
    onOpen()
    try {
      const {data}=await axios.get(`/api/v1/quiz/getallquestions/${quizId}`)
      setQuestions(data)
    } catch (error) {
      console.log("error occured");
    }
  }
  const handleSubmit=async(quizId)=>{
    setFlag(true)
    try {
      await axios.put(`/api/v1/quiz/updatequiz/${quizId}`,{
        title:title,
        description:description,
        questions:questions
      })
      onClose()
      setFlag(false)
    } catch (error) {
      console.log("Some error occured");
    }
  }

  const fetch=async()=>{
      try {
        const {data}=await axios.get('/api/v1/quiz/getallquizes')
        setQuizzes(data)
      } catch (error) {
        console.error('Failed to fetch quizzes', error);
      } 
       
  }
  const handleClick=async(quizid)=>{

    try {
        // setFlag(true)
        await axios.delete(`/api/v1/quiz/deletequiz/${quizid}`)
        // setFlag(false)
    } catch (error) {
        console.log("Cant delete quiz");
    }
  }
  return (
    <Box shadow="lg" rounded="md" overflow="auto">
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Quiz ID</Th>
          <Th>Title</Th>
          <Th>Description</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {quizzes.map((quiz) => (
          <Tr key={quiz._id}>
            <Td>{quiz._id}</Td>
            <Td>{quiz.title}</Td>
            <Td>{quiz.description}</Td>
            <Td>
              <Button colorScheme="red" variant="outline" mr={2} onClick={()=>handleClick(quiz._id)}>
                Delete
              </Button>
              <Button colorScheme="blue" onClick={()=>handleUpdateClick(quiz._id,quiz.title,quiz.description)} variant="outline" >
                Update
              </Button>
              <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Quiz</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
          <Box maxWidth="700px" maxHeight={["300px","500px"]} overflowY="auto" margin={"auto"} mb={10} mt={10}>
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
        <Button colorScheme="teal" onClick={handleAddQuestion}>
        Add Question
      </Button>
    </HStack>

    </Box>
    
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='green' variant='ghost' onClick={()=>handleSubmit(quiz._id)}>Update</Button>
          </ModalFooter>
        </ModalContent>
        
      </Modal>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>

  </Box>

  )
}

export default AllQuizes