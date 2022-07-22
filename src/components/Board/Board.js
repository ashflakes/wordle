import React from 'react'
import Row from '../Row/Row'

const Board = () => {

  return (
    <div className='board'>
        <Row rowNum={0} />
        <Row rowNum={1} />
        <Row rowNum={2} />
        <Row rowNum={3} />
        <Row rowNum={4} />
        <Row rowNum={5} />
    </div>
  )
}

export default Board