package br.com.boletim.backend.controller;

import br.com.boletim.backend.domain.Avaliacao;
import br.com.boletim.backend.dto.ErrorResponseDTO; // Adicionado
import br.com.boletim.backend.dto.AvaliacaoDTO;
import br.com.boletim.backend.service.AvaliacaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content; // Adicionado
import io.swagger.v3.oas.annotations.media.Schema; // Adicionado
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/avaliacoes")
@Tag(name = "Avaliações", description = "Gerenciamento de avaliações")
public class AvaliacaoController {
    private final AvaliacaoService avaliacaoService;

    public AvaliacaoController(AvaliacaoService avaliacaoService) {
        this.avaliacaoService = avaliacaoService;
    }

    @PostMapping
    @Operation(summary = "Criar nova avaliação", description = "Cria uma nova avaliação no sistema")
    @ApiResponses(value = {
 @ApiResponse(responseCode = "200", description = "Avaliação criada com sucesso"),
 @ApiResponse(responseCode = "400", description = "Dados inválidos",
 content = @Content(mediaType = "application/json",
 schema = @Schema(implementation = ErrorResponseDTO.class)))
    })
    public Avaliacao salvar(@Valid @RequestBody AvaliacaoDTO avaliacaoDTO) {
        return avaliacaoService.salvar(avaliacaoDTO);
    }

    @GetMapping
    @Operation(summary = "Listar todas as avaliações", description = "Retorna uma lista de todas as avaliações cadastradas")
    @ApiResponse(responseCode = "200", description = "Lista de avaliações recuperada com sucesso")
    public List<Avaliacao> listarTodas() {
        return avaliacaoService.listarTodas();
    }

    @GetMapping("/disciplina/{disciplinaId}")
    @Operation(summary = "Listar avaliações de uma disciplina", description = "Retorna todas as avaliações de uma disciplina específica")
    @ApiResponses(value = {
 @ApiResponse(responseCode = "200", description = "Avaliações recuperadas com sucesso"),
 @ApiResponse(responseCode = "404", description = "Disciplina não encontrada",
 content = @Content(mediaType = "application/json",
 schema = @Schema(implementation = ErrorResponseDTO.class)))
    })
    public List<Avaliacao> listarPorDisciplina(@Parameter(description = "ID da disciplina") @PathVariable Long disciplinaId) {
        return avaliacaoService.listarPorDisciplina(disciplinaId);
    }
}