package br.com.boletim.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class AlunoDTO {
    @NotBlank(message = "Nome do aluno é obrigatório")
    private String nome;
    private Long turmaId;

    // 🔑 Construtor vazio obrigatório
    public AlunoDTO() {
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getTurmaId() {
        return turmaId;
    }

    public void setTurmaId(Long turmaId) {
        this.turmaId = turmaId;
    }
}