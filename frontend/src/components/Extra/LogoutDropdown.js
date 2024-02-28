import React from 'react';
import { Box, Flex, Text, Avatar, Button, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useAppContext } from '../../context/appContext';
import { ChevronDownIcon } from '@chakra-ui/icons';

const LogoutDropdown = ({ userName }) => {
  const { logoutUser } = useAppContext();

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="link" _hover={{textDecoration:"none"}}>
        <Flex alignItems="center">
          <Avatar size="md" name={userName} />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={logoutUser}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default LogoutDropdown;
