package me.guligo.cs.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ColorDto {

    @lombok.NonNull
    private int tokenId;

    @lombok.NonNull
    private UserDto owner;

}
