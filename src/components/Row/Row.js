import React, { useState, useEffect, useContext } from 'react'
import WordContext from '../context/context'
import './Row.css'

const Row = ({ rowNum }) => {

  const context = useContext(WordContext)
  const { board, colors } = context

  return (
    <div className='row'>
      {board[rowNum].map((tile, index) => {
        return (
            <div className='char' key={index} style={{ backgroundColor: colors[rowNum][index]}} >
                {board[rowNum][index]}
            </div>
        )
      })}
    </div>
  )
}

export default Row