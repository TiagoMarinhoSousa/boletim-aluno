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
        String nomeAluno = alunoDTO.getNome();
        Long turmaId = alunoDTO.getTurmaId();

        // Validação explícita para satisfazer a análise estática e garantir robustez.
        if (nomeAluno == null || nomeAluno.isBlank() || turmaId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nome do aluno e ID da turma são obrigatórios.");
        }

        Turma turma = turmaRepository.findById(turmaId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Turma não encontrada com o ID: " + turmaId));

        Aluno aluno = new Aluno();
        aluno.setNome(nomeAluno);
        aluno.setTurma(turma);

        return alunoRepository.save(aluno);
    }

    public Aluno buscarPorId(Long id) {
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O ID do aluno não pode ser nulo.");
        }
        return alunoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Aluno não encontrado com o ID: " + id));
    }

    public void deletar(Long id) {
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O ID do aluno não pode ser nulo.");
        }
        if (!alunoRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Aluno não encontrado com o ID: " + id);
        }
        alunoRepository.deleteById(id);
    }

    public List<Aluno> buscarPorTurma(Long turmaId) {
        return alunoRepository.findByTurmaId(turmaId);
    }

    public List<Nota> buscarNotasPorAluno(Long alunoId) {
        return notaRepository.findByAlunoId(alunoId);
    }

}