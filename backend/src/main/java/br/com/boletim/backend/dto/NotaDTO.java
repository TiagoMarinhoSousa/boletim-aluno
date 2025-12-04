package br.com.boletim.backend.dto;

import br.com.boletim.backend.domain.Nota;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

@Schema(description = "DTO para criar/atualizar uma nota")
public class NotaDTO {

    @NotNull(message = "Aluno é obrigatório")
    @Schema(description = "ID do aluno", example = "1")
    private Long alunoId;

    @NotNull(message = "Avaliação é obrigatória")
    @Schema(description = "ID da avaliação", example = "1")
    private Long avaliacaoId;

    @DecimalMin(value = "0.0", inclusive = true, message = "Nota mínima é 0")
    @DecimalMax(value = "10.0", inclusive = true, message = "Nota máxima é 10")
    @Schema(description = "Valor da nota (0-10)", example = "8.5")
    private Double valor;

    public NotaDTO() {
    }

    // ✅ Construtor que converte Nota para DTO
    public NotaDTO(Nota nota) {
        this.alunoId = nota.getAluno().getId();
        this.avaliacaoId = nota.getAvaliacao().getId();
        this.valor = nota.getValor();
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