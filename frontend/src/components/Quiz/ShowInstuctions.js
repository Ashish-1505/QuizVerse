import React from 'react'
import Instructions from './Instructions'

const ShowInstuctions = ({title,description,numQuestions,QuizId}) => {
  return (
    <div>
        <Instructions title={title} description={description} numQuestions={numQuestions} Id={QuizId}/>
    </div>
  )
}

export default ShowInstuctions