const API_BASE_URL = 'http://127.0.0.1:8000/api/';

const api = {
  getTasks: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}tasks/`);
      return response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await fetch(`${API_BASE_URL}tasks/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData), // Make sure taskData is properly formatted
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      return response.json();
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  updateTask: async (taskId, updatedData) => {
    try {
      const response = await fetch(`${API_BASE_URL}tasks/${taskId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  deleteTask: async (taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}tasks/${taskId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }

    // No need to return response.json() for DELETE requests
    return;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
},
};

export default api;
