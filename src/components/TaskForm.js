import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, editingTask, onCancel }) => {
  const [name, setName] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editingTask) {
      setName(editingTask.name);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate || '');
    } else {
      setName('');
      setPriority('medium');
      setDueDate('');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('Nama task tidak boleh kosong!');
      return;
    }

    onSubmit({
      name: name.trim(),
      priority,
      dueDate: dueDate || null
    });

    if (!editingTask) {
      setName('');
      setPriority('medium');
      setDueDate('');
    }
  };

  return (
    <div className="mb-4">
      <h5>{editingTask ? 'Edit Task' : 'Tambah Task Baru'}</h5>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Nama task..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Prioritas Rendah</option>
            <option value="medium">Prioritas Medium</option>
            <option value="high">Prioritas Tinggi</option>
          </select>
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            {editingTask ? 'Update' : 'Tambah'}
          </button>
          {editingTask && (
            <button 
              type="button" 
              className="btn btn-secondary w-100 mt-2"
              onClick={onCancel}
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;