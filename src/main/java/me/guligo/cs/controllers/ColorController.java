package me.guligo.cs.controllers;

import java.util.Arrays;
import java.util.List;
import me.guligo.cs.dtos.ColorDto;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ColorController {

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/colors")
    public List<ColorDto> getColors() {
        return Arrays.asList(
                ColorDto.builder()
                        .id("1")
                        .name("Mimosa")
                        .rgb("#f0c05a")
                        .build(),
                ColorDto.builder()
                        .id("2")
                        .name("Greenery")
                        .rgb("#88b04b")
                        .build());
    }

    @GetMapping("/colors/{colorId}")
    public ColorDto getColor(@PathVariable final String colorId) {
        if ("1".equals(colorId)) {
            return ColorDto.builder()
                    .id("1")
                    .name("Mimosa")
                    .rgb("#f0c05a")
                    .build();
        }
        return null;
    }

}
