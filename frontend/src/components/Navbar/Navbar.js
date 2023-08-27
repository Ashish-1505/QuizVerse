import React from 'react';
import { Box, Flex, Spacer, Button, Menu, MenuButton, MenuItem, MenuList, Heading } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
const Navbar = () => {
    const {user,logoutUser} = useAppContext();
  const LinkButton = ({ url = '/', title = 'Home' }) => (
    <Link to={url}>
      <Button colorScheme="teal" variant={'ghost'} mr={4}>{title}</Button>
    </Link>
  );
  return (
    <Box bg="yellow.200" py={4} px={8}>
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Heading color={"teal"} fontSize={'20px'}>Quiz Verse</Heading>
        </Box>
        <Spacer />
    {user?.role==='admin'?<Box display={{ base: 'none', md: 'block' }}>
      <LinkButton url="/createtest" title="Create Quiz" />
      <LinkButton url="/dashboard" title="Dashboard" />
      <LinkButton url="/allquizes" title="All Quizes" />
      <Button onClick={logoutUser}>Logout</Button>
    </Box>:<Box display={{ base: 'none', md: 'block' }}>
      <LinkButton url="/" title="Home" />
      {user?<Button onClick={logoutUser}>Logout</Button>:""}
    </Box>}
        <Box display={{ base: 'block', md: 'none' }}>
          <Menu>
            <MenuButton as={Button} variant="ghost">
              <HamburgerIcon boxSize={6} />
            </MenuButton>
            <MenuList >
              <MenuItem>Home</MenuItem>
              <MenuItem>About</MenuItem>
              <MenuItem>Login or Signup</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
