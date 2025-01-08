import { useState } from 'react';

import './App.css';
import Input from './components/Input,'; // Removed the extra comma
import Button from './components/Button';
import Pq from './assets/Heading';

function App() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const [task, setTask] = useState([]);
  const [view, setView] = useState(5);
  const [newTask, setNewTask] = useState('');

  const handleInput = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTask([...task, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const onComplete = (index) => {
    const updatedTask = [...task];
    updatedTask[index].completed = !updatedTask[index].completed;
    updatedTask.sort((a, b) => a.completed - b.completed); // Optional sorting based on completion
    setTask(updatedTask);
  };

  const removeTask = (index) => {
    const updatedTasks = task.filter((_, i) => i !== index);
    setTask(updatedTasks);

    // Adjust view based on number of tasks remaining
    setView(updatedTasks.length <= 5 ? 5 : updatedTasks.length);
  };

  return (
    <div className='app'>
      <Pq />
      <div className='input-box'>
        <Input type="text" value={newTask} onChange={handleInput} />
        <Button onClick={addTask} title="Add task" />
      </div>
      <div className='task'>
        {task.slice(0, view).map((t, i) => (
          <div className='task-box' key={i}>
            <p style={{ textDecoration: t.completed ? 'line-through' : '' }}>{t.text}</p>
            <span>Date:- {day}/{month}/{year}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <Input
                checked={t.completed}
                style={{ width: '40px' }}
                onChange={() => onComplete(i)}
                type='checkbox'
              />
              <Button onClick={() => removeTask(i)} title="remove" />
            </div>
          </div>
        ))}
        {task.length > 5 && view < task.length && (
          <div>
            <button onClick={() => setView(task.length)}>View More...</button>
          </div>
        )}
        {view === task.length && task.length > 5 && (
          <div>
            <button onClick={() => setView(5)}>View Less...</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
