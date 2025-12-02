package br.com.boletim.backend.service;

import br.com.boletim.backend.domain.Aluno;
import br.com.boletim.backend.domain.Nota;
import br.com.boletim.backend.repository.AlunoRepository;
import br.com.boletim.backend.repository.NotaRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AlunoService {
    private final AlunoRepository alunoRepository;
    private final NotaRepository notaRepository;
    
    public AlunoService(AlunoRepository alunoRepository, NotaRepository notaRepository) {
        this.alunoRepository = alunoRepository;
        this.notaRepository = notaRepository;
    }

    public List<Aluno> listarTodos() {
        return alunoRepository.findAll();
    }

    public Aluno salvar(Aluno aluno) {
        return alunoRepository.save(aluno);
    }

    public Aluno buscarPorId(Long id) {
        return alunoRepository.findById(id).orElse(null);
    }

    public void deletar(Long id) {
        alunoRepository.deleteById(id);
    }

    public List<Aluno> buscarPorTurma(Long turmaId) {
        return alunoRepository.findByTurmaId(turmaId);
    }

    public List<Nota> buscarNotasPorAluno(Long alunoId) {
        return notaRepository.findByAlunoId(alunoId);
    }

}