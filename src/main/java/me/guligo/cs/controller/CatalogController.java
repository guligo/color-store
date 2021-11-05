package me.guligo.cs.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CatalogController {

    @GetMapping("/catalog")
    public String index() {
        return "Hello World!";
    }

}
