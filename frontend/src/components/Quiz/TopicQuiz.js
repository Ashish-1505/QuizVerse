import React, { useEffect ,useState} from 'react'
import QuizCard from './QuizCard'
import { Box, Center, Grid, Heading, Stack, VStack, useToast } from '@chakra-ui/react'
import { useAppContext } from '../../context/appContext';
import  io from 'socket.io-client';
import axios from 'axios';
const ENDPOINT='http://localhost:5000';
var socket;
const TopicQuiz = () => {
  const [quiz, setQuizzes] = useState([]);
  const {user}=useAppContext()
  const[socketConnected,setSocketConnected]=useState(false)
  const toast=useToast()
  const [alert,setAlert]=useState(false)
useEffect(() => {
    socket=io(ENDPOINT,{
      transports:["websocket","polling"]
    }); 
    socket.emit("setup",user);
    socket.on("connected",()=>{
      console.log('Connected to socket.io');
    }); 
    socket.on('deletequiz', () => {
      setAlert(true)
    });
}, [])

  useEffect(() => {
   fetch()
  }, [alert])

  const fetch=async()=>{
    if(alert){
      toast({
        title: "Admin deleted a quiz!",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    if(localStorage.getItem('quizId')){
      localStorage.removeItem('quizId')
    }
      try {
        const {data}=await axios.get('/api/v1/quiz/getallquizes')
        setQuizzes(data)
      } catch (error) {
        console.error('Failed to fetch quizzes', error);
      }
      setAlert(false)
  }

  return (  
    <Box>
    <VStack alignItems={'center'}>
        <Heading mt={4}>Available tests</Heading>
        <Grid templateColumns={['1fr', '1fr 1fr 1fr']} gridGap={"50px"} >
        {quiz.map((q) => {
            return <QuizCard key={q._id} title={q.title} description={q.description} id={q._id}/>
        })}                                                    
        </Grid>  
    </VStack>
    </Box>
  ) 
} 
  
export default TopicQuiz 