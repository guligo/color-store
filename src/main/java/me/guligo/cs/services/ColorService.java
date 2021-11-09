package me.guligo.cs.services;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import me.guligo.cs.dtos.ColorDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthGetTransactionCount;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.core.methods.response.Web3ClientVersion;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.Transfer;
import org.web3j.utils.Convert;

@Component
public class ColorService {

    private final Map<String, ColorDto> colors;

    @Autowired
    public ColorService(final UserService userService) {
        colors = new HashMap<>();
        colors.put("1", ColorDto.builder()
                .id("1")
                .name("Mimosa")
                .rgb("#f0c05a")
                .owner(userService.getUser("1"))
                .build());
        colors.put("2", ColorDto.builder()
                .id("2")
                .name("Greenery")
                .rgb("#88b04b")
                .owner(userService.getUser("1"))
                .build());
        colors.put("3", ColorDto.builder()
                .id("3")
                .name("Tangerine Tango")
                .rgb("#dd4124")
                .owner(userService.getUser("2"))
                .build());
    }

    public Collection<ColorDto> getColors() {
        try {
            final Web3j web3 = Web3j.build(new HttpService("http://127.0.0.1:8545"));
            final Web3ClientVersion web3ClientVersion = web3.web3ClientVersion().send();
            final String clientVersion = web3ClientVersion.getWeb3ClientVersion();
            System.out.println(clientVersion);

            final EthGetTransactionCount ethGetTransactionCount = web3.ethGetTransactionCount("0xb412a3935B6a8fd37824DbB6D01B677cc3854080", DefaultBlockParameterName.LATEST).send();
            System.out.println(ethGetTransactionCount.getTransactionCount());

            final Credentials credentials = Credentials.create("fa633c1dc028945639aefc81172cd2061dc6a28b90f3fa7b9091b59585909b20");
            final TransactionReceipt transactionReceipt = Transfer.sendFunds(
                    web3, credentials, "0xeF9cBff74240AF0b4457DD917b610AFb7A9d2A63",
                    BigDecimal.valueOf(1.0), Convert.Unit.ETHER)
                    .send();
            System.out.println(transactionReceipt.getBlockNumber());
        } catch (final Exception exc) {
            exc.printStackTrace();
        }

        return colors.values();
    }

    public ColorDto getColor(final String colorId) {
        return colors.get(colorId);
    }

}
