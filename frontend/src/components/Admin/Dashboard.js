import React, { useEffect,useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Heading, useToast } from '@chakra-ui/react';
import { useAppContext } from '../../context/appContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const userData = [
  { id: 1, name: 'John Doe', role: 'User' },
  { id: 2, name: 'Jane Smith', role: 'Admin' },
  // Add more user data here
];

const Dashboard = () => {
  const [role, setRole] = useState("")
  const {user,users,getAllUsers}=useAppContext()
  const navigate=useNavigate()
  const toast=useToast()
  const handleRoleChange = async (userId,user) => {
    try {
      await axios.put(`/api/v1/auth/changerole/${userId}`)
      setRole(user.role);
      toast({
        title: "Role Changed Successfully!",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Error Occurred!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [role])
  

  return (
    <div style={{minHeight: '100vh' }}>
      <Heading as="h1" textAlign="center" mb={4}>
        Dashboard
      </Heading> 
    <Box p={4} overflow={"auto"}> 

      <Table variant="striped" >
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Role</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody> 
          {users.map((user) => (
            <Tr key={user._id}>
              <Td>{user._id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.role}</Td>
              <Td>
                <Button onClick={() => handleRoleChange(user._id,user)}>Change Role</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
    </div>
  );
};

export default Dashboard;
