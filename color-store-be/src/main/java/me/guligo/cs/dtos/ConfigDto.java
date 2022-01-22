package me.guligo.cs.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConfigDto {

    @lombok.NonNull
    private String colorCoinContractAddress;

    @lombok.NonNull
    private String colorStoreContractAddress;

}
