package br.com.boletim.backend.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

public class NotaDTO {
    @NotNull(message = "Aluno é obrigatório")
    private Long alunoId;

    @NotNull(message = "Avaliação é obrigatória")
    private Long avaliacaoId;

    @DecimalMin(value = "0.0", inclusive = true, message = "Nota mínima é 0")
    @DecimalMax(value = "10.0", inclusive = true, message = "Nota máxima é 10")
    private Double valor;


    public NotaDTO() {
    }

    public Long getAlunoId() {
        return alunoId;
    }

    public void setAlunoId(Long alunoId) {
        this.alunoId = alunoId;
    }

    public Long getAvaliacaoId() {
        return avaliacaoId;
    }

    public void setAvaliacaoId(Long avaliacaoId) {
        this.avaliacaoId = avaliacaoId;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }
}