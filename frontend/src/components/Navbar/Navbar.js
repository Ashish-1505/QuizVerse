import React from 'react';
import { Box, Flex, Spacer, Button, Menu, MenuButton, MenuItem, MenuList, Heading } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import '../Navbar/Navbar.css'
const Navbar = () => {
    const {user,logoutUser} = useAppContext();
    const navigate=useNavigate();
  const LinkButton = ({ url = '/', title = 'Home' }) => (
    <Link to={url}>
      <Button  variant={'ghost'} mr={4}>{title}</Button>
    </Link>
  );
  return (
    <Box className="navbar" py={4} px={8}>
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Heading  className="navbar-brand" fontSize={'20px'}>Quiz Verse</Heading>
        </Box>
        <Spacer />
    {user && user.role==='college'?<>
    <Box className="navbar-menu" display={{ base: 'none', md: 'block' }}>
      <LinkButton  className="navbar-item" url="/createExam" title="Create Exam" />
      {user?<Button className="navbar-button" variant={"ghost"} onClick={logoutUser}>Logout</Button>:""}
      </Box>
      </>:<>{user?.role==='admin'?<Box display={{ base: 'none', md: 'block' }}>
      <LinkButton className="navbar-item" url="/createtest" title="Create Quiz" />
      <LinkButton className="navbar-item" url="/dashboard" title="Dashboard" />
      <LinkButton className="navbar-item" url="/allquizes" title="All Quizes" />
      <LinkButton className="navbar-item" url="/addcollege" title="Add College/University" />
      <Button className="navbar-button" onClick={logoutUser} variant={"ghost"}>Logout</Button>
    </Box>:<Box display={{ base: 'none', md: 'block' }}>
      {user?<><LinkButton className="navbar-item" url="/" title="Home" />
      <LinkButton className="navbar-item" url="/collegeTest" title="College/University Exams" /></>:<></>}
      {user?<Button className="navbar-button" onClick={logoutUser} variant={"ghost"}>Logout</Button>:""}
    </Box>}</>}
        <Box display={{ base: 'block', md: 'none' }}>
          <Menu>
            <MenuButton as={Button} variant="ghost">
              <HamburgerIcon boxSize={6} />
            </MenuButton>
            {user && user.role==='user'?<MenuList >
              <MenuItem onClick={()=>navigate("/")}>Home</MenuItem>
              <MenuItem onClick={()=>navigate("/collegeTest")}>College/University Exams</MenuItem>
              <MenuItem onClick={logoutUser}>Logout</MenuItem>
            </MenuList>:user && <MenuList >
              <MenuItem onClick={()=>navigate("/createtest")}>Create Quiz</MenuItem>
              <MenuItem onClick={()=>navigate("/dashboard")}>DashBoard</MenuItem>
              <MenuItem onClick={()=>navigate("/allquizes")}>All Quizes</MenuItem>
              <MenuItem onClick={()=>navigate("/addcollege")}>All Quizes</MenuItem>

              <MenuItem onClick={logoutUser}>Logout</MenuItem>
            </MenuList>}
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
