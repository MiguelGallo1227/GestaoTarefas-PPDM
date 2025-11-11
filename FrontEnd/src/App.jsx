import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./index.css";

// URL base da sua API Backend.
// O backend (Node/Express) deve estar rodando nesta porta.
const API_URL = "http://localhost:3001";

function App() {
  const [tasks, setTasks] = useState([]);

  // 1. (Read) Buscar tarefas da API ao carregar o componente
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tarefas`); //
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      // Aqui você pode mostrar um feedback de erro
    }
  };

  // 2. (Create) Adicionar nova tarefa
  const addTask = async (taskData) => {
    try {
      const response = await fetch(`${API_URL}/tarefas`, {
        //
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]); // Atualiza a interface
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  // 3. (Delete) Remover tarefa
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/tarefas/${id}`, { method: "DELETE" }); //
      // Filtra a tarefa removida do estado local
      setTasks(tasks.filter((task) => task.id !== id)); //
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  // 4. (Update) Alternar status da tarefa (concluída/pendente)
  const toggleTaskStatus = async (id) => {
    // Encontra a tarefa atual para saber o status oposto
    const taskToToggle = tasks.find((task) => task.id === id);
    const newStatus = !taskToToggle.status; //

    try {
      const response = await fetch(`${API_URL}/tarefas/${id}`, {
        //
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const updatedTask = await response.json();

      // Atualiza a lista de tarefas no estado
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task))); //
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>EcoTasks</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onDeleteTask={deleteTask}
        onToggleStatus={toggleTaskStatus}
      />
    </div>
  );
}

export default App;
