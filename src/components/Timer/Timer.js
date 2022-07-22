import React, { useEffect, useState } from 'react'
import WordContext from '../context/context'

const Timer = () => {
  const [seconds, setSeconds] = useState(0)

  return (
    <div>
      <label>{seconds}</label>
    </div>
  )
}

export default Timer