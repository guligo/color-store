package me.guligo.cs.services;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import me.guligo.cs.dtos.ColorDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ColorService {

    private final Map<String, ColorDto> colors;

    @Autowired
    public ColorService(final UserService userService) {
        colors = new HashMap<>();
        colors.put("1", ColorDto.builder()
                .id("1")
                .name("Mimosa")
                .rgb("#f0c05a")
                .owner(userService.getUser("1"))
                .build());
        colors.put("2", ColorDto.builder()
                .id("2")
                .name("Greenery")
                .rgb("#88b04b")
                .owner(userService.getUser("1"))
                .build());
        colors.put("3", ColorDto.builder()
                .id("3")
                .name("Tangerine Tango")
                .rgb("#dd4124")
                .owner(userService.getUser("2"))
                .build());
    }

    public Collection<ColorDto> getColors() {
        return colors.values();
    }

    public ColorDto getColor(final String colorId) {
        return colors.get(colorId);
    }

}
