package br.com.boletim.backend.controller;

import br.com.boletim.backend.domain.Aluno;
import br.com.boletim.backend.domain.Nota;
import br.com.boletim.backend.dto.AlunoDTO;
import br.com.boletim.backend.service.AlunoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alunos")
@Tag(name = "Alunos", description = "Gerenciamento de alunos")
public class AlunoController {

    private final AlunoService alunoService;

    public AlunoController(AlunoService alunoService) {
        this.alunoService = alunoService;
    }

    @GetMapping
    @Operation(summary = "Listar todos os alunos", description = "Retorna uma lista de todos os alunos cadastrados")
    @ApiResponse(responseCode = "200", description = "Lista de alunos recuperada com sucesso")
    public List<Aluno> listarTodos() {
        return alunoService.listarTodos();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar aluno por ID", description = "Retorna os detalhes de um aluno específico")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Aluno encontrado"),
        @ApiResponse(responseCode = "404", description = "Aluno não encontrado")
    })
    public Aluno buscarPorId(@Parameter(description = "ID do aluno") @PathVariable Long id) {
        return alunoService.buscarPorId(id);
    }

    @PostMapping
    @Operation(summary = "Criar novo aluno", description = "Cria um novo aluno no sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Aluno criado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos")
    })
    public Aluno salvar(@Valid @RequestBody AlunoDTO alunoDTO) {
        return alunoService.salvar(alunoDTO);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar aluno", description = "Remove um aluno do sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Aluno deletado com sucesso"),
        @ApiResponse(responseCode = "404", description = "Aluno não encontrado")
    })
    public void deletar(@Parameter(description = "ID do aluno") @PathVariable Long id) {
        alunoService.deletar(id);
    }

    @GetMapping("/{id}/notas")
    @Operation(summary = "Listar notas de um aluno", description = "Retorna todas as notas cadastradas de um aluno específico")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Notas recuperadas com sucesso"),
        @ApiResponse(responseCode = "404", description = "Aluno não encontrado")
    })
    public List<Nota> listarNotasPorAluno(@Parameter(description = "ID do aluno") @PathVariable Long id) {
        return alunoService.buscarNotasPorAluno(id);
    }
}