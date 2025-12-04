package br.com.boletim.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "DTO para criar/atualizar uma turma")
public class TurmaDTO {

    @NotBlank(message = "Nome da turma é obrigatório")
    @Schema(description = "Nome da turma", example = "Turma A")
    private String nome;

    public TurmaDTO() {
    }

    public TurmaDTO(String nome) {
        this.nome = nome;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}