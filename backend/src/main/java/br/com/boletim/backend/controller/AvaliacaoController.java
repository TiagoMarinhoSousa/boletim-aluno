package br.com.boletim.backend.controller;

import br.com.boletim.backend.domain.Avaliacao;
import br.com.boletim.backend.dto.AvaliacaoDTO;
import br.com.boletim.backend.service.AvaliacaoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/avaliacoes")
public class AvaliacaoController {
    private final AvaliacaoService avaliacaoService;

    public AvaliacaoController(AvaliacaoService avaliacaoService) {
        this.avaliacaoService = avaliacaoService;
    }

    @PostMapping
    public Avaliacao salvar(@RequestBody AvaliacaoDTO avaliacaoDTO) {
        return avaliacaoService.salvar(avaliacaoDTO);
    }

    @GetMapping
    public List<Avaliacao> listarTodas() {
        return avaliacaoService.listarTodas();
    }

    @GetMapping("/disciplina/{disciplinaId}")
    public List<Avaliacao> listarPorDisciplina(@PathVariable Long disciplinaId) {
        return avaliacaoService.listarPorDisciplina(disciplinaId);
    }
}