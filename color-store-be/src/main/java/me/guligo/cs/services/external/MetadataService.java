package me.guligo.cs.services.external;

import me.guligo.cs.dtos.external.MetadataDto;
import me.guligo.cs.utils.MiscUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MetadataService {

    private String mediaUrl;

    @Autowired
    public MetadataService(@Value("${media.url}") final String mediaUrl) {
        this.mediaUrl = mediaUrl;
    }

    public MetadataDto getMetadata(final int tokenId) {
        final String colorCode = MiscUtil.getColorCode(tokenId);

        return MetadataDto.builder()
                .name("The Color " + colorCode.toUpperCase())
                .description("Proud owner of this color with code " + colorCode.toUpperCase() + " has something truly amazing in his or her hands! (S/N: " + tokenId + ")")
                .image(mediaUrl + tokenId + ".png")
                .build();
    }

}
