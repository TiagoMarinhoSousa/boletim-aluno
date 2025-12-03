package br.com.boletim.backend.dto;

public class NotaDTO {
    private Long alunoId;
    private Long avaliacaoId;
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