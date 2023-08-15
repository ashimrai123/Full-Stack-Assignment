import React, { useState } from 'react';
import api from './api';
import './TaskForm.css'; // Add the TaskForm.css stylesheet


const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(''); // Initialize with empty string

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleCreateTask = async () => {
    if (!title) {
      console.error('Title is required');
      return;
    }

    try {
      const newTaskData = {
        title: title,
        description: description,
        due_date: dueDate,
        completed: false,
      };

      const createdTask = await api.createTask(newTaskData);
      onTaskCreated(createdTask);
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={handleTitleChange}
      />
      <input
        type="text"
        placeholder="Task description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <input
        type="date"
        placeholder="Due date"
        value={dueDate}
        onChange={handleDueDateChange}
      />
      <button onClick={handleCreateTask}>Create Task</button>
    </div>
  );
};

export default TaskForm;
