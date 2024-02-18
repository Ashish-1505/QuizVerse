import React, { useState ,useEffect} from 'react';
import { Select, VStack, Box, Button, Text, Badge, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Pages/Loading';


const CollegeDropdown = ({ onSelect }) => {
 
  const [options,setOptions]=useState([])
  const [exams,setExams]=useState([])
  const [isLoading,setLoading]=useState(false)
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
 
  const [selectedOption, setSelectedOption] = useState({});
  const [showTestCards, setShowTestCards] = useState(false);
  const [selectedOptionName, setSelectedOptionName] = useState('');
  const [showTestForm, setShowTestForm] = useState(false);
 const navigate=useNavigate()
  const handleChange = (event) => {
    const value = event.target.value;
    const optionObject = options.find(option => `${option.name},${option.location}` === value);
    setSelectedOption(optionObject)
    setSelectedOptionName(value);
    onSelect(value);
    setShowTestCards(false); // Reset test cards when a new university is selected
    setShowTestForm(false)
  }; 
   
  const handleShowTestCards = async () => {
    
    try {
      setLoading(true)
      const {data }= await axios.get(`/api/v1/quiz/exam/${selectedOption.name},${selectedOption.location}`);
      setExams(data)
      
      // console.log(selectedOption.location);
    } catch (error) {  
      console.error('Error Finding college:', error); 
    }  
    setLoading(false)
    setShowTestCards(true);
    
    // Perform any action here such as fetching test data based on the selected university
  };
   
  const handleStartTest = (examId) => {
    setShowTestForm(true);
    localStorage.setItem("examId",examId);
    navigate('/filldetails')
  };
 
  const handleCloseTestForm = () => {
    setShowTestForm(false);
  };

  return (
    <VStack align="stretch" overflowY="auto" maxHeight="550px">
      <Box
        bg="gray.800" // Dark gray background color
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        p="3"
        w="80vw" // Adjust width as needed
        mb={4}
        mt={4}
      >
        <Select
          placeholder="Select College/University"
          value={selectedOptionName}
          onChange={handleChange}
          size="lg" // Increase size for larger dropdown
          variant="outline"
          focusBorderColor="blue.400" // Change focus border color
          color="white" // Text color
        >
          {options.map((option) => (
            <option key={option._id} value={`${option.name},${option.location}`} style={{ color: 'black' }}>
              {option.name},{option.location}
            </option>
          ))} 
        </Select>
        <Button mt="3" onClick={handleShowTestCards} colorScheme="blue">
          Show Active Exams
        </Button>
      </Box>  
      {isLoading?(<Loading/>):(<>{showTestCards && (
        <VStack align="stretch">
             { exams.length===0?<Text fontWeight={"bold"}>No Active Exams</Text> : exams.map((exam)=>{
                  return <Box bg="gray.100" p="4" borderRadius="md" boxShadow="md" mb={5} position="relative">
                  <Text fontSize="lg">{exam.title}</Text>
                  <Text>Total Questions: {exam.questions.length}</Text>
                  <Text>Duration: {exam.duration} min</Text>
                  <Text>University/College: {selectedOptionName}</Text>
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
                  <Button mt="3" colorScheme="green" onClick={()=>handleStartTest(exam._id)}>
                    Start Test
                  </Button>
                </Box>
                })
              }
        </VStack>
      )}</>)}
    </VStack>
  );
}

export default CollegeDropdown;
