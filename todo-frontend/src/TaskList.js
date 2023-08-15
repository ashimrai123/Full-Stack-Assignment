import React, { useState } from 'react';
import api from './api';
import './TaskList.css';

const TaskList = ({ tasks, onDeleteTask, setTasks }) => {
  const [editingTask, setEditingTask] = useState(null);

  const handleCheckboxChange = async (task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await api.updateTask(task.id, updatedTask);

      const updatedTasks = tasks.map(t => (t.id === task.id ? updatedTask : t));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleEditClick = (task) => {
    setEditingTask({ ...task });
  };

  const handleSaveEdit = async () => {
    try {
      await api.updateTask(editingTask.id, editingTask);

      const updatedTasks = tasks.map(t => (t.id === editingTask.id ? editingTask : t));
      setTasks(updatedTasks);
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleEditChange = (field, value) => {
    setEditingTask({ ...editingTask, [field]: value });
  };

  return (
    <div>
      <h2 className="task-list-heading">Task List</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks-message">No tasks available.</p>
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className="task-item">
              <div className="task-item-content">
                <div className="checkbox-container">
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleCheckboxChange(task)}
                  />
                </div>
                {editingTask && editingTask.id === task.id ? (
                  <div className="edit-section">
                    <input
                      className="edit-input"
                      type="text"
                      value={editingTask.title}
                      onChange={event => handleEditChange('title', event.target.value)}
                    />
                    <textarea
                      className="edit-textarea"
                      value={editingTask.description}
                      onChange={event => handleEditChange('description', event.target.value)}
                    />
                    <input
                      className="edit-date"
                      type="date"
                      value={editingTask.due_date}
                      onChange={event => handleEditChange('due_date', event.target.value)}
                    />
                    <div className="edit-actions">
                      <button className="button edit-button" onClick={handleSaveEdit}>
                        Save
                      </button>
                      <button className="button cancel-button" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="task-details">
                    <span>{task.title}</span>
                    <span>Description: {task.description}</span>
                    <span>Due Date: {task.due_date}</span>
                    <div className="task-actions">
                      <button className="button edit-button" onClick={() => handleEditClick(task)}>
                        Edit
                      </button>
                      <button className="button delete-button" onClick={() => onDeleteTask(task.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
