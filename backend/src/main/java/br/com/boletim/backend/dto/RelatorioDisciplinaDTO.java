package br.com.boletim.backend.dto;

public class RelatorioDisciplinaDTO {
    private Long disciplinaId;
    private String disciplinaNome;
    private Double media;

    // getters e setters
    public Long getDisciplinaId() {
        return disciplinaId;
    }

    public void setDisciplinaId(Long disciplinaId) {
        this.disciplinaId = disciplinaId;
    }

    public String getDisciplinaNome() {
        return disciplinaNome;
    }

    public void setDisciplinaNome(String disciplinaNome) {
        this.disciplinaNome = disciplinaNome;
    }

    public Double getMedia() {
        return media;
    }

    public void setMedia(Double media) {
        this.media = media;
    }
}