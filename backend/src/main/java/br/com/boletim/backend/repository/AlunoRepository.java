package br.com.boletim.backend.repository;

import br.com.boletim.backend.domain.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
}