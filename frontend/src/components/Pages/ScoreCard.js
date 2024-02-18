import React from 'react';
import { Box, Text, Heading, Button } from '@chakra-ui/react';
import { useAppContext } from '../../context/appContext';

const ScoreCard = ({score, totalQuestions }) => {
    const {setRefresh,flag,setFlag,correct,setCorrect,setIsSubmitClicked,IsSubmitClicked}=useAppContext()
    const handleSubmit=()=>{
        setRefresh(true)
        setFlag(false)
        setIsSubmitClicked(false)
    }
    const handleCorrect=()=>{
        setCorrect(true)
    }
  return (
    <Box maxW={"sm"} height={"40vh"} borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} boxShadow="md"   mt={["100px","150px"]}  fontSize={"2xl"} marginBottom={["10"]} bg={"gray.600"}>
      <Heading as="h3" size="lg" mb={4} color={"white"}>
        Quiz Result
      </Heading>
      <Text mb={4} color={"white"}>
        Your score: {score} / {totalQuestions}
      </Text>
      <Button bg={"green.600"} colorScheme="teal" onClick={handleSubmit} mt={["1rem","5.5rem"]}>
        Retake Quiz
      </Button>
      <Button bg={"red.600"} marginLeft={["1px","3px"]} mt={["1.2rem","5.5rem"]} colorScheme="teal" onClick={handleCorrect}>
        Check Correct answers
      </Button>
    </Box>
  );
};

export default ScoreCard;
