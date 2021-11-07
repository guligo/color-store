package me.guligo.cs.services;

import java.util.HashMap;
import java.util.Map;
import me.guligo.cs.dtos.UserDto;
import org.springframework.stereotype.Component;

@Component
public class UserService {

    private final Map<String, UserDto> users;

    public UserService() {
        users = new HashMap<>();
        users.put("1", UserDto.builder()
                .id("1")
                .alias("TheCryptoKnight")
                .build());
        users.put("2", UserDto.builder()
                .id("0x2336626b66449798d8041e26a3da5f1197e26c8c")
                .build());
    }

    public UserDto getUser(final String userId) {
        return users.get(userId);
    }

}
