package me.guligo.cs.utils;

import java.util.Arrays;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;

public final class BlockchainUtil {

    public final static Event TRANSFER_EVENT = new Event("Transfer",
            Arrays.asList(new TypeReference<Address>() {
            }, new TypeReference<Address>() {
            }, new TypeReference<Uint256>() {
            }));

    public final static java.util.function.Function<Uint256, Function> GET_TOKEN_URI_FUNCTION = tokenId ->
            new Function("tokenURI", Arrays.asList(tokenId), Arrays.asList(new TypeReference<Utf8String>() {
            }));

    private BlockchainUtil() {
        // empty
    }

}
