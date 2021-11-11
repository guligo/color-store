package me.guligo.cs.controllers;

import java.io.IOException;
import org.apache.commons.io.IOUtils;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MediaController {

    private String DEFAULT_IMAGE = "/color-pencils.jpeg";

    @ResponseBody
    @GetMapping(value = "/images/{tokenId}", produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] getImage(@PathVariable final int tokenId) throws IOException {
        return IOUtils.toByteArray(MediaController.class.getResourceAsStream(DEFAULT_IMAGE));
    }

}
