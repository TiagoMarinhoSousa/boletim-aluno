package br.com.boletim.backend.domain;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Turma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @OneToMany(mappedBy = "turma")
    private List<Aluno> alunos;

    // Getters e Setters
}