package br.com.boletim.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(description = "DTO para criar/atualizar uma avaliação")
public class AvaliacaoDTO {
    @NotBlank(message = "Descrição da avaliação é obrigatória")
    @Schema(description = "Descrição da avaliação", example = "Prova bimestral")
    private String descricao;
    
    @NotNull(message = "Disciplina é obrigatória")
    @Schema(description = "ID da disciplina", example = "1")
    private Long disciplinaId;

    @Min(value = 1, message = "Peso mínimo é 1")
    @Max(value = 10, message = "Peso máximo é 10")
    @Schema(description = "Peso da avaliação (1-10)", example = "5")
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