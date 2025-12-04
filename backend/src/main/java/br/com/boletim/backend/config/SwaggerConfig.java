package br.com.boletim.backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

/**
 * Configuração do Swagger/OpenAPI para documentação automática da API.
 * 
 * Acesso:
 * - Swagger UI: http://localhost:8080/swagger-ui.html
 * - JSON OpenAPI: http://localhost:8080/v3/api-docs
 * - YAML OpenAPI: http://localhost:8080/v3/api-docs.yaml
 */
@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "Boletim do Aluno - API",
        version = "1.0.0",
        description = "API REST para gerenciamento de lançamento de notas de alunos com cálculo automático de média ponderada.",
        contact = @Contact(
            name = "Tiago Marinho Sousa",
            url = "https://github.com/TiagoMarinhoSousa",
            email = "tiago@example.com"
        ),
        license = @License(
            name = "MIT",
            url = "https://opensource.org/licenses/MIT"
        )
    ),
    servers = {
        @Server(
            url = "http://localhost:8080",
            description = "Servidor Local"
        ),
        @Server(
            // url = "https://api.boletim.com",
            // description = "Servidor Produção"
        )
    }
)
@SecurityScheme(
    name = "Bearer Authentication",
    type = SecuritySchemeType.HTTP,
    scheme = "bearer",
    bearerFormat = "JWT",
    description = "Autenticação JWT (futuro)",
    in = SecuritySchemeIn.HEADER
)
public class SwaggerConfig {
    // Configuração vazia - as anotações @OpenAPIDefinition e @SecurityScheme
    // são suficientes para gerar a documentação OpenAPI completa.
}
