package com.senai.TarefasSustentaveis.Repository;

import com.senai.TarefasSustentaveis.Entity.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TarefaRepository extends JpaRepository<Long, Tarefa> {


}
