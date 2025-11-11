// script.js

// O endereço do seu backend Spring Boot
// (Baseado no seu application.properties e TarefaController.java)
const API_URL = 'http://localhost:8080';

// --- Seleção dos Elementos do HTML ---
const form = document.getElementById('form-tarefa');
const listaUI = document.getElementById('lista-tarefas');
const idInput = document.getElementById('tarefa-id');
const tituloInput = document.getElementById('titulo');
const categoriaInput = document.getElementById('categoria');
const statusInput = document.getElementById('status');

// --- Funções da API ---

/**
 * 1. LISTAR (GET)
 * Busca todas as tarefas no backend e as exibe na tela.
 */
async function listarTarefas() {
    try {
        // Chama a API: GET /tarefa/get
        const response = await fetch(`${API_URL}/tarefa/get`);
        const tarefas = await response.json();

        listaUI.innerHTML = ''; // Limpa a lista antiga

        // Adiciona cada tarefa na lista (ul)
        tarefas.forEach(tarefa => {
            const li = document.createElement('li');
            
            // Texto da tarefa (usa a entidade Tarefa.java)
            //
            li.innerHTML = `
                <span>
                    <strong>${tarefa.titulo}</strong> (Categoria: ${tarefa.categoria}) 
                    - ${tarefa.status ? 'Concluída' : 'Pendente'}
                </span>
            `;
            
            // Botão de Editar
            const btnEditar = document.createElement('button');
            btnEditar.innerText = 'Editar';
            btnEditar.onclick = () => carregarParaEditar(tarefa);
            
            // Botão de Excluir
            const btnExcluir = document.createElement('button');
            btnExcluir.innerText = 'Excluir';
            btnExcluir.className = 'excluir'; // Adiciona classe para o CSS
            btnExcluir.onclick = () => excluirTarefa(tarefa.id);

            li.appendChild(btnEditar);
            li.appendChild(btnExcluir);
            listaUI.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao listar tarefas:', error);
    }
}

/**
 * 2. CADASTRAR (POST) ou ATUALIZAR (PUT)
 * É chamado quando o formulário é enviado.
 */
async function salvarTarefa(e) {
    e.preventDefault(); // Impede o recarregamento da página

    const id = idInput.value;
    const dadosTarefa = {
        titulo: tituloInput.value,
        categoria: categoriaInput.value,
        status: statusInput.checked
    };

    try {
        if (id) {
            // --- ATUALIZAR (PUT) ---
            // Chama a API: PUT /tarefa/put?id=...
            await fetch(`${API_URL}/tarefa/put?id=${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosTarefa)
            });
        } else {
            // --- CADASTRAR (POST) ---
            // Chama a API: POST /tarefa/post
            await fetch(`${API_URL}/tarefa/post`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosTarefa)
            });
        }
        
        limparFormulario();
        await listarTarefas(); // Atualiza a lista na tela

    } catch (error) {
        console.error('Erro ao salvar tarefa:', error);
    }
}

/**
 * 3. EXCLUIR (DELETE)
 * Remove uma tarefa do banco.
 */
async function excluirTarefa(id) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        try {
            // Chama a API: DELETE /tarefa/delete?id=...
            await fetch(`${API_URL}/tarefa/delete?id=${id}`, {
                method: 'DELETE'
            });
            
            await listarTarefas(); // Atualiza a lista
        } catch (error) {
            console.error('Erro ao excluir tarefa:', error);
        }
    }
}

// --- Funções Auxiliares ---

/**
 * Preenche o formulário com os dados de uma tarefa para edição.
 */
function carregarParaEditar(tarefa) {
    idInput.value = tarefa.id;
    tituloInput.value = tarefa.titulo;
    categoriaInput.value = tarefa.categoria;
    statusInput.checked = tarefa.status;
    window.scrollTo(0, 0); // Rola a página para cima
}

/**
 * Limpa os campos do formulário.
 */
function limparFormulario() {
    form.reset();
    idInput.value = '';
}

// --- Inicialização ---
// Adiciona o "escutador" de evento ao formulário
form.addEventListener('submit', salvarTarefa);
// Carrega a lista de tarefas assim que a página é aberta
listarTarefas();