import { useState } from 'react'

import '../styles/Input.css'

function Input(props) {
 

  return (
    <>
     <input className='inputs' {...props}/>
    </>
  )
}

export default Input
