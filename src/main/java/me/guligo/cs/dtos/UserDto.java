package me.guligo.cs.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDto {

    @lombok.NonNull
    private String id;

    private String alias;

}
