package br.com.boletim.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AvaliacaoDTO {
    @NotBlank(message = "Descrição da avaliação é obrigatória")
    private String descricao;
    
    @NotNull(message = "Disciplina é obrigatória")
    private Long disciplinaId;

    @Min(value = 1, message = "Peso mínimo é 1")
    @Max(value = 10, message = "Peso máximo é 10")
    private int peso;

    public AvaliacaoDTO() {
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Long getDisciplinaId() {
        return disciplinaId;
    }

    public void setDisciplinaId(Long disciplinaId) {
        this.disciplinaId = disciplinaId;
    }

    public int getPeso() {
        return peso;
    } 

    public void setPeso(int peso) {
        this.peso = peso;
    } 
}