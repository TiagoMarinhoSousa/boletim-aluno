package br.com.boletim.backend.repository;

import br.com.boletim.backend.domain.Nota;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NotaRepository extends JpaRepository<Nota, Long> {
    List<Nota> findByAlunoId(Long alunoId);
}