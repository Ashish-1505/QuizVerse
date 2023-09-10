import React from 'react';
import { Box, Spinner } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      background="rgba(0, 0, 0, 0.5)" // Semi-transparent background overlay
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex="1000" // Ensure it's above other elements
    >
      <Spinner size="xl" color="teal.500" thickness="4px" />
    </Box>
  );
};

export default Loading;
