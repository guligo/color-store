package me.guligo.cs.controllers;

import me.guligo.cs.dtos.MetadataDto;
import me.guligo.cs.services.MetadataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MetadataController {

    private MetadataService metadataService;

    @Autowired
    public MetadataController(final MetadataService metadataService) {
        this.metadataService = metadataService;
    }

    @GetMapping("/meta/{tokenId}")
    public MetadataDto getMetadata(@PathVariable final int tokenId) {
        return metadataService.getMetadata(tokenId);
    }

}
