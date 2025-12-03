package br.com.boletim.backend.controller;

import br.com.boletim.backend.domain.Disciplina;
import br.com.boletim.backend.dto.DisciplinaDTO;
import br.com.boletim.backend.service.DisciplinaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/disciplinas")
public class DisciplinaController {
    private final DisciplinaService disciplinaService;

    public DisciplinaController(DisciplinaService disciplinaService) {
        this.disciplinaService = disciplinaService;
    }

    @PostMapping
    public Disciplina salvar(@RequestBody DisciplinaDTO disciplinaDTO) {
        return disciplinaService.salvar(disciplinaDTO);
    }

    @GetMapping
    public List<Disciplina> listarTodas() {
        return disciplinaService.listarTodas();
    }

    @GetMapping("/{id}")
    public Disciplina buscarPorId(@PathVariable Long id) {
        return disciplinaService.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        disciplinaService.deletar(id);
    }

}