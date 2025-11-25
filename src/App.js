import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      name: taskData.name,
      completed: false,
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      createdAt: new Date().toISOString()
    };
    setTasks([newTask, ...tasks]);
  };

  // Edit existing task
  const editTask = (taskData) => {
    setTasks(tasks.map(task => 
      task.id === editingTask.id 
        ? { ...task, ...taskData }
        : task
    ));
    setEditingTask(null);
  };

  // Delete task
  const deleteTask = (taskId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus task ini?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  // Toggle task completion
  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  // Start editing task
  const startEditing = (task) => {
    setEditingTask(task);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingTask(null);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">📝 Aplikasi To-Do List React</h4>
              <small className="opacity-75">Total: {tasks.length} tasks</small>
            </div>
            <div className="card-body">
              <TaskForm 
                onSubmit={editingTask ? editTask : addTask}
                editingTask={editingTask}
                onCancel={cancelEditing}
              />
              <TaskList 
                tasks={tasks}
                onToggleComplete={toggleComplete}
                onEdit={startEditing}
                onDelete={deleteTask}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;