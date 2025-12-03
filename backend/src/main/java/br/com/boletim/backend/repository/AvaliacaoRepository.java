package br.com.boletim.backend.repository;

import br.com.boletim.backend.domain.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
    List<Avaliacao> findByDisciplinaId(Long disciplinaId);
}