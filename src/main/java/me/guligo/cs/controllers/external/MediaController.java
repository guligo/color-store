package me.guligo.cs.controllers.external;

import java.awt.image.RenderedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import javax.imageio.ImageIO;
import me.guligo.cs.services.external.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.server.ResponseStatusException;

@Controller
public class MediaController {

    private String DEFAULT_IMAGE = "/color-pencils.jpeg";

    private MediaService mediaService;

    @Autowired
    public MediaController(final MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @CrossOrigin(origins = {
            "http://localhost:3000",
            "http://192.168.178.20:3000"
    })
    @ResponseBody
    @GetMapping(value = "/images/{tokenId}.png", produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] getImage(@PathVariable final int tokenId) throws IOException {
        final Optional<RenderedImage> image = mediaService.createImage(tokenId);
        if (image.isPresent()) {
            final ByteArrayOutputStream os = new ByteArrayOutputStream();
            ImageIO.write(image.get(), MediaType.IMAGE_PNG.getSubtype(), os);
            return os.toByteArray();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

}
