package me.guligo.cs.services;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import me.guligo.cs.dtos.ColorDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ColorService {

    private final Map<Integer, ColorDto> colors;

    private final UserService userService;

    @Autowired
    public ColorService(final UserService userService) {
        this.colors = new HashMap<>();
        this.userService = userService;
    }

    public void addColor(final int tokenId, final String owner) {
        final ColorDto color = ColorDto.builder()
                .tokenId(tokenId)
                .owner(userService.getUser(owner))
                .build();

        colors.put(tokenId, color);
    }

    public Collection<ColorDto> getColors() {
        return colors.values();
    }

    public ColorDto getColor(final int colorId) {
        return colors.get(colorId);
    }

}
