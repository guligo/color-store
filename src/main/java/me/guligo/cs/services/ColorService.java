package me.guligo.cs.services;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import me.guligo.cs.dtos.ColorDto;
import me.guligo.cs.utils.MiscUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ColorService {

    private final Map<Integer, ColorDto> colors;

    private final MetadataService metadataService;

    private final UserService userService;

    @Autowired
    public ColorService(final MetadataService metadataService,
                        final UserService userService) {
        this.colors = new HashMap<>();
        this.metadataService = metadataService;
        this.userService = userService;
    }

    public void addColor(final int tokenId, final String owner) {
        final ColorDto color = ColorDto.builder()
                .metadata(metadataService.getMetadata(tokenId))
                .rgb(MiscUtil.getColorCode(tokenId))
                .owner(userService.getUser(owner))
                .build();

        log.info(color.toString());
        colors.put(tokenId, color);
    }

    public Collection<ColorDto> getColors() {
        return colors.values();
    }

    public ColorDto getColor(final String colorId) {
        return colors.get(colorId);
    }

}
