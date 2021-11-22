package me.guligo.cs.services;

import javax.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import me.guligo.cs.utils.BlockchainUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.http.HttpService;

@Slf4j
@Component
public class BlockchainService {

    private final String nodeAddress;

    private ConfigService configService;

    private ColorService colorService;

    @Autowired
    public BlockchainService(
            @Value("${blockchain.node.address}") final String nodeAddress,
            final ConfigService configService,
            final ColorService colorService) {
        this.nodeAddress = nodeAddress;
        this.configService = configService;
        this.colorService = colorService;
    }

    @PostConstruct
    public void connect() {
        final EthFilter filter = new EthFilter(DefaultBlockParameterName.EARLIEST, DefaultBlockParameterName.LATEST, configService.getConfig().getColorCoinContractAddress())
                .addSingleTopic(EventEncoder.encode(BlockchainUtil.TRANSFER_EVENT));

        final Web3j web3 = Web3j.build(new HttpService(nodeAddress));
        web3.ethLogFlowable(filter).subscribe(event -> {
            final Uint256 tokenId = getTokenId(event);
            final Address toAddress = getToAddress(event);

            log.info("Received token {} transfer event to address {}", tokenId.getValue().intValue(), toAddress.getValue());
            colorService.addColor(tokenId.getValue().intValue(), toAddress.getValue());
        });
    }

    private Address getToAddress(final Log event) {
        return (Address) FunctionReturnDecoder.decodeIndexedValue(
                event.getTopics().get(2), BlockchainUtil.TRANSFER_EVENT.getParameters().get(1));
    }

    private Uint256 getTokenId(final Log event) {
        return (Uint256) FunctionReturnDecoder.decodeIndexedValue(
                event.getTopics().get(3), BlockchainUtil.TRANSFER_EVENT.getParameters().get(2));
    }

}
