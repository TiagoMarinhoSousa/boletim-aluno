package br.com.boletim.backend.controller;

import br.com.boletim.backend.domain.Aluno;
import br.com.boletim.backend.domain.Turma;
import br.com.boletim.backend.dto.RelatorioAlunoDTO;
import br.com.boletim.backend.dto.TurmaDTO;
import br.com.boletim.backend.service.AlunoService;
import br.com.boletim.backend.service.TurmaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/turmas")
@Tag(name = "Turmas", description = "Gerenciamento de turmas")
public class TurmaController {

    private final TurmaService turmaService;
    private final AlunoService alunoService;

    public TurmaController(TurmaService turmaService, AlunoService alunoService) {
        this.turmaService = turmaService;
        this.alunoService = alunoService;
    }

    @GetMapping
    @Operation(summary = "Listar todas as turmas", description = "Retorna uma lista de todas as turmas cadastradas")
    @ApiResponse(responseCode = "200", description = "Lista de turmas recuperada com sucesso")
    public List<Turma> listarTodas() {
        return turmaService.listarTodas();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar turma por ID", description = "Retorna os detalhes de uma turma específica")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Turma encontrada"),
        @ApiResponse(responseCode = "404", description = "Turma não encontrada")
    })
    public Turma buscarPorId(@Parameter(description = "ID da turma") @PathVariable Long id) {
        return turmaService.buscarPorId(id);
    }

    @PostMapping
    @Operation(summary = "Criar nova turma", description = "Cria uma nova turma no sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Turma criada com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos")
    })
    public Turma salvar(@Valid @RequestBody TurmaDTO turmaDTO) {
        return turmaService.salvar(turmaDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar turma", description = "Remove uma turma do sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Turma deletada com sucesso"),
        @ApiResponse(responseCode = "404", description = "Turma não encontrada")
    })
    public void deletar(@Parameter(description = "ID da turma") @PathVariable Long id) {
        turmaService.deletar(id);
    }

    @GetMapping("/{turmaId}/alunos")
    @Operation(summary = "Listar alunos de uma turma", description = "Retorna todos os alunos matriculados em uma turma")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de alunos recuperada"),
        @ApiResponse(responseCode = "404", description = "Turma não encontrada")
    })
    public List<Aluno> listarAlunosPorTurma(@Parameter(description = "ID da turma") @PathVariable Long turmaId) {
        return alunoService.buscarPorTurma(turmaId);
    }

    @GetMapping("/{id}/relatorio")
    @Operation(summary = "Gerar relatório consolidado da turma", description = "Retorna relatório com notas de todos os alunos da turma")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Relatório gerado com sucesso"),
        @ApiResponse(responseCode = "404", description = "Turma não encontrada")
    })
    public List<RelatorioAlunoDTO> relatorio(@Parameter(description = "ID da turma") @PathVariable Long id) {
        return turmaService.gerarRelatorio(id);
    }
}