import { useState } from 'react'
import '../styles/Button.css'
// import './App.css'

function Button(props) {


  return (
    <>
    <div className='buttons'>
        <button {...props}>{props.title}</button>
    </div>
    </>
  )
}

export default Button
