package me.guligo.cs.controllers;

import me.guligo.cs.dtos.ConfigDto;
import me.guligo.cs.services.ConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ConfigController {

    private final ConfigService configService;

    @Autowired
    public ConfigController(final ConfigService configService) {
        this.configService = configService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/config")
    public ConfigDto getConfig() {
        return configService.getConfig();
    }

}
