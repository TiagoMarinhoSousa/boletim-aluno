package br.com.boletim.backend.controller;

import br.com.boletim.backend.domain.Aluno;
import br.com.boletim.backend.domain.Turma;
import br.com.boletim.backend.dto.TurmaDTO;           
import br.com.boletim.backend.service.AlunoService;
import br.com.boletim.backend.service.TurmaService;
import jakarta.validation.Valid;                      
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/turmas")
public class TurmaController {

    private final TurmaService turmaService;
    private final AlunoService alunoService;

    public TurmaController(TurmaService turmaService, AlunoService alunoService) {
        this.turmaService = turmaService;
        this.alunoService = alunoService;
    }

    @GetMapping
    public List<Turma> listarTodas() {
        return turmaService.listarTodas();
    }

    @GetMapping("/{id}")
    public Turma buscarPorId(@PathVariable Long id) {
        return turmaService.buscarPorId(id);
    }

    @PostMapping
    public Turma salvar(@Valid @RequestBody TurmaDTO turmaDTO) {
        return turmaService.salvar(turmaDTO);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        turmaService.deletar(id);
    }

    @GetMapping("/{turmaId}/alunos")
    public List<Aluno> listarAlunosPorTurma(@PathVariable Long turmaId) {
        return alunoService.buscarPorTurma(turmaId);
    }
}
