package br.com.boletim.backend.repository;

import br.com.boletim.backend.domain.Nota;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotaRepository extends JpaRepository<Nota, Long> {
}