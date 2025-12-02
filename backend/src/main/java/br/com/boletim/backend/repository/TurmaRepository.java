package br.com.boletim.backend.repository;

import br.com.boletim.backend.domain.Turma;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TurmaRepository extends JpaRepository<Turma, Long> {
}