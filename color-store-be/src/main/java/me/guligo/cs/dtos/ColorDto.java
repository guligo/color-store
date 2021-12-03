package me.guligo.cs.dtos;

import lombok.Builder;
import lombok.Data;
import me.guligo.cs.dtos.external.MetadataDto;

@Data
@Builder
public class ColorDto {

    @lombok.NonNull
    private MetadataDto metadata;

    @lombok.NonNull
    private int tokenId;

    @lombok.NonNull
    private UserDto owner;

    @Override
    public int hashCode() {
        return tokenId;
    }

}
