import { useState } from 'react'

import './App.css'
import Input from './components/Input,'
import Button from './components/Button'
import Pq from './assets/Heading'
function App() {
  let today = new Date();

const year = today.getFullYear();
const month = today.getMonth() + 1; 
const day = today.getDate();
  const [task, setTask] = useState([])
  const [view, setView] = useState(5)
  const [newTask, setNewTask] = useState('');

  const handleInput = (e)=>{
    setNewTask(e.target.value);   
  }

  const addTask = ()=>{
    
    
    setTask([...task, {text: newTask, completed: false}]);
    setNewTask('')
  }

  const onComplete =(index)=>{
 
    const updatedTask = [...task]
    updatedTask[index].completed = !updatedTask[index].completed
    updatedTask.sort((a,b)=> a.completed -b.completed)
    setTask(updatedTask)
 
  }

  const removeTask=(index)=>{
    
    setTask(task.filter((_, i)=> i!=index))
    if (task.length<=5) {
      setView(5);
      return;  
    }
    setView(task.length-1)
    console.log("rm ",view);
    
  }

// useEffect(() => {
//   console.log(task.sort((a,b)=> a.completed-b.completed));
  
//   task.sort((a,b)=> a.completed-b.completed)
  
  
// }, [onComplete])

 

  return (
    <>
      <div className='app'>
        <Pq />
       <div className='input-box'>
          <Input type="text" value={newTask} onChange={handleInput}/>
          <Button onClick={addTask} title="Add task"/>
       </div>
        <div className='task'>
          
          {task.slice(0, view).map((t,i)=>
            (
              <div className='task-box' key={i}>
                <p style={{textDecoration: t.completed? 'line-through': ''}}>{t.text}</p>
                <span>Date:- {day}/{month}/{year}</span>
                <div style={{display: 'flex', alignItems: 'center', gap: '2px'}}>
                  <Input checked={t.completed} style={{width: '40px'}} onChange={()=>onComplete(i)} type='checkbox' />
                <Button onClick={()=>removeTask(i)} title="remove"/>
                </div>
              </div>
            )
          )}
          {task.length>5 && (
            <div>
              <button onClick={()=>{
                setView(task.length)
                console.log("view more ",view);
              }

                }>View More...</button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
