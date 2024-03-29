import React, { useEffect ,useState} from 'react'
import QuizCard from './QuizCard'
import { Box, Center, Grid, Heading, Stack, VStack, useToast } from '@chakra-ui/react'
import { useAppContext } from '../../context/appContext';
import  io from 'socket.io-client';
import axios from 'axios';
import Loading from '../Pages/Loading';
const ENDPOINT='https://quizverse.onrender.com/';
var socket;
const TopicQuiz = () => {
  const [quiz, setQuizzes] = useState([]);
  const {user}=useAppContext()
  const[socketConnected,setSocketConnected]=useState(false)
  const toast=useToast()
  const [alert,setAlert]=useState(false)
  const [isLoading,setLoading]=useState(false)
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
    if(localStorage.getItem('examId')){
      localStorage.removeItem('examId')
    }
      try {
        setLoading(true)
        const {data}=await axios.get('/api/v1/quiz/getallquizes')
        setQuizzes(data)
        setLoading(false)
      } catch (error) {
        // console.error('Failed to fetch quizzes', error);
        toast({
          title: "Error Occured",
          status: "error",
          description:error.response?.data.message,
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
      setAlert(false)
  }

  return (  
    <Box>
{isLoading?<Loading/>:<VStack alignItems={'center'}>
        <Heading mt={4}>Available Quizes For Practice</Heading>
        <Grid templateColumns={['1fr', '1fr 1fr 1fr']} gridGap={"50px"} >
        {quiz.map((q) => {
            return <QuizCard key={q._id} title={q.title} description={q.description} id={q._id}/>
        })}                                                    
        </Grid>  
    </VStack>}
    </Box>
  ) 
} 
  
export default TopicQuiz 