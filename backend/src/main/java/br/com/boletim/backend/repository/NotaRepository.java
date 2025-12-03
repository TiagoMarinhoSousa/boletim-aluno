package br.com.boletim.backend.repository;

import br.com.boletim.backend.domain.Nota;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotaRepository extends JpaRepository<Nota, Long> {

    // Buscar todas as notas de um aluno
    List<Nota> findByAlunoId(Long alunoId);

    // Buscar nota única de um aluno para uma avaliação específica
    Optional<Nota> findByAlunoIdAndAvaliacaoId(Long alunoId, Long avaliacaoId);
}