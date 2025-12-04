package br.com.boletim.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "DTO para criar/atualizar uma disciplina")
public class DisciplinaDTO {
    @NotBlank(message = "Nome da disciplina é obrigatório")
    @Schema(description = "Nome da disciplina", example = "Matemática")
    private String nome;

    public DisciplinaDTO() {
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}