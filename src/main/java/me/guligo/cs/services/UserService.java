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
                .id("2")
                .build());
    }

    public UserDto getUser(final String userId) {
        return users.get(userId);
    }

}
