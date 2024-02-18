import React, { useState } from 'react';
import { VStack, Box, FormControl, FormLabel, Input, Button, Heading, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';

const AddCollege = () => {
   const toast= useToast()
  const [collegeData, setCollegeData] = useState({
    name: '',
    location: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCollegeData({
      ...collegeData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/v1/quiz/addcollege', collegeData);
      toast({
        title: "College Added!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
      setCollegeData({
        name: '',
        location: ''
      });
    } catch (error) {
      console.error('Error adding college:', error);
    }
  };

  return (
    <VStack spacing="6" align="center" mt="8">
      <Box p="8" borderRadius="xl" boxShadow="lg" bg="white" w="400px">
        <Text fontWeight={"bold"}>Add College</Text>
        <form onSubmit={handleSubmit}>
          <FormControl id="name" mb="4">
            <FormLabel>Name</FormLabel>
            <Input type="text" id="name" name="name" value={collegeData.name} onChange={handleChange} placeholder="Enter college name" />
          </FormControl>
          <FormControl id="location" mb="4">
            <FormLabel>Location</FormLabel>
            <Input type="text" id="location" name="location" value={collegeData.location} onChange={handleChange} placeholder="Enter location" />
          </FormControl>
          <Button colorScheme="blue" type="submit" width="100%">Add College</Button>
        </form>
      </Box>
    </VStack>
  );
};

export default AddCollege;
