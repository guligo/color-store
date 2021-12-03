package me.guligo.cs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAutoConfiguration
public class MainApp {

    public static void main(final String[] args) {
        SpringApplication.run(MainApp.class, args);
    }

}
