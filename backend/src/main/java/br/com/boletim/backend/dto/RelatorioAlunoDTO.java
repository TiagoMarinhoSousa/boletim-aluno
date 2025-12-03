package br.com.boletim.backend.dto;

import java.util.List;

public class RelatorioAlunoDTO {
    private Long alunoId;
    private String alunoNome;
    private List<RelatorioDisciplinaDTO> disciplinas;

    public Long getAlunoId() {
        return alunoId;
    }

    public void setAlunoId(Long alunoId) {
        this.alunoId = alunoId;
    }

    public String getAlunoNome() {
        return alunoNome;
    }

    public void setAlunoNome(String alunoNome) {
        this.alunoNome = alunoNome;
    }

    public List<RelatorioDisciplinaDTO> getDisciplinas() {
        return disciplinas;
    }

    public void setDisciplinas(List<RelatorioDisciplinaDTO> disciplinas) {
        this.disciplinas = disciplinas;
    }
}