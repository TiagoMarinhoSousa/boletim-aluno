package br.com.boletim.backend.repository;

import br.com.boletim.backend.domain.Aluno;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {

    List<Aluno> findByTurmaId(Long turmaId);
}