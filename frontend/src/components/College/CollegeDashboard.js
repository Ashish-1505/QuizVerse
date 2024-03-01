import React, { useState, useEffect } from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useAppContext } from '../../context/appContext';

const CollegeDashboard = () => {
  const [exams, setExams] = useState([]);
  var [count,setCount]=useState(0)
  const toast=useToast()
  const {user}=useAppContext()
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`/api/v1/quiz/fetchResult/${user._id}`);
        setExams(response.data);
      } catch (error) {
        console.error('Failed to fetch exams', error);
      }
    };

    fetchExams(); 
  }, []);

  const handleClick=async(examId,examTitle)=>{
    try {
      const response = await axios.get(`/api/v1/quiz/downloadResults/${examId}`, {
        responseType: 'blob',
      });

      
      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${examTitle}.xlsx`);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: 'Failed to download file',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  const groupExamsByTitle = () => {
    const groupedExams = {};
    exams.forEach(exam => {
      if (!groupedExams[exam.examTitle]) {
        groupedExams[exam.examTitle] = {
          maxScore: exam.maxScore,
          maxAttempts: 0 
        };
      }

      groupedExams[exam.examTitle].maxAttempts = Math.max(groupedExams[exam.examTitle].maxAttempts, exam.attemptedBy);

    });
    return groupedExams;
  };

  const groupedExams = groupExamsByTitle();

  return (
    <Box p={4}>
      <Box textAlign="center" mb={4}>
        <Heading as="h1" size="xl">Exams created by your institution</Heading>
      </Box>
      <Box overflowX="auto" >
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Exam Title</Th>
              <Th>Max Marks</Th>
              <Th>Attempted By</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.entries(groupedExams).map(([title, { maxScore, maxAttempts }]) => (
              <Tr key={title}>
                <Td>{title}</Td>
                <Td>{maxScore}</Td>
                <Td>{maxAttempts}</Td>
                <Td>
                  <Button colorScheme="teal" size="sm" onClick={()=>handleClick(exams.find(exam => exam.examTitle === title)?.examId, title)}>View Results</Button>
                </Td> 
              </Tr> 
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default CollegeDashboard;


// import React, { useState, useEffect } from 'react';
// import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, useToast } from '@chakra-ui/react';
// import axios from 'axios';
// import { useAppContext } from '../../context/appContext';

// const CollegeDashboard = () => {
//   const [exams, setExams] = useState([]);
//   const toast=useToast()
//   const {user}=useAppContext()
//   useEffect(() => {
//     const fetchExams = async () => {
//       try {
//         const response = await axios.get(`/api/v1/quiz/fetchResult/${user._id}`);
//         setExams(response.data);
//       } catch (error) {
//         console.error('Failed to fetch exams', error);
//       }
//     };

//     fetchExams();
//   }, []);

//   const handleClick=async(examId,examTitle)=>{
//     try {
//       const response = await axios.get(`/api/v1/quiz/downloadResults/${examId}`, {
//         responseType: 'blob',
//       });

      
//       const url = window.URL.createObjectURL(new Blob([response.data]));

//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `${examTitle}.xlsx`);
//       document.body.appendChild(link);
//       link.click();

//       // Cleanup
//       link.parentNode.removeChild(link);
//     } catch (error) {
//       console.error('Error downloading file:', error);
//       toast({
//         title: 'Failed to download file',
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   }

//   return (
//     <Box p={4}>
//       <Box textAlign="center" mb={4}>
//   <Heading as="h1" size="xl">Exams created by your institution</Heading>
// </Box>
//       <Box overflowX="auto" >
//       <Table variant="striped" colorScheme="gray">
//         <Thead>
//           <Tr>
//             <Th>Exam Title</Th>
//             <Th>Max Marks</Th>
//             <Th>Attempted By</Th>
//             <Th>Actions</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {exams.map(exam => (
//             <Tr key={exam._id}>
//               <Td>{exam.examTitle}</Td>
//               <Td>{exam.maxScore}</Td>
//               <Td>{exams.length}</Td>
//               <Td>
//                 <Button colorScheme="teal" size="sm" onClick={()=>handleClick(exam.examId,exam.examTitle)}>View Results</Button>
//               </Td>
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//       </Box>
//     </Box>
//   );
// };

// export default CollegeDashboard;
