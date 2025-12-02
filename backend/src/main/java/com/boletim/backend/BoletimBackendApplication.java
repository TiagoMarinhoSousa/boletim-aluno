package com.boletim.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "br.com.boletim.backend.domain")
@EnableJpaRepositories(basePackages = "br.com.boletim.backend.repository")
public class BoletimBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BoletimBackendApplication.class, args);
    }
}