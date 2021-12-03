package me.guligo.cs.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ConfigDto {

    @lombok.NonNull
    private final String colorCoinContractAddress;

    @lombok.NonNull
    private final String colorStoreContractAddress;

}
