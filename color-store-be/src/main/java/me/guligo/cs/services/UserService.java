package me.guligo.cs.services;

import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import me.guligo.cs.dtos.UserDto;
import me.guligo.cs.entities.User;
import me.guligo.cs.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class UserService {

    private static final String COLOR_STORE_ALIAS = "Color Store";

    private final UserRepo userRepo;

    @Autowired
    public UserService(@Value("${blockchain.contracts.color-store.address}") final String colorStoreContractAddress,
                       final UserRepo userRepo) {
        this.userRepo = userRepo;
        updateUser(colorStoreContractAddress, UserDto
                .builder()
                .id(colorStoreContractAddress)
                .alias(COLOR_STORE_ALIAS)
                .build());
    }

    public UserDto getUser(final String userId) {
        return Optional.ofNullable(userId)
                .flatMap(userRepo::findById)
                .map(user -> {
                    log.info("Retrieving user {}", user);
                    return UserDto.builder()
                            .id(user.getId())
                            .alias(user.getAlias())
                            .build();
                })
                .orElse(UserDto.builder()
                        .id(userId)
                        .build());
    }

    public void updateUser(final String userId, final UserDto userDto) {
        final User user = User.builder()
                .id(userId.toLowerCase())
                .alias(userDto.getAlias())
                .build();
        log.info("Updating user {}", user);
        userRepo.save(user);
    }

}
