package br.com.boletim.backend.service;

import br.com.boletim.backend.domain.Aluno;
import br.com.boletim.backend.domain.Nota;
import br.com.boletim.backend.domain.Turma;
import br.com.boletim.backend.dto.AlunoDTO;
import br.com.boletim.backend.repository.AlunoRepository;
import br.com.boletim.backend.repository.NotaRepository;
import br.com.boletim.backend.repository.TurmaRepository;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AlunoService {
    private final AlunoRepository alunoRepository;
    private final NotaRepository notaRepository;
    private final TurmaRepository turmaRepository;

    public AlunoService(AlunoRepository alunoRepository, NotaRepository notaRepository,
            TurmaRepository turmaRepository) {
        this.alunoRepository = alunoRepository;
        this.notaRepository = notaRepository;
        this.turmaRepository = turmaRepository;
    }

    public List<Aluno> listarTodos() {
        return alunoRepository.findAll();
    }

 public Aluno salvar(AlunoDTO alunoDTO) {
    if (alunoDTO == null || alunoDTO.getNome() == null || alunoDTO.getNome().trim().isEmpty()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nome do aluno é obrigatório");
    }

    if (alunoDTO.getTurmaId() == null) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "turmaId é obrigatório");
    }

    System.out.println("DTO recebido: nome=" + alunoDTO.getNome() + ", turmaId=" + alunoDTO.getTurmaId());

    Turma turma = turmaRepository.findById(alunoDTO.getTurmaId())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Turma não encontrada"));

    Aluno aluno = new Aluno();
    aluno.setNome(alunoDTO.getNome());
    aluno.setTurma(turma);

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