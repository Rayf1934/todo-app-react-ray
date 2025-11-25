import React from 'react';

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID');
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('id-ID');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'danger';
      default: return 'secondary';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'low': return 'Rendah';
      case 'medium': return 'Medium';
      case 'high': return 'Tinggi';
      default: return priority;
    }
  };

  return (
    <div className={`list-group-item priority-${task.priority} ${task.completed ? 'completed' : ''}`}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="flex-grow-1">
          <h6 className={`mb-1 ${task.completed ? 'text-decoration-line-through' : ''}`}>
            {task.name}
          </h6>
          <small className="text-muted">
            <span className={`badge bg-${getPriorityColor(task.priority)} me-2`}>
              {getPriorityText(task.priority)}
            </span>
            | Due: {formatDate(task.dueDate)} |
            Dibuat: {formatDateTime(task.createdAt)}
          </small>
        </div>
        <div className="btn-group ms-3">
          <button
            className={`btn btn-sm ${task.completed ? 'btn-warning' : 'btn-success'}`}
            onClick={() => onToggleComplete(task.id)}
          >
            {task.completed ? '❌ Batal' : '✅ Selesai'}
          </button>
          <button
            className="btn btn-sm btn-info"
            onClick={() => onEdit(task)}
            disabled={task.completed}
          >
            ✏️ Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(task.id)}
          >
            🗑️ Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;