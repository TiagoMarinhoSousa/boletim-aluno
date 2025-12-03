package br.com.boletim.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class TurmaDTO {

    @NotBlank(message = "Nome da turma é obrigatório")
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