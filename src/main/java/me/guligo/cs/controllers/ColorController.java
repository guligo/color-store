package me.guligo.cs.controllers;

import java.util.Collection;
import me.guligo.cs.dtos.ColorDto;
import me.guligo.cs.services.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ColorController {

    private final ColorService colorService;

    @Autowired
    public ColorController(final ColorService colorService) {
        this.colorService = colorService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/colors")
    public Collection<ColorDto> getColors() {
        return colorService.getColors();
    }

    @GetMapping("/colors/{colorId}")
    public ColorDto getColor(@PathVariable final int colorId) {
        return colorService.getColor(colorId);
    }

}
