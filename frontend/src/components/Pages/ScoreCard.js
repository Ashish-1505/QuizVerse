import React from 'react';
import { Box, Text, Heading, Button } from '@chakra-ui/react';
import { useAppContext } from '../../context/appContext';

const ScoreCard = ({score, totalQuestions }) => {
    const {setRefresh,flag,setFlag,correct,setCorrect}=useAppContext()
    const handleSubmit=()=>{
        setRefresh(true)
        setFlag(false)
    }
    const handleCorrect=()=>{
        setCorrect(true)
    }
  return (
    <Box maxW="sm" maxHeight={"sm"} borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} boxShadow="md" bg="white" marginLeft={["10px","100px"]}  mt={["10px","50px"]}  fontSize={"2xl"} >
      <Heading as="h3" size="lg" mb={4}>
        Quiz Results
      </Heading>
      <Text mb={4}>
        Your score: {score} / {totalQuestions}
      </Text>
      <Button bg={"green.600"} colorScheme="teal" onClick={handleSubmit}>
        Retake Quiz
      </Button>
      <Button bg={"red.600"} colorScheme="teal" onClick={handleCorrect}>
        Check Correct answers
      </Button>
    </Box>
  );
};

export default ScoreCard;
