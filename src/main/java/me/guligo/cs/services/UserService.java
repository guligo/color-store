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
        users.put("0xef9cbff74240af0b4457dd917b610afb7a9d2a63", UserDto.builder()
                .id("0xef9cbff74240af0b4457dd917b610afb7a9d2a63")
                .alias("TheCryptoKnight")
                .build());
    }

    public UserDto getUser(final String userId) {
        return users.getOrDefault(userId, UserDto.builder().id(userId).build());
    }

}
