import { useState, useEffect } from 'react';
import Board from './components/Board/Board';
import Keyboard from './components/Keyboard/Keyboard'
import Timer from './components/Timer/Timer'

import { getWord, checkWord } from './hooks/wordHooks'

import WordContext from './components/context/context';
import './App.css';

function App() {
  const [board, setBoard] = useState([['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']])
  const [keyWord, setKeyWord] = useState('')
  const [turn, setTurn] = useState(0);
  const [userEntry, setUserEntry] = useState('')

  const [sizeErr, setSizeErr] = useState(false);
  const [wordErr, setWordErr] = useState(false);

  const [colors, setColors] = useState([['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']])

  const [keyboardColors, setKeyboardColors] = useState({})

  const [winGame, setWinGame] = useState(false)
 
  let newKeyboardColors = {}

  useEffect(() => {
    setKeyWord(getWord)
  }, [])

  const incrementTurn = () => {
    if (winGame) {
      return
    }
    if (wordErr && checkWord)  {
      checkLetters();
      setTurn(turn + 1)
    }


    setWordErr(false)
    setSizeErr(false)
    setUserEntry('')
  }

  const verifyInputValidity = (term) => {
    setSizeErr(false);
    setWordErr(false);

    if (term.length === 5) setSizeErr(true)
    if (checkWord(term)) setWordErr(true)
  }

  const writeOnBoard = (entry) => {
    const entryArr = entry.toUpperCase().split('')

    while (entryArr.length < 5) {
      entryArr.push('')
    }

    verifyInputValidity(entryArr.join(''))
   
    const newBoard = board.map((entry, index) => {
      if(index === turn) {
        return entryArr
      } else {
        return entry
      }
    })
    setBoard(newBoard)
  }

  const checkLetters = () => {
    const checked = []
    newKeyboardColors = {...keyboardColors}

    if (userEntry === keyWord) {
      setWinGame(true);
      
    }

    userEntry.split('').forEach((character, index) => {
      if (keyWord.includes(character)) {
        if (keyWord.indexOf(character) === index) {
          newKeyboardColors = {...newKeyboardColors, [character]: '#42f56c'}
          checked.push('#42f56c')
          return
        } else if (keyWord.lastIndexOf(character) === index){
          newKeyboardColors = {...newKeyboardColors, [character]: '#42f56c'}
          checked.push('#42f56c')
          
          return
        } else {
          newKeyboardColors = newKeyboardColors[character] ? {...newKeyboardColors} : {...newKeyboardColors, [character]: 'orange'}
          checked.push('orange')
        return 
        }
      }
      newKeyboardColors = {...newKeyboardColors, [character]: 'gray'}
      checked.push('gray')
      return 
    })
        
            

    const newColors = colors.map((entry, index) => {
      if (index === turn ) {
        return checked
      } else {
        return entry
      }
    })

    
    setKeyboardColors(newKeyboardColors)
    setColors(newColors)
    
  }

  const updateUserEntry = (entry) => {
    if (winGame) {
      return
    }
    setUserEntry(entry)

    writeOnBoard(entry)
  }

  

  return (
    <div className="App">
      <WordContext.Provider value={{ board, colors, turn, userEntry, setUserEntry, writeOnBoard, keyboardColors, incrementTurn, winGame }}>
        <Board />
        <div className='input'>
          <input
            type='text'
            maxLength='5'
            onChange={(e) => updateUserEntry(e.target.value)}
            value={userEntry}
          ></input>
          {
            sizeErr && wordErr ? (<button className='btn' onClick={(e) => incrementTurn(e)} >SUBMIT</button>) :
                                (<button className='btn' onClick={(e) => incrementTurn(e)} disabled >SUBMIT</button>)                        
          }
      </div>
      <Keyboard />
      </WordContext.Provider>
    </div>
  );
}

export default App;
