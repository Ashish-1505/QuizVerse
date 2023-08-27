import React, { useEffect } from 'react'
import TopicQuiz from './TopicQuiz'
import {VStack } from '@chakra-ui/react'


const AllQuiz = () => {
  
  return (
    <div style={{ backgroundColor: '#e2e8f0', minHeight: '100vh' }}> 
        <TopicQuiz/>
    </div>
  )
}

export default AllQuiz