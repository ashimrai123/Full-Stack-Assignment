import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import api from './api';


function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the API when the component mounts
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await api.getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskDeleted = async (taskId) => {
    try {
      // Delete the task using the API
      await api.deleteTask(taskId);

      // Update the tasks state to remove the deleted task
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="App">
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList tasks={tasks} onDeleteTask={handleTaskDeleted} setTasks={setTasks} />
    </div>
  );
}

export default App;
