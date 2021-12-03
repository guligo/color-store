package me.guligo.cs.services.external;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import me.guligo.cs.dtos.ColorDto;
import me.guligo.cs.services.ColorService;
import me.guligo.cs.utils.MiscUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MediaService {

    private final static Map<ColorDto, BufferedImage> IMAGE_CACHE = new HashMap<>();

    private ColorService colorService;

    @Autowired
    public MediaService(final ColorService colorService) {
        this.colorService = colorService;
    }

    public Optional<RenderedImage> getImage(final int tokenId) {
        return Optional
                .of(colorService.getColor(tokenId))
                .map(color -> IMAGE_CACHE.getOrDefault(color, createImage(color.getTokenId())));
    }

    private BufferedImage createImage(final int tokenId) {
        final BufferedImage image = new BufferedImage(600, 800, BufferedImage.TYPE_INT_RGB);
        final Graphics2D graph = (Graphics2D) image.getGraphics();
        graph.setColor(new Color(tokenId));
        graph.fillRect(0, 0, 600, 800);
        graph.setColor(Color.WHITE);
        graph.fillRect(0, 600, 600, 800);
        graph.setColor(Color.BLACK);
        graph.setFont(new Font("Courier New", Font.PLAIN, 45));
        graph.drawString(MiscUtil.getColorCode(tokenId).toUpperCase(), 200, 710);
        graph.drawRect(0, 0, 599, 799);
        graph.dispose();
        return image;
    }

}
