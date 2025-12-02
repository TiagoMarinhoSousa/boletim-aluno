package br.com.boletim.backend.service;

import br.com.boletim.backend.domain.Nota;
import br.com.boletim.backend.repository.NotaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotaService {
    private final NotaRepository notaRepository;

    public NotaService(NotaRepository notaRepository) {
        this.notaRepository = notaRepository;
    }

    public List<Nota> listarTodas() {
        return notaRepository.findAll();
    }

    public Nota salvar(Nota nota) {
        return notaRepository.save(nota);
    }

    public Nota buscarPorId(Long id) {
        return notaRepository.findById(id).orElse(null);
    }

    public void deletar(Long id) {
        notaRepository.deleteById(id);
    }
}