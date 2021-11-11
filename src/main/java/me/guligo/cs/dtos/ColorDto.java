package me.guligo.cs.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ColorDto {

    @lombok.NonNull
    private MetadataDto metadata;

    @lombok.NonNull
    private String rgb;

    @lombok.NonNull
    private UserDto owner;

}
