package me.guligo.cs.dtos.external;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MetadataDto {

    @lombok.NonNull
    private String name;

    @lombok.NonNull
    private String description;

    @lombok.NonNull
    private String image;

}
