package me.guligo.cs.services.external;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import me.guligo.cs.services.ColorService;
import me.guligo.cs.utils.MiscUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class MediaService {

    private ColorService colorService;

    @Autowired
    public MediaService(final ColorService colorService) {
        this.colorService = colorService;
    }

    public Optional<RenderedImage> createImage(final int tokenId) {
        return Optional
                .of(colorService.getColor(tokenId))
                .map(color -> {
                    final BufferedImage image = new BufferedImage(600, 800, BufferedImage.TYPE_INT_RGB);
                    final Graphics2D graph = (Graphics2D) image.getGraphics();
                    graph.setColor(new Color(tokenId));
                    graph.fillRect(0, 0, 600, 800);
                    graph.setColor(Color.WHITE);
                    graph.fillRect(0, 600, 600, 800);
                    graph.setColor(Color.BLACK);
                    graph.setFont(new Font("Courier New", Font.PLAIN, 45));
                    graph.drawString(MiscUtil.getColorCode(tokenId).toUpperCase(), 200, 710);
                    graph.dispose();
                    return image;
                });
    }

}
