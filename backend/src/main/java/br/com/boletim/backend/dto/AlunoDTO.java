package br.com.boletim.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "DTO para criar/atualizar um aluno")
public class AlunoDTO {
    @NotBlank(message = "Nome do aluno é obrigatório")
    @Schema(description = "Nome completo do aluno", example = "João Silva")
    private String nome;
    
    @Schema(description = "ID da turma", example = "1")
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