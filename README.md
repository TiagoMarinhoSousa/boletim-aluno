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
│   ├── src/test/java/          # Testes unitários (63 testes)
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
│   ├── src/test/               # Testes (35 testes)
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

### 🎁 Diferenciais Implementados

| Recurso | Status | Detalhes |
|---|---|---|
| **98 Testes Automatizados** | ✅ | 63 backend + 35 frontend |
| **Validação Dupla Camada** | ✅ | Frontend + Backend |
| **Feedback Visual** | ✅ | Snackbars, spinner, highlighting |
| **Tratamento de Erros** | ✅ | Mensagens claras em português |
| **Arquitetura Modular** | ✅ | Separação clara de responsabilidades |

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

### Backend (63 testes - 100% passando)

```bash
# Executar todos os testes
mvn clean test

# Testes específicos
mvn test -Dtest=NotaServiceUnitTest
mvn test -Dtest=AlunoServiceTest
mvn test -Dtest=NotaServiceTest
```

**Cobertura:**
- ✅ Validação de entrada (10 testes)
- ✅ Cálculo de média ponderada (9 testes)
- ✅ Validação de aluno (6 testes)
- ✅ Operações em lote (3 testes)
- ✅ + outros (35 testes)

Documentação completa: [TESTES.md](backend/TESTES.md)

### Frontend (35 testes - 100% passando)

```bash
# Executar testes
npm test -- --watch=false --browsers=ChromeHeadless

# Com watch mode
npm test
```

**Cobertura:**
- ✅ NotaComponent (17 testes)
- ✅ Services (13 testes)
- ✅ AppComponent (3 testes)
- ✅ Outros componentes (2 testes)

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

**Exemplo de fluxo:**
```
POST /notas/lote
    ↓
NotaController.salvarEmLote()
    ↓
NotaService.salvarEmLote()
    - Pré-valida TODAS as notas
    - Se alguma inválida → erro 400
    - Se todas válidas → salva todas
    ↓
NotaRepository.save()
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
<input type="number" min="0" max="10" (change)="atualizarNota($event)">

// 2. Validação em TypeScript
atualizarNota(alunoId, avaliacaoId, valor) {
    if (valor < 0 || valor > 10) {
        alert('Nota deve estar entre 0 e 10');
        return;
    }
    // Adiciona à lista para salvar
}

// 3. Pré-validação antes de enviar
salvarNotas() {
    if (this.inputsInvalidos.size > 0) {
        alert('Existem campos com validação pendente');
        return;
    }
    // Envia para backend
}
```

#### Backend
```java
// 1. Pré-validação em lote
notasDTO.forEach(nota -> {
    if (nota.getValor() < 0 || nota.getValor() > 10) {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST,
            "Nota deve estar entre 0 e 10"
        );
    }
});

// 2. Validação individual
if (nota.getValor() < 0 || nota.getValor() > 10) {
    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ...);
}

// 3. Persistência com integridade
notaRepository.save(nota);
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

### Exemplo Prático

```
Avaliações:
- Prova:     peso 5,  nota 8.0  →  40
- Trabalho:  peso 2,  nota 6.0  →  12
- Atividade: peso 1,  nota 9.0  →  9

Cálculo: (40 + 12 + 9) / (5 + 2 + 1) = 61 / 8 = 7.625 → 7.6
```

**Resultado:** 7.6 (com 1 casa decimal)

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

## 🔐 Segurança & Escalabilidade

### Atual (MVP)

- ✅ Validação de entrada
- ✅ Tratamento de erros
- ✅ CORS configurado
- ⚠️ Sem autenticação

### Próximas Iterações (Futuro)

**Autenticação & Autorização:**
```java
// Backend: Adicionar Spring Security
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    // JWT/OAuth2
    // Roles: ADMIN, PROFESSOR, ALUNO
}

// Frontend: HttpInterceptor para token
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req, next) {
        req = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(req);
    }
}
```

**Auditoria:**
```java
// Adicionar campos em Nota
private LocalDateTime dataCriacao;
private LocalDateTime dataAtualizacao;
private String criadoPor;
private String atualizadoPor;
```

**Controle de Acesso:**
- Professores só podem editar suas disciplinas
- Alunos podem visualizar apenas suas notas
- Administrador controla tudo

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

**Exemplo POST /notas/lote:**
```json
[
  { "alunoId": 1, "avaliacaoId": 1, "valor": 8.5 },
  { "alunoId": 1, "avaliacaoId": 2, "valor": 7.0 },
  { "alunoId": 1, "avaliacaoId": 3, "valor": 9.0 }
]
```

---

## 📚 Documentação Adicional

- **[VERIFICACAO_COMPLETA.md](VERIFICACAO_COMPLETA.md)** - Verificação de implementação
- **[TESTES_FRONTEND_FINAL.md](TESTES_FRONTEND_FINAL.md)** - Documentação dos testes frontend
- **[backend/TESTES.md](backend/TESTES.md)** - Documentação dos testes backend
- **[backend/TESTES_RESUMO.md](backend/TESTES_RESUMO.md)** - Resumo dos testes backend
- **[backend/REQUISITO_CONCLUIDO.md](backend/REQUISITO_CONCLUIDO.md)** - Detalhes da implementação

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
| **Testes Backend** | 63 (100% ✅) |
| **Testes Frontend** | 35 (100% ✅) |
| **Total** | **98** |
| **Cobertura** | ~90% |
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

**Opções:**
1. Abra uma [Issue](../../issues) no GitHub
2. Veja exemplos em [VERIFICACAO_COMPLETA.md](VERIFICACAO_COMPLETA.md)

---

## 🎉 Status do Projeto

```
✅ COMPLETO E FUNCIONAL

Backend:       Spring Boot 3.3.4 com 63 testes ✅
Frontend:      Angular 16+ com 35 testes ✅
Integração:    Perfeita ✅
Documentação:  Completa ✅
Pronto para:   Produção 🚀
```

---

**Última atualização:** 3 de dezembro de 2025  
**Versão:** 1.0.0  
**Status:** Production Ready ✅
