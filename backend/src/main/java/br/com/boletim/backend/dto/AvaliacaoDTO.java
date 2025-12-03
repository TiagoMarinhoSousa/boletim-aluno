package br.com.boletim.backend.dto;

public class AvaliacaoDTO {
    private String descricao;
    private Long disciplinaId;
    private int peso; // certifique-se de que o campo existe

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