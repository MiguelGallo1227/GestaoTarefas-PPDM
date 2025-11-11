import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação simples
    if (!titulo || !categoria) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Envia os dados para a função 'addTask' no App.jsx
    onAddTask({ titulo, categoria });

    // Limpa o formulário
    setTitulo("");
    setCategoria("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-input"
        placeholder="Título da tarefa (ex: Reciclar o lixo)"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        type="text"
        className="form-input"
        placeholder="Categoria (ex: reciclagem)"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />
      <button type="submit" className="form-button">
        Adicionar
      </button>
    </form>
  );
}

export default TaskForm;
