package com.senai.TarefasSustentaveis.Repository;

import com.senai.TarefasSustentaveis.Entity.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {

}
