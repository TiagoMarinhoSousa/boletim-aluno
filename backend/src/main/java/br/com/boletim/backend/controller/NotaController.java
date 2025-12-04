package br.com.boletim.backend.controller;

import br.com.boletim.backend.domain.Nota;
import br.com.boletim.backend.dto.NotaDTO;
import br.com.boletim.backend.service.NotaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notas")
@Tag(name = "Notas", description = "Gerenciamento de notas de alunos com cálculo automático de média ponderada")
public class NotaController {

    private final NotaService notaService;

    public NotaController(NotaService notaService) {
        this.notaService = notaService;
    }

    @PostMapping
    @Operation(summary = "Salvar uma nota", description = "Cria ou atualiza uma nota individual para um aluno em uma avaliação")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Nota salva com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos (valor fora do intervalo 0-10)"),
        @ApiResponse(responseCode = "404", description = "Aluno ou avaliação não encontrado")
    })
    public Nota salvar(@Valid @RequestBody NotaDTO notaDTO) {
        return notaService.salvar(notaDTO);
    }

    @PostMapping("/lote")
    @Operation(summary = "Salvar notas em lote", description = "Salva múltiplas notas de forma atômica - tudo ou nada")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Todas as notas salvas com sucesso"),
        @ApiResponse(responseCode = "400", description = "Alguma nota inválida - nenhuma nota é salva"),
        @ApiResponse(responseCode = "404", description = "Aluno ou avaliação não encontrado")
    })
    public List<Nota> salvarEmLote(@Valid @RequestBody List<NotaDTO> notasDTO) {
        return notaService.salvarEmLote(notasDTO);
    }

    @GetMapping
    @Operation(summary = "Listar todas as notas", description = "Retorna todas as notas cadastradas no sistema")
    @ApiResponse(responseCode = "200", description = "Lista de notas recuperada com sucesso")
    public List<Nota> listarTodas() {
        return notaService.listarTodas();
    }

    @GetMapping("/aluno/{alunoId}")
    @Operation(summary = "Listar notas de um aluno", description = "Retorna todas as notas de um aluno específico")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Notas do aluno recuperadas"),
        @ApiResponse(responseCode = "404", description = "Aluno não encontrado")
    })
    public List<NotaDTO> listarPorAluno(
        @Parameter(description = "ID do aluno") @PathVariable Long alunoId
    ) {
        return notaService.listarPorAluno(alunoId);
    }

    @GetMapping("/aluno/{alunoId}/media-ponderada")
    @Operation(summary = "Calcular média ponderada de um aluno", description = "Retorna a média ponderada de todas as notas do aluno")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Média ponderada calculada com sucesso"),
        @ApiResponse(responseCode = "404", description = "Aluno não encontrado ou sem notas")
    })
    public Double calcularMediaPonderadaPorAluno(
        @Parameter(description = "ID do aluno") @PathVariable Long alunoId
    ) {
        return notaService.calcularMediaPonderadaPorAluno(alunoId);
    }

    @GetMapping("/aluno/{alunoId}/boletim")
    @Operation(summary = "Gerar boletim de um aluno", description = "Retorna todas as notas do aluno com informações de avaliação e disciplina")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Boletim recuperado com sucesso"),
        @ApiResponse(responseCode = "404", description = "Aluno não encontrado")
    })
    public List<Nota> listarBoletimPorAluno(
        @Parameter(description = "ID do aluno") @PathVariable Long alunoId
    ) {
        return notaService.listarBoletimPorAluno(alunoId);
    }

    @GetMapping("/disciplina/{disciplinaId}/media-ponderada")
    @Operation(summary = "Calcular média ponderada de uma disciplina", description = "Retorna a média ponderada de todas as notas em uma disciplina")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Média ponderada da disciplina calculada"),
        @ApiResponse(responseCode = "404", description = "Disciplina não encontrada ou sem notas")
    })
    public Double calcularMediaPonderadaPorDisciplina(
        @Parameter(description = "ID da disciplina") @PathVariable Long disciplinaId
    ) {
        return notaService.calcularMediaPonderadaPorDisciplina(disciplinaId);
    }

}