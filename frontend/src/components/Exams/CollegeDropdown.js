import React, { useState, useEffect } from 'react';
import { Select, VStack, Box, Button, Text, Badge } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Pages/Loading';
import { useAppContext } from '../../context/appContext';

const CollegeDropdown = ({ onSelect }) => {
  const { user } = useAppContext();
  const [options, setOptions] = useState([]);
  const [exams, setExams] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [filter, setFilter] = useState('Active'); // State to toggle between Active and Attempted exams
  const navigate = useNavigate();

  useEffect(() => {
    const getColleges = async () => {
      try {
        const { data } = await axios.get('/api/v1/quiz/getcolleges');
        setOptions(data);
      } catch (error) {
        console.error('Error Finding college:', error);
      }
    };
    getColleges();
  }, []);

  const [selectedOption, setSelectedOption] = useState({});
  const [selectedOptionName, setSelectedOptionName] = useState('');
  const [showTestCards, setShowTestCards] = useState(true);
  const [showTestForm, setShowTestForm] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    const optionObject = options.find(option => `${option.name},${option.location}` === value);
    setSelectedOption(optionObject);
    setSelectedOptionName(value);
    onSelect(value);
    setShowTestCards(false);
    setShowTestForm(false);
  };

  const handleShowTestCards = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/quiz/exam/${selectedOption.name},${selectedOption.location}`);
      setExams(data);
    } catch (error) {
      console.error('Error Finding college:', error);
    }
    setLoading(false);
    setShowTestCards(true);
  };

  const handleStartTest = (examId) => {
    setShowTestForm(true);
    localStorage.setItem("examId", examId);
    navigate('/filldetails');
  };

  return (
    <VStack align="stretch" overflowY="auto" maxHeight="550px">
      <Box
        bg="gray.800"
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        p="3"
        w="80vw"
        mb={4}
        mt={4}
      >
        <Select
          placeholder="Select College/University"
          value={selectedOptionName}
          onChange={handleChange}
          size="lg"
          variant="outline"
          focusBorderColor="blue.400"
          color="white"
        >
          {options.map((option) => (
            <option key={option._id} value={`${option.name},${option.location}`} style={{color:"black"}}>
              {option.name}, {option.location}
            </option>
          ))}
        </Select>
        <Button mt="3" onClick={handleShowTestCards} colorScheme="blue">
          Show Active Exams
        </Button>
      </Box>
      <Box display="flex">
        <Button
          mt="3"
          bg={filter === 'Active' ? 'green.100' : 'gray.100'}
          color={filter === 'Active' ? 'green.800' : 'gray.800'}
          onClick={() => setFilter('Active')}
        
        >
          Active Exams
        </Button>
        <Button
          mt="3"
          bg={filter === 'Attempted' ? 'red.100' : 'gray.100'}
          color={filter === 'Attempted' ? 'red.800' : 'gray.800'}
          marginLeft="1.5rem"
          onClick={() => setFilter('Attempted')}
        >
          Attempted Exams
        </Button>
      </Box>
      {isLoading ? (<Loading />) : (
        <>
          {showTestCards && (
            <VStack align="stretch">
              {exams.length === 0 ? <Text fontWeight="bold">No Exams</Text> : exams.filter(exam => filter === 'Active' ? !exam.attemptedBy.includes(user.email) : exam.attemptedBy.includes(user.email)).map((exam) => (
                <Box key={exam._id} bg="gray.100" p="4" borderRadius="md" boxShadow="md" mb={5} position="relative">
                  <Text fontSize="lg">{exam.title}</Text>
                  <Text>Total Questions: {exam.questions.length}</Text>
                  <Text>Duration: {exam.duration} min</Text>
                  <Text>University/College: {selectedOptionName}</Text>
                  {exam.attemptedBy.includes(user.email) ? (
                    <Badge
                      colorScheme="red"
                      position="absolute"
                      top="2"
                      right="2"
                      fontSize="sm"
                      py="1"
                      px="2"
                      borderRadius="md"
                    >
                      Attempted
                    </Badge>
                  ) : (
                    <Badge
                      colorScheme="green"
                      position="absolute"
                      top="2"
                      right="2"
                      fontSize="sm"
                      py="1"
                      px="2"
                      borderRadius="md"
                      
                    >
                      Active
                    </Badge>
                  )}
                  {!exam.attemptedBy.includes(user.email) && (
                    <Button mt="3" colorScheme="green" onClick={() => handleStartTest(exam._id)}>
                      Start Test
                    </Button>
                  )}
                </Box>
              ))}
            </VStack>
          )}
        </>
      )}
    </VStack>
  );
};

export default CollegeDropdown;
