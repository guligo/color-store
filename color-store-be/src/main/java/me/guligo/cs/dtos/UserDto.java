package me.guligo.cs.dtos;

import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    @lombok.NonNull
    @NotNull
    private String id;

    @Length(max = 25)
    private String alias;

}
