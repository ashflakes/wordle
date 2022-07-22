import React, { useContext } from 'react'

import WordContext from '../context/context'
import './Keyboard.css'

const keys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫']

const Keyboard = () => {

  const context = useContext(WordContext)
  const { userEntry, setUserEntry, writeOnBoard, keyboardColors, incrementTurn, winGame } = context

  const clickKey = (char) => {
    if (winGame) {
      return
    }
    let newEntry = ''
    if (char === 'enter') {
      incrementTurn()
      return
    } else if(char === '⌫') {
        newEntry = userEntry.substr(0, userEntry.length - 1)
    } else {
        if (userEntry.length === 5 ) {
          return
        }
        newEntry = userEntry + char
    }

    setUserEntry(newEntry)
    writeOnBoard(newEntry)
  }

  return (
    <div className='keyboard' >
      {keys.map((char, index) => {
        return  (
          <div className='key' key={index} id={char} onClick={() => clickKey(char)} style={{ background: keyboardColors[char] }} >
            {char.toUpperCase()}
          </div>
        )
      })}
    </div>
  )
}

export default Keyboard