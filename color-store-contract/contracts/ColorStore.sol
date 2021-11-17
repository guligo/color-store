// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ColorCoin.sol";

contract ColorStore {

    ERC721 private _token;

    uint256 private _rateInWei;

    constructor(ERC721 token, uint256 rateInWei) {
        _token = token;
        _rateInWei = rateInWei;
    }

    /**
     * Function to be used by caller in order to buy token from this contract at predefined exchange rate.
     */
    function buyToken(uint _tokenId) external payable {
        uint256 amountInWei = msg.value;
        if (amountInWei >= _rateInWei) {
            _token.transferFrom(address(this), msg.sender, _tokenId);
        }
    }

    /**
     * Function to be used by caller in order to sell token to this contract at predefined exchange rate.
     */
    function sellToken(uint _tokenId) external {
        _token.transferFrom(msg.sender, address(this), _tokenId);
        payable(msg.sender).transfer(_rateInWei);
    }

}
