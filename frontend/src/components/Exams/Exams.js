import React, { useEffect, useState } from 'react'
import { VStack } from '@chakra-ui/react';
import CollegeDropdown from './CollegeDropdown';

const Exams = () => {
  
    
    // const collegeOptions = [
    //     { value: '1', label: 'Harvard University' },
    //     { value: '2', label: 'Stanford University' },
    //     { value: '3', label: 'Massachusetts Institute of Technology (MIT)' },
    //     // Add more college options as needed 
    //   ];
    
      const handleCollegeSelect = (value) => { 
        // console.log('Selected College:', value);
        // Perform any action based on the selected college
      };
      
  return (
    <div>
         <VStack spacing={4} marginTop={10}>
        <CollegeDropdown onSelect={handleCollegeSelect} />
        {/* Add other components or content here */}
      </VStack>
    </div>
  )
}

export default Exams