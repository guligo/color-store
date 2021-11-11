package me.guligo.cs.services;

import java.io.IOException;
import javax.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import me.guligo.cs.utils.BlockchainUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthCall;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.http.HttpService;

@Slf4j
@Component
public class BlockchainService {

    private final static String FROM_ADDRESS_OF_MINTED_TOKENS = "0x0000000000000000000000000000000000000000";

    private final String nodeAddress;

    private final String colorCoinContractAddress;

    private ColorService colorService;

    @Autowired
    public BlockchainService(
            @Value("${blockchain.node.address}") final String nodeAddress,
            @Value("${blockchain.contracts.color-coin.address}") final String colorCoinContractAddress,
            final ColorService colorService) {
        this.nodeAddress = nodeAddress;
        this.colorCoinContractAddress = colorCoinContractAddress;
        this.colorService = colorService;
    }

    @PostConstruct
    public void connect() {
        final EthFilter filter = new EthFilter(DefaultBlockParameterName.EARLIEST, DefaultBlockParameterName.LATEST, colorCoinContractAddress)
                .addSingleTopic(EventEncoder.encode(BlockchainUtil.TRANSFER_EVENT));

        final Web3j web3 = Web3j.build(new HttpService(nodeAddress));
        web3.ethLogFlowable(filter).subscribe(event -> {
            final Address fromAddress = getFromAddress(event);
            if (FROM_ADDRESS_OF_MINTED_TOKENS.equals(fromAddress.getValue())) {
                final Uint256 tokenId = getTokenId(event);

                log.info(getTokenUri(web3, tokenId));
                colorService.addColor(tokenId.getValue().intValue(), getToAddress(event).getValue());
            }
        });
    }

    private String getTokenUri(final Web3j web3, final Uint256 tokenId) throws IOException {
        final Transaction tx = Transaction.createEthCallTransaction(colorCoinContractAddress, colorCoinContractAddress, FunctionEncoder.encode(BlockchainUtil.GET_TOKEN_URI_FUNCTION.apply(tokenId)));
        final EthCall call = web3.ethCall(tx, DefaultBlockParameterName.LATEST).send();
        return FunctionReturnDecoder.decode(call.getValue(), BlockchainUtil.GET_TOKEN_URI_FUNCTION.apply(tokenId).getOutputParameters()).get(0).toString();
    }

    private Address getFromAddress(final Log event) {
        return (Address) FunctionReturnDecoder.decodeIndexedValue(
                event.getTopics().get(1), BlockchainUtil.TRANSFER_EVENT.getParameters().get(0));
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
