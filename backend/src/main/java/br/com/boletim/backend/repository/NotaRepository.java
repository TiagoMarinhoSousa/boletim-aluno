package br.com.boletim.backend.repository;

import br.com.boletim.backend.domain.Nota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface NotaRepository extends JpaRepository<Nota, Long> {

    // Buscar todas as notas de um aluno
    List<Nota> findByAlunoId(Long alunoId);

    // Buscar nota específica de um aluno para uma avaliação
    Optional<Nota> findByAlunoIdAndAvaliacaoId(Long alunoId, Long avaliacaoId);

    
    List<Nota> findByAlunoIdAndAvaliacaoDisciplinaId(Long alunoId, Long disciplinaId);

    // Alternativa com @Query explícita
    @Query("SELECT n FROM Nota n WHERE n.aluno.id = :alunoId AND n.avaliacao.disciplina.id = :disciplinaId")
    List<Nota> buscarNotasPorAlunoEDisciplina(@Param("alunoId") Long alunoId,
                                              @Param("disciplinaId") Long disciplinaId);
}