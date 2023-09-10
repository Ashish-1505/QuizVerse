import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';

const UnauthorizedAccess = () => {
    const {user}=useAppContext()
  return (
    <Box
      textAlign="center"
      p={10}
      mx="auto"
      mt="100px"
      maxW="400px"
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bgColor="white"
    >
      <Heading as="h1" fontSize="2xl" mb={4}>
        Unauthorized Access
      </Heading>
      <Text fontSize="lg" mb={6}>
        You do not have permission to access this page.
      </Text>
      <Button
        colorScheme="teal"
        as={Link}
        to={user.role==='admin'?"/dashboard":"/"}
        _hover={{ bg: 'teal.400' }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default UnauthorizedAccess;
