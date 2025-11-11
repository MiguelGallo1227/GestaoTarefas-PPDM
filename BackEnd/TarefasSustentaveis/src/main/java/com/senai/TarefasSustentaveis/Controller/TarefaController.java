package com.senai.TarefasSustentaveis.Controller;

import com.senai.TarefasSustentaveis.Entity.Tarefa;
import com.senai.TarefasSustentaveis.Repository.TarefaRepository;
import com.senai.TarefasSustentaveis.Service.TarefaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class TarefaController {
    @Autowired
    TarefaService tarefaServ;

    @PostMapping("tarefa/post")
    public ResponseEntity<Tarefa> cadastrarTarefa(@RequestBody Tarefa t) {
        Tarefa tarefaSalva = tarefaServ.cadastrarTarefa(t);
        return ResponseEntity.status(HttpStatus.CREATED).body(tarefaSalva);
    }

    @GetMapping("tarefa/get")
    public ResponseEntity<List<Tarefa>> listarTarefas() {
        List<Tarefa> listaTarefa = tarefaServ.listarTodasTarefas();
        return ResponseEntity.ok(listaTarefa);
    }

    @DeleteMapping("tarefa/delete")
    public ResponseEntity<Tarefa> excluirTarefa(@RequestParam Long id) {
        Tarefa tarefaDelete = tarefaServ.excluirTarefa(id);
        return ResponseEntity.status(HttpStatus.CREATED).body(tarefaDelete);
    }

    @PutMapping("tarefa/put")
    public ResponseEntity<Tarefa> atualizarTarefa(@RequestParam Long id, @RequestBody Tarefa t) {
        Tarefa tarefaAtualizada = tarefaServ.atualizarTarefa(id, t);
        return ResponseEntity.ok(tarefaAtualizada);
    }
}
