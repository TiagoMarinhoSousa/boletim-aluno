package br.com.boletim.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class DisciplinaDTO {
    @NotBlank(message = "Nome da disciplina é obrigatório")
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