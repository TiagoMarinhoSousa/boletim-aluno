package br.com.boletim.backend.controller;

import br.com.boletim.backend.domain.Nota;
import br.com.boletim.backend.dto.NotaDTO;
import br.com.boletim.backend.service.NotaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notas")
public class NotaController {

    private final NotaService notaService;

    public NotaController(NotaService notaService) {
        this.notaService = notaService;
    }

    @PostMapping
    public Nota salvar(@RequestBody NotaDTO notaDTO) {
        return notaService.salvar(notaDTO);
    }

    @GetMapping
    public List<Nota> listarTodas() {
        return notaService.listarTodas();
    }

    @GetMapping("/aluno/{alunoId}")
    public List<Nota> listarPorAluno(@PathVariable Long alunoId) {
        return notaService.listarPorAluno(alunoId);
    }

    @GetMapping("/aluno/{alunoId}/media-ponderada")
    public Double calcularMediaPonderadaPorAluno(@PathVariable Long alunoId) {
        return notaService.calcularMediaPonderadaPorAluno(alunoId);
    }

}