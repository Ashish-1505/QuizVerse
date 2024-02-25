import React from 'react';
import { Button, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';

const CustomAlert = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    // Handle submit logic here
    // For now, let's just open the alert
    onOpen();
  };

  return (
    <>
      <Button onClick={handleSubmit}>Submit</Button>
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Submit Exam</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to submit the exam?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="red" ml={3} onClick={() => {
                // Handle submit logic here
                // For now, just close the alert
                onClose();
              }}>
                Finish
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default CustomAlert;
