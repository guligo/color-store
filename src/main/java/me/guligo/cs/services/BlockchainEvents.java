package me.guligo.cs.services;

import java.util.Arrays;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.generated.Uint256;

public final class BlockchainEvents {

    public final static Event TRANSFER_EVENT = new Event("Transfer",
            Arrays.asList(new TypeReference<Address>() {}, new TypeReference<Address>() {}, new TypeReference<Uint256>() {}));

    private BlockchainEvents() {
        // empty
    }

}
