# Checklist de Avaliação - Feedback Tech Lead

**Data:** 10 de dezembro de 2025

---

## ✅ Implementado

### Backend
- [x] Stack moderna (Java 17 + Spring Boot 3)
- [x] Arquitetura em camadas (controller → service → repository → domain → dto)
- [x] DTOs para tráfego entre API e front
- [x] H2 em memória com data.sql seed
- [x] Validação de nota 0-10 com ResponseStatusException
- [x] Verificação de existência de aluno/avaliação (404)
- [x] Upsert de nota (atualiza ou cria)
- [x] Pré-validação em lote ("tudo ou nada")
- [x] Swagger/OpenAPI documentação
- [x] 54 testes unitários passando

### Frontend
- [x] Angular 16+ modularizado (modules/nota, turma, aluno, disciplina)
- [x] Services e models separados
- [x] Validação de entrada (0-10, NaN permitido)
- [x] Cálculo de média ponderada Σ(nota×peso)/Σ(peso)
- [x] Estados visuais (.input-erro, .input-alterado)
- [x] Snackbars para sucesso/erro
- [x] Botão "Salvar" desabilitado quando necessário
- [x] Spinner durante carregamento
- [x] 76 testes passando (92% cobertura)
- [x] Cobertura automatizada com ng test --code-coverage

### Documentação
- [x] README.md completo com Quick Start
- [x] VERIFICACAO_COMPLETA.md
- [x] TESTES_FRONTEND_FINAL.md
- [x] Descrição clara de testes e cenários

---

## ⏳ A Implementar (Próximas Iterações)

### Backend
- [x] **Bean Validation nas DTOs** - @Min, @Max, @NotNull, @NotBlank ✅ (já implementado)
- [x] **@ControllerAdvice global** - GlobalExceptionHandler + ErrorResponseDTO ✅ (já implementado)
- [x] **@Transactional explícito** - já implementado em salvarEmLote() ✅
- [x] **Constraint única no banco** - @UniqueConstraint em Nota.java ✅ (já implementado)
- [ ] **Perfis de configuração** - application-dev.properties / application-prod.properties
- [ ] **Migração para Postgres/MySQL** - com Flyway ou Liquibase

### Frontend
- [ ] **Typing estrito** - eliminar `any[]`, usar tipos específicos (Turma[], Aluno[])
- [ ] **Ativar strict no tsconfig** - maior segurança de tipos
- [ ] **Reactive Forms** - migrar de validação manual para FormGroup/FormControl
- [ ] **Remover alert()** - padronizar tudo com MatSnackBar (✅ já feito nos testes)
- [ ] **Separar componentes** - quebrar NotaComponent em componentes menores

### DevOps / Produção
- [ ] **CI com GitHub Actions** - workflow rodando mvn test + npm test
- [ ] **Badge de cobertura** - exibir no README
- [ ] **Dockerização** - container para backend + Angular build estático
- [ ] **Versionamento de API** - /api/v1/...
- [ ] **Autenticação/Autorização** - Spring Security + JWT

---

## 📊 Resumo

| Categoria | Implementado | Pendente |
|-----------|--------------|----------|
| Backend | 10 itens | 6 itens |
| Frontend | 10 itens | 5 itens |
| DevOps | 0 itens | 5 itens |
| **Total** | **20 itens** | **16 itens** |

**Status atual:** Dev Pleno forte → Sênior (conforme avaliação do Tech Lead)
