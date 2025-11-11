import TaskItem from "./TaskItem";

function TaskList({ tasks, onDeleteTask, onToggleStatus }) {
  if (tasks.length === 0) {
    return <p className="task-list-empty">Nenhuma tarefa cadastrada ainda.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}

export default TaskList;
