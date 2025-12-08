package br.com.boletim.backend.service;

import br.com.boletim.backend.domain.Aluno;
import br.com.boletim.backend.domain.Disciplina;
import br.com.boletim.backend.domain.Nota;
import br.com.boletim.backend.domain.Turma;
import br.com.boletim.backend.dto.RelatorioAlunoDTO;
import br.com.boletim.backend.dto.RelatorioDisciplinaDTO;
import br.com.boletim.backend.dto.TurmaDTO;
import br.com.boletim.backend.repository.AlunoRepository;
import br.com.boletim.backend.repository.NotaRepository;
import br.com.boletim.backend.repository.TurmaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class TurmaService {

    private final TurmaRepository turmaRepository;
    private final AlunoRepository alunoRepository;
    private final NotaRepository notaRepository;

    public TurmaService(TurmaRepository turmaRepository,
                        AlunoRepository alunoRepository,
                        NotaRepository notaRepository) {
        this.turmaRepository = turmaRepository;
        this.alunoRepository = alunoRepository;
        this.notaRepository = notaRepository;
    }

    public List<Turma> listarTodas() {
        return turmaRepository.findAll();
    }

    public Turma buscarPorId(Long id) {
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O ID da turma não pode ser nulo.");
        }
        return turmaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Turma não encontrada com o ID: " + id));
    }

    public Turma salvar(TurmaDTO turmaDTO) {
        String nome = turmaDTO.getNome();
        if (nome == null || nome.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O nome da turma é obrigatório.");
        }

        Turma turma = new Turma();
        turma.setNome(nome);
        return turmaRepository.save(turma);
    }

    public void deletar(Long id) {
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O ID da turma não pode ser nulo.");
        }
        if (!turmaRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Turma não encontrada com o ID: " + id);
        }
        turmaRepository.deleteById(id);
    }

    /**
     * Gera relatório consolidado da turma: lista alunos e suas médias por disciplina.
     */
    public List<RelatorioAlunoDTO> gerarRelatorio(Long turmaId) {
        if (turmaId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O ID da turma não pode ser nulo.");
        }

        // Garante que a turma existe antes de prosseguir
        if (!turmaRepository.existsById(turmaId)) {
            // Retorna uma lista vazia se a turma não for encontrada, pois é um relatório
            return Collections.emptyList();
        }

        List<Aluno> alunos = alunoRepository.findByTurmaId(turmaId);
        List<RelatorioAlunoDTO> relatorio = new ArrayList<>();

        for (Aluno aluno : alunos) {
            RelatorioAlunoDTO alunoDTO = new RelatorioAlunoDTO();
            alunoDTO.setAlunoId(aluno.getId());
            alunoDTO.setAlunoNome(aluno.getNome());

            List<RelatorioDisciplinaDTO> disciplinasDTO = new ArrayList<>();

            for (Disciplina disciplina : aluno.getTurma().getDisciplinas()) {
                List<Nota> notas = notaRepository.findByAlunoIdAndAvaliacaoDisciplinaId(aluno.getId(), disciplina.getId());

                double somaNotasXPeso = 0.0;
                int somaPesos = 0;

                for (Nota nota : notas) {
                    int peso = nota.getAvaliacao().getPeso();
                    somaNotasXPeso += nota.getValor() * peso;
                    somaPesos += peso;
                }

                Double media = somaPesos == 0 ? null : somaNotasXPeso / somaPesos;

                RelatorioDisciplinaDTO disciplinaDTO = new RelatorioDisciplinaDTO();
                disciplinaDTO.setDisciplinaId(disciplina.getId());
                disciplinaDTO.setDisciplinaNome(disciplina.getNome());
                disciplinaDTO.setMedia(media);

                disciplinasDTO.add(disciplinaDTO);
            }

            alunoDTO.setDisciplinas(disciplinasDTO);
            relatorio.add(alunoDTO);
        }

        return relatorio;
    }
}