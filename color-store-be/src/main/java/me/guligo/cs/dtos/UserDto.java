package me.guligo.cs.dtos;

import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
@Builder
public class UserDto {

    @lombok.NonNull
    @NotNull
    private String id;

    @Length(max = 25)
    private String alias;

}
