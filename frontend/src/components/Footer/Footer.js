import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      bg="#FAF089"
      py={4}
      px={8}
      textAlign="center"
      color="black"
      fontSize="sm"
      position="fixed"
      bottom={0}
      left={0}
      width="100%"
    >
      <Text>
        © 2023 Quiz Verse. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
