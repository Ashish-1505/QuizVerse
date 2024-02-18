import React, { useState ,useEffect} from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import ShowInstuctions from './ShowInstuctions';
import { useAppContext } from '../../context/appContext';
const QuizCard = ({title, description, id }) => {
 const{getAllQuizId}=useAppContext()
  const navigate=useNavigate()
  const handleTestButtonClick = (id) => {
    getAllQuizId(id)
  };
  const LinkButton = ({ url = '/', title = 'Home' }) => (
    <Link to={url}>
      <Button colorScheme="blue" onClick={()=>handleTestButtonClick(id)}>{title}</Button>
    </Link>
  );
  
  return (
    <div>
  <Box
      bg="#EAEAEA"
      boxShadow="md"
      p={4}
      borderRadius="md"
      width="300px"
      mt={4}
      mb={20}
    >
      <Heading as="h2" size="lg" mb={2}>
        {title}
      </Heading>
      <Text mb={4}>{description}</Text>
      <LinkButton url='/quiz' title='Attempt'/>
    </Box>
    </div>
  );
  
};

export default QuizCard;
