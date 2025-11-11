package com.senai.TarefasSustentaveis.Service;

import com.senai.TarefasSustentaveis.Entity.Tarefa;
import com.senai.TarefasSustentaveis.Repository.TarefaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TarefaService {

    private TarefaRepository tarefaRep;

    public TarefaService(TarefaRepository tarefaRep) {
        this.tarefaRep = tarefaRep;
    }

    public Tarefa cadastrarTarefa(Tarefa tarefaParaSalvar) {
        return tarefaRep.save(tarefaParaSalvar);
    }

    public List<Tarefa> listarTodasTarefas() {
        return tarefaRep.findAll();
    }

    public Tarefa excluirTarefa(Long id) {
        tarefaRep.deleteById(id);
        return null;
    }

    public Tarefa atualizarTarefa(Long id, Tarefa tarefa) {
        tarefa.setId(id);
        tarefaRep.save(tarefa);
        return tarefa;
    }
}
