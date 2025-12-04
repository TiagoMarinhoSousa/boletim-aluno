package br.com.boletim.backend.controller;

import br.com.boletim.backend.domain.Disciplina;
import br.com.boletim.backend.dto.DisciplinaDTO;
import br.com.boletim.backend.service.DisciplinaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/disciplinas")
@Tag(name = "Disciplinas", description = "Gerenciamento de disciplinas")
public class DisciplinaController {
    private final DisciplinaService disciplinaService;

    public DisciplinaController(DisciplinaService disciplinaService) {
        this.disciplinaService = disciplinaService;
    }

    @PostMapping
    @Operation(summary = "Criar nova disciplina", description = "Cria uma nova disciplina no sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Disciplina criada com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos")
    })
    public Disciplina salvar(@RequestBody DisciplinaDTO disciplinaDTO) {
        return disciplinaService.salvar(disciplinaDTO);
    }

    @GetMapping
    @Operation(summary = "Listar todas as disciplinas", description = "Retorna uma lista de todas as disciplinas cadastradas")
    @ApiResponse(responseCode = "200", description = "Lista de disciplinas recuperada com sucesso")
    public List<Disciplina> listarTodas() {
        return disciplinaService.listarTodas();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar disciplina por ID", description = "Retorna os detalhes de uma disciplina específica")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Disciplina encontrada"),
        @ApiResponse(responseCode = "404", description = "Disciplina não encontrada")
    })
    public Disciplina buscarPorId(@Parameter(description = "ID da disciplina") @PathVariable Long id) {
        return disciplinaService.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar disciplina", description = "Remove uma disciplina do sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Disciplina deletada com sucesso"),
        @ApiResponse(responseCode = "404", description = "Disciplina não encontrada")
    })
    public void deletar(@Parameter(description = "ID da disciplina") @PathVariable Long id) {
        disciplinaService.deletar(id);
    }

}