package me.guligo.cs.controllers;

import java.util.Collection;
import me.guligo.cs.dtos.ColorDto;
import me.guligo.cs.services.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class ColorController {

    private final ColorService colorService;

    @Autowired
    public ColorController(final ColorService colorService) {
        this.colorService = colorService;
    }

    @GetMapping("/colors")
    public Collection<ColorDto> getColors() {
        return colorService.getColors();
    }

    @GetMapping("/colors/{colorId}")
    public ColorDto getColor(@PathVariable final int colorId) {
        final ColorDto color = colorService.getColor(colorId);
        if (color == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return color;
    }

}
