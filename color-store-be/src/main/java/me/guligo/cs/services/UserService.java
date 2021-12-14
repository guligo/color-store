package me.guligo.cs.services;

import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import me.guligo.cs.dtos.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class UserService {

    private static final String COLOR_STORE_ALIAS = "Color Store";

    private final Map<String, UserDto> users;

    @Autowired
    public UserService(@Value("${blockchain.contracts.color-store.address}") final String colorStoreContractAddress) {
        users = new HashMap<>();
        users.put(colorStoreContractAddress.toLowerCase(), UserDto.builder()
                .id(colorStoreContractAddress)
                .alias(COLOR_STORE_ALIAS)
                .build());
    }

    public UserDto getUser(final String userId) {
        log.info("Retrieving user with ID {}", userId);
        return users.getOrDefault(userId.toLowerCase(), UserDto.builder().id(userId).build());
    }

    public void updateUser(final String userId, final UserDto user) {
        log.info("Updating user with ID {}", userId);
        users.put(userId.toLowerCase(), user);
    }

}
