package me.guligo.cs.dtos.external;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MetadataDto {

    @lombok.NonNull
    private String name;

    @lombok.NonNull
    private String description;

    @lombok.NonNull
    private String image;

}
