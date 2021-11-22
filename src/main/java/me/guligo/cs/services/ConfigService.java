package me.guligo.cs.services;

import me.guligo.cs.dtos.ConfigDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ConfigService {

    private final String colorCoinContractAddress;

    private final String colorStoreContractAddress;

    public ConfigService(
            @Value("${blockchain.contracts.color-coin.address}") final String colorCoinContractAddress,
            @Value("${blockchain.contracts.color-store.address}") final String colorStoreContractAddress) {
        this.colorCoinContractAddress = colorCoinContractAddress;
        this.colorStoreContractAddress = colorStoreContractAddress;
    }

    public ConfigDto getConfig() {
        return ConfigDto.builder()
                .colorCoinContractAddress(colorCoinContractAddress)
                .colorStoreContractAddress(colorStoreContractAddress)
                .build();
    }

}
