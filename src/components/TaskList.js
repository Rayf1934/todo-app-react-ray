import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleComplete, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="alert alert-info text-center">
        🎉 Tidak ada task. Tambahkan task baru di atas!
      </div>
    );
  }

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div>
      <h5>Daftar Task ({tasks.length})</h5>
      
      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div className="mb-4">
          <h6 className="text-warning">Belum Selesai ({pendingTasks.length})</h6>
          <div className="list-group">
            {pendingTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h6 className="text-success">Selesai ({completedTasks.length})</h6>
          <div className="list-group">
            {completedTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;