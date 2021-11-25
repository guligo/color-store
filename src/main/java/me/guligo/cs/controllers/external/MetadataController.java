package me.guligo.cs.controllers.external;

import lombok.extern.slf4j.Slf4j;
import me.guligo.cs.dtos.external.MetadataDto;
import me.guligo.cs.services.external.MetadataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class MetadataController {

    private MetadataService metadataService;

    @Autowired
    public MetadataController(final MetadataService metadataService) {
        this.metadataService = metadataService;
    }

    @CrossOrigin(origins = {
            "http://localhost:3000",
            "http://192.168.178.20:3000"
    })
    @GetMapping("/meta/{tokenId}")
    public MetadataDto getMetadata(@PathVariable final int tokenId) {
        log.info("Metadata request for token ID {}", tokenId);
        return metadataService.getMetadata(tokenId);
    }

}
