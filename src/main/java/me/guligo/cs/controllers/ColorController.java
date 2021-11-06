package me.guligo.cs.controllers;

import java.util.Arrays;
import java.util.List;
import me.guligo.cs.dtos.ColorDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ColorController {

    @GetMapping("/colors")
    public List<ColorDto> getColors() {
        return Arrays.asList(
                ColorDto.builder()
                        .id("1")
                        .name("Mimosa")
                        .rgb("#f0c05a")
                        .build());
    }

    @GetMapping("/colors/{colorId}")
    public ColorDto getColor(@PathVariable final String colorId) {
        return ColorDto.builder()
                .id("3")
                .name("Mimosa")
                .rgb("#f0c05a")
                .build();
    }

}
