package me.guligo.cs.services;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.web3j.abi.EventEncoder;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.http.HttpService;

@Component
public class BlockchainService {

    private final String nodeAddress;

    private final String colorCoinContractAddress;

    @Autowired
    public BlockchainService(
            @Value("${blockchain.node.address}") final String nodeAddress,
            @Value("${blockchain.contracts.color-coin.address}") final String colorCoinContractAddress) {
        this.nodeAddress = nodeAddress;
        this.colorCoinContractAddress = colorCoinContractAddress;
    }

    @PostConstruct
    public void connect() {
        final Web3j web3 = Web3j.build(new HttpService(nodeAddress));
        web3.ethLogFlowable(
                new EthFilter(DefaultBlockParameterName.EARLIEST, DefaultBlockParameterName.LATEST, colorCoinContractAddress)
                        .addSingleTopic(EventEncoder.encode(BlockchainEvents.TRANSFER_EVENT)))
                .subscribe(event -> {
                    System.out.println(event);
                });
    }

    public List<String> getExistingColorCoinTokenIds() {
        return new ArrayList<>();
    }

}
