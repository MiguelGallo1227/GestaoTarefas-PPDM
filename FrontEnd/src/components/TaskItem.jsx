function TaskItem({ task, onDeleteTask, onToggleStatus }) {
  // Define a classe CSS com base no status
  const itemClasse = task.status ? "task-item completed" : "task-item";

  return (
    <div className={itemClasse}>
      <div className="task-info">
        <h3>{task.titulo}</h3>
        <span className="category">{task.categoria}</span>
      </div>
      <div className="task-actions">
        <button
          className="action-button btn-toggle"
          onClick={() => onToggleStatus(task.id)}
        >
          {task.status ? "Reabrir" : "Concluir"}
        </button>
        <button
          className="action-button btn-delete"
          onClick={() => onDeleteTask(task.id)}
        >
          Remover
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
