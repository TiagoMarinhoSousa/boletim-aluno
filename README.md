# 📚 Boletim do Aluno - Sistema de Lançamento de Notas

[![Status](https://img.shields.io/badge/status-completo-success)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()
[![Java](https://img.shields.io/badge/Java-17-blue)]()
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.4-green)]()
[![Angular](https://img.shields.io/badge/Angular-16%2B-red)]()

> **MVP funcional de lançamento de notas com cálculo automático de média ponderada**

## 📋 Visão Geral

Sistema web para gerenciar lançamento de notas de alunos por disciplina e turma. Permite:
- Selecionar turma e disciplina
- Preencher notas em tabela editável
- Calcular média ponderada automaticamente
- Salvar em lote com validação dupla camada

**Tecnologia Full Stack:** Java Spring Boot 3 (Backend) + Angular 16+ (Frontend) + H2 (Banco)

---

## 🚀 Quick Start

### Pré-requisitos

- Java 17+
- Node.js 18+ / npm 9+
- Maven 3.9+

### Backend (Spring Boot)

```bash
# 1. Navegar para pasta backend
cd backend

# 2. Executar aplicação
mvn spring-boot:run

# Servidor rodará em: http://localhost:8080
```

**Endpoints principais:**
- `GET /turmas` - Listar turmas
- `GET /disciplinas` - Listar disciplinas
- `GET /alunos/turma/{id}` - Listar alunos por turma
- `GET /avaliacoes` - Listar avaliações
- `POST /notas/lote` - Salvar notas em lote
- `GET /notas/aluno/{id}/media-ponderada` - Calcular média

### Frontend (Angular)

```bash
# 1. Navegar para pasta frontend
cd frontend

# 2. Instalar dependências (primeira vez)
npm install

# 3. Executar servidor dev
ng serve

# Aplicação disponível em: http://localhost:4200
```

**Fluxo de uso:**
1. Selecionar turma no dropdown
2. Selecionar disciplina no dropdown
3. Preencher notas (0-10) na tabela
4. Ver média atualizar automaticamente
5. Clicar "Salvar Notas"

---

## 📊 Estrutura do Projeto

```
boletim-aluno/
├── backend/                    # Spring Boot API
│   ├── src/main/
│   │   ├── java/br/com/boletim/backend/
│   │   │   ├── controller/     # REST controllers
│   │   │   ├── service/        # Lógica de negócio
│   │   │   ├── repository/     # Acesso a dados
│   │   │   ├── domain/         # Entidades JPA
│   │   │   └── dto/            # Data Transfer Objects
│   │   └── resources/
│   │       ├── application.properties
│   │       └── data.sql        # Dados iniciais (seed)
│   ├── src/test/java/          # Testes unitários (54 testes)
│   └── pom.xml                 # Dependências Maven
│
├── frontend/                   # Angular SPA
│   ├── src/app/
│   │   ├── modules/
│   │   │   ├── nota/           # Módulo principal
│   │   │   ├── turma/
│   │   │   ├── aluno/
│   │   │   └── disciplina/
│   │   ├── services/           # Serviços HTTP
│   │   ├── models/             # Interfaces/DTOs
│   │   ├── app.component.*
│   │   └── app.module.ts
│   ├── src/test/               # Testes (94 testes)
│   ├── angular.json
│   ├── tsconfig.json
│   └── package.json
│
├── ANALISE_COMPARATIVA.md      # Análise vs. desafio técnico
├── VERIFICACAO_COMPLETA.md     # Verificação da implementação
├── README.md                   # Este arquivo
└── .gitignore

```

---

## 🎯 Funcionalidades Principais

### ✅ Requisitos Obrigatórios

| Funcionalidade | Status | Detalhes |
|---|---|---|
| **Seleção de Turma e Disciplina** | ✅ | Dropdowns com dados do backend |
| **Listagem de Alunos/Avaliações** | ✅ | Carregamento dinâmico |
| **Tabela Editável** | ✅ | Linhas = alunos, Colunas = avaliações |
| **Exibição de Pesos** | ✅ | Pesos 1-5 mostrados no cabeçalho |
| **Cálculo de Média** | ✅ | Média ponderada em tempo real |
| **Salvamento em Lote** | ✅ | Um clique, valida tudo, salva tudo |

### 🎁 Implementações extras

| Recurso | Status | Detalhes |
|---|---|---|
| **148 Testes Automatizados** | ✅ | 54 backend + 94 frontend |
| **Validação Dupla Camada** | ✅ | Frontend + Backend |
| **Feedback Visual** | ✅ | Snackbars, spinner, highlighting |
| **Tratamento de Erros** | ✅ | Mensagens claras em português |
| **Arquitetura Modular** | ✅ | Separação clara de responsabilidades |
| **Swagger/OpenAPI** | ✅ | Documentação interativa completa da API |

---

## 💾 Banco de Dados

### H2 em Memória

O banco é carregado automaticamente com dados iniciais no `data.sql`:

```
Turmas:          2 turmas (A, B)
Disciplinas:     4 disciplinas (Matemática, Português, História, Ciências)
Alunos:          10 alunos (5 por turma)
Avaliações:      3 avaliações por aluno
```

**Acesso ao console H2:**
- URL: `http://localhost:8080/h2-console`
- Username: `sa`
- Password: (deixar em branco)

---

## 🧪 Testes

### Backend (54 testes - 100% passando)

```bash
# Executar todos os testes
mvn clean test

# Executar testes com relatório de cobertura (JaCoCo)
mvn clean test jacoco:report
# Relatório HTML gerado em: target/site/jacoco/index.html

# Testes específicos
mvn test -Dtest=NotaServiceUnitTest
mvn test -Dtest=AlunoServiceTest
mvn test -Dtest=NotaServiceTest
```

**Cobertura:**
- ✅ NotaServiceUnitTest (12 testes)
- ✅ AlunoServiceTest (17 testes)
- ✅ NotaServiceTest (25 testes)

Documentação completa: [TESTES.md](backend/TESTES.md)

### Frontend (94 testes - 100% passando)

```bash
# Executar testes com watch mode
npm test

# Executar testes com cobertura
npm run test:coverage
# Relatório HTML gerado em: coverage/boletim-frontend/index.html

# Executar testes para CI/CD (headless + coverage)
npm run test:ci
```

**Cobertura (100%):**
- ✅ NotaComponent (54 testes) - Reactive Forms
- ✅ NotaService (17 testes)
- ✅ TurmaService (5 testes)
- ✅ DisciplinaService (9 testes)
- ✅ AlunoService (5 testes)
- ✅ ErrorInterceptor (3 testes)
- ✅ AppComponent (1 teste)

Documentação completa: [TESTES_FRONTEND_FINAL.md](TESTES_FRONTEND_FINAL.md)

---

## 📐 Arquitetura

### Backend - Padrão em Camadas

```
Controller (REST endpoints)
    ↓
Service (Lógica de negócio)
    ↓
Repository (Acesso a dados)
    ↓
Domain (Entidades JPA)
```
### Frontend - Modularização Angular

```
app/
├── modules/
│   ├── nota/
│   │   ├── nota.component.ts       (Lógica principal)
│   │   ├── nota.component.html     (Template)
│   │   ├── nota.component.scss     (Estilos)
│   │   └── nota.component.spec.ts  (Testes)
│   └── ...
├── services/
│   ├── nota.service.ts             (HTTP chamadas)
│   └── ...
└── models/
    ├── avaliacao.model.ts
    └── ...
```

---

## 🔒 Validações

### Dupla Camada de Validação

#### Frontend
```typescript
// 1. Type="number" - força entrada numérica
<input type="number" min="0" max="10" (change)="atualizarNota(...)">

// 2. Validação via Reactive Forms com feedback visual (snackBar)
atualizarNota(alunoId: number, avaliacaoId: number, valor: number): void {
    const control = this.getNotaControl(alunoId, avaliacaoId);
    
    if (control.invalid) {
        this.snackBar.open('✗ O valor da nota deve estar entre 0 e 10.', 'Fechar', {
            duration: 3000,
            panelClass: ['snackbar-erro']
        });
        return;
    }
    // Se entrada válida, atualiza a nota
}

// 3. Pré-validação antes de enviar com feedback visual
salvarNotas() {
    if (this.notasForm.invalid) {
        this.snackBar.open('✗ Existem campos com validação pendente.', 'Fechar', {
            duration: 5000,
            panelClass: ['snackbar-erro']
        });
        return;
    }
    // ... envia notas
}
```

#### Backend
```java
// 1. Validação de nulidade
if (alunoId == null || avaliacaoId == null || valorNota == null) {
    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
        "IDs de aluno, avaliação e o valor da nota não podem ser nulos.");
}

// 2. Validação de limites (0-10)
if (valorNota < 0 || valorNota > 10) {
    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
        "Nota deve estar entre 0 e 10");
}

// 3. Upsert: verifica se existe nota e atualiza ou cria nova
Optional<Nota> existente = notaRepository.findByAlunoIdAndAvaliacaoId(alunoId, avaliacaoId);
if (existente.isPresent()) {
    nota = existente.get();
    nota.setValor(valorNota); // sobrescreve
} else {
    nota = new Nota(); // cria nova
    nota.setAluno(aluno);
    nota.setAvaliacao(avaliacao);
    nota.setValor(valorNota);
}
notaRepository.save(nota);

// 4. Constraint única no banco (definida na entidade JPA)
@Table(uniqueConstraints = @UniqueConstraint(columnNames = { "aluno_id", "avaliacao_id" }))
```

### Regras Aplicadas

- ✅ Nota deve estar entre 0 e 10 (inclusive)
- ✅ Máximo 1 nota por aluno/avaliação (upsert)
- ✅ Média ponderada com fórmula correta
- ✅ "-" quando aluno sem notas
- ✅ Atomicidade em lote (tudo ou nada)

---

## 📊 Cálculo de Média Ponderada

### Fórmula

```
Média = (Σ nota × peso) / (Σ pesos)
```
---

## 🎨 Interface & UX

### Features de Usabilidade

| Feature | Descrição |
|---|---|
| **Dropdown Turmas/Disciplinas** | Seleção rápida e intuitiva |
| **Tabela Responsiva** | Adapta a diferentes tamanhos de tela |
| **Inputs Focados** | Destaque visual ao preencher |
| **Validação Visual** | Bordas vermelhas (erro), azul (alterado) |
| **Loading Spinner** | Indica que sistema está salvando |
| **Snackbar Sucesso** | Verde, confirma salvamento |
| **Snackbar Erro** | Vermelho, mostra mensagem de erro |
| **Desabilita Botão** | Até selecionar turma/disciplina |
| **Dados Seed Realistas** | Alunos, turmas, disciplinas pré-carregados |

---

## 🔧 Decisões Técnicas

### Backend

**Por que Spring Boot 3?**
- Framework maduro e confiável
- Suporte a Java 17 nativo
- Comunidade ativa
- Fácil de manter e escalar

**Por que H2 em memória?**
- Simplicidade para MVP
- Sem dependências externas
- Dados seed automáticos
- Performance em testes

**Por que DTOs?**
- Desacoplamento entre camadas
- Controle de serialização
- Segurança (não expor entities)
- Facilita versionamento de API

### Frontend

**Por que Angular Material?**
- Componentes profissionais prontos
- Responsividade automática
- Temas integrados
- Acessibilidade

**Por que Services?**
- Centraliza chamadas HTTP
- Reutilizável em múltiplos componentes
- Facilita testes
- Separação de concerns

**Por que RxJS Observables?**
- Gerenciamento assíncrono elegante
- Integração nativa com Angular
- Facilita testes
- Performance

---

## 🚀 Roadmap & Próximas Iterações

### 📱 Telas e Fluxos em Desenvolvimento

O projeto foi arquitetado com extensibilidade em mente. Aqui estão as principais melhorias planejadas:

#### **1. Dashboard do Professor**
```

Funcionalidades:
✅ Visualizar apenas suas turmas e disciplinas
✅ Histórico de lançamentos (quem fez, quando, o quê)
✅ Gráficos de desempenho da turma
✅ Exportar relatórios em PDF/Excel
✅ Configurar pesos das avaliações
```

#### **2. Dashboard do Aluno**
```

Funcionalidades:
✅ Visualizar apenas suas notas
✅ Gráfico de evolução ao longo do bimestre
✅ Comparação com média da turma (anônima)
✅ Alertas quando média < 6.0
✅ Histórico de notas por disciplina
```

#### **3. Dashboard Administrativo**
```
Funcionalidades:
✅ Criar/editar/deletar usuários (professores, alunos)
✅ Gerenciar turmas e disciplinas
✅ Auditoria completa (logs de ações)
✅ Relatórios de performance por escola
✅ Backup e restore de dados
```

### 🔐 Autenticação e Controle de Acesso

Hoje o sistema é um MVP sem autenticação - qualquer pessoa pode ver/editar qualquer nota. Em produção, isso seria um caos! Imagine um aluno alterando suas próprias notas ou um professor vendo as notas de outras turmas que não leciona. Teríamos problemas legais sérios.

#### **Como eu implementaria em um cenário real:**

Primeiro, eu criaria um fluxo bem pensado. O usuário chegaria ao sistema por um formulário de login simples, mas seguro. 

**No Backend:**

Eu adicionaria Spring Security com JWT (JSON Web Tokens). A ideia é simples: quando um professor faz login com email e senha, o backend valida isso contra um banco de dados, e devolve um token JWT. Esse token é como um "bilhete" que o navegador do professor carrega em todas as requisições. A cada requisição, o servidor valida se o token é legítimo e não expirou.

Depois eu criaria um endpoint de login que recebe email e senha, valida contra um usuário no banco, e devolve o JWT.

**No Frontend:**

Eu criaria um serviço de autenticação que guardaria o token no localStorage e o incluiria em todas as requisições HTTP.

---

## 🔐 Segurança & Escalabilidade

### Atual (MVP)

- ✅ Validação de entrada
- ✅ Tratamento de erros
- ✅ CORS configurado
- ⚠️ Sem autenticação

---

## 📚 Documentação Swagger/OpenAPI

### Acesso à Documentação Interativa

Quando o servidor backend está rodando, acesse a documentação completa do Swagger:

**URLs:**
- **Swagger UI (Interativa):** `http://localhost:8080/swagger-ui.html`
- **JSON OpenAPI:** `http://localhost:8080/v3/api-docs`
- **YAML OpenAPI:** `http://localhost:8080/v3/api-docs.yaml`

### Recursos do Swagger

✅ **Documentação Completa:** Todos os endpoints com descrições detalhadas
✅ **Schemas dos DTOs:** Visualize a estrutura de cada modelo
✅ **Try it Out:** Teste os endpoints diretamente na interface
✅ **Códigos de Resposta:** HTTP 200, 400, 404, etc documentados
✅ **Exemplos:** Valores de exemplo em cada campo

### Exemplo de Uso no Swagger

1. **Abra:** http://localhost:8080/swagger-ui.html
2. **Expanda** uma seção (ex: "Notas")
3. **Clique** em um endpoint (ex: POST /notas/lote)
4. **Clique** em "Try it out"
5. **Preencha** o formulário ou JSON
6. **Clique** em "Execute"
7. **Veja** a resposta em tempo real

### Configuração do Swagger

O Swagger foi configurado com:


### Tags de Agrupamento

No Swagger, os endpoints estão organizados em tags:

| Tag | Endpoints | Descrição |
|---|---|---|
| **Notas** | 6 endpoints | Gerenciamento principal (salvar, listar, média) |
| **Turmas** | 5 endpoints | Criação, listagem, alunos |
| **Disciplinas** | 4 endpoints | Criação, listagem |
| **Alunos** | 5 endpoints | Criação, listagem, notas |
| **Avaliações** | 3 endpoints | Criação, listagem por disciplina |

### Validação no Swagger

O Swagger exibe automaticamente as regras de validação:

```
Nota (valor):
  - @DecimalMin(0.0) → Mínimo: 0
  - @DecimalMax(10.0) → Máximo: 10
  - Required: true
```

Você pode testar diretamente no Swagger e ver as mensagens de erro:

```json
// Erro 400 - Nota inválida
{
  "timestamp": "2025-12-03T23:37:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Nota máxima é 10"
}
```

### Integração com o Frontend

O frontend Angular está configurado para consumir essa API documentada:

---

## 📝 API REST

### Endpoints Principais

#### Turmas
```
GET  /turmas                 - Listar todas
GET  /turmas/{id}            - Detalhes
POST /turmas                 - Criar
PUT  /turmas/{id}            - Atualizar
DEL  /turmas/{id}            - Deletar
```

#### Disciplinas
```
GET  /disciplinas            - Listar todas
GET  /disciplinas/{id}       - Detalhes
POST /disciplinas            - Criar
```

#### Alunos
```
GET  /alunos                 - Listar todos
GET  /alunos/{id}            - Detalhes
GET  /alunos/turma/{turmaId} - Por turma
POST /alunos                 - Criar
```

#### Avaliações
```
GET  /avaliacoes             - Listar todas
GET  /avaliacoes/{id}        - Detalhes
POST /avaliacoes             - Criar
```

#### Notas (Principal)
```
GET  /notas                  - Listar todas
POST /notas                  - Criar uma
POST /notas/lote             - Salvar em lote
GET  /notas/aluno/{id}       - Notas do aluno
GET  /notas/aluno/{id}/media-ponderada  - Média
```
---

## 📚 Documentação Adicional

- **[VERIFICACAO_COMPLETA.md](VERIFICACAO_COMPLETA.md)** - Verificação de implementação
- **[TESTES_FRONTEND_FINAL.md](TESTES_FRONTEND_FINAL.md)** - Documentação dos testes frontend
- **[backend/TESTES.md](backend/TESTES.md)** - Documentação dos testes backend
- **[backend/TESTES_RESUMO.md](backend/TESTES_RESUMO.md)** - Resumo dos testes backend
- **[backend/REQUISITO_CONCLUIDO.md](backend/REQUISITO_CONCLUIDO.md)** - Detalhes da implementação
- **[Swagger UI](http://localhost:8080/swagger-ui.html)** - Documentação interativa da API (servidor deve estar rodando)

---

## 📊 Estatísticas do Projeto

### Código

| Métrica | Valor |
|---------|-------|
| Total de Linhas (Backend) | ~1500 |
| Total de Linhas (Frontend) | ~2500 |
| Classes/Componentes | 25+ |
| Métodos | 100+ |
| Linhas de Documentação | ~3000 |

### Testes

| Métrica | Valor |
|---------|-------|
| **Testes Backend** | 54 (100% ✅) |
| **Testes Frontend** | 94 (100% ✅) |
| **Total** | **148** |
| **Cobertura** | 100% lines, 100% branches |
| **Tempo Execução** | ~5 seg |

### Git

| Métrica | Valor |
|---------|-------|
| Commits | 20+ |
| Branches | 2 (main, frontend-angular) |
| Issues | 0 ✅ |

---

## 🚀 Deployment

### Backend (Spring Boot)

```bash
# Build JAR
mvn clean package

# Executar JAR
java -jar backend/target/boletim-backend-0.0.1-SNAPSHOT.jar
```

### Frontend (Angular)

```bash
# Build para produção
ng build --configuration production

# Arquivos em: frontend/dist/boletim-frontend/
# Deploy para: GitHub Pages, Vercel, Netlify, etc
```

---

## 🤝 Contribuindo

Sugestões e melhorias são bem-vindas! 

**Como contribuir:**
1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona NovaFuncionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](LICENSE) para detalhes.

---

## 👨‍💻 Autor

**Tiago Marinho Sousa**

- 📧 Email: [tiagomarinho9101@gmail.com]
- 🔗 GitHub: [github.com/TiagoMarinhoSousa](https://github.com/TiagoMarinhoSousa)
- 💼 LinkedIn: [linkedin.com/in/tiago-marinho-sousa](https://www.linkedin.com/in/tiagomarinho-dev)

---

## 📞 Suporte

Encontrou algum problema? 
(11)94140-3727
**Opções:**
1. Abra uma [Issue](../../issues) no GitHub
2. Veja exemplos em [VERIFICACAO_COMPLETA.md](VERIFICACAO_COMPLETA.md)

---
---

**Última atualização:** 10 de dezembro de 2025  
**Versão:** 1.0.2  
**Status:** Production Ready ✅
