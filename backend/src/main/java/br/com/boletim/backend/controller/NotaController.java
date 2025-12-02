package br.com.boletim.backend.controller;

import br.com.boletim.backend.domain.Nota;
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

    @GetMapping
    public List<Nota> listarTodas() {
        return notaService.listarTodas();
    }

    @GetMapping("/{id}")
    public Nota buscarPorId(@PathVariable Long id) {
        return notaService.buscarPorId(id);
    }

    @PostMapping
    public Nota salvar(@RequestBody Nota nota) {
        return notaService.salvar(nota);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        notaService.deletar(id);
    }
}