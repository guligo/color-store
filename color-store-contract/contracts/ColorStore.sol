// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ColorCoin.sol";

contract ColorStore {

    ColorCoin private _token;

    uint256 private _rateInWei;

    constructor(ColorCoin token, uint256 rateInWei) {
        _token = token;
        _rateInWei = rateInWei;
    }

    /**
     * Function to be used by caller in order to buy token from this contract at predefined exchange rate.
     */
    function buyToken(uint tokenId) external payable {
        _buyToken(tokenId);
    }

    /**
     * Function to be used by caller in order to sell token to this contract at predefined exchange rate.
     */
    function sellToken(uint tokenId) external {
        _token.transferFrom(msg.sender, address(this), tokenId);
        payable(msg.sender).transfer(_rateInWei);
    }

    /**
     * Default function that chooses some random NFT token to send back to user in exchange for funds.
     */
    receive() external payable {
        uint256[] memory tokenIds = _token.getTokenIds();
        for (uint i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            if (address(this) == _token.ownerOf(tokenId)) {
                _buyToken(tokenId);
                return;
            }
        }
        revert("No tokens owned by this contract");
    }

    function _buyToken(uint tokenId) private {
        uint256 amountInWei = msg.value;
        if (amountInWei >= _rateInWei) {
            _token.transferFrom(address(this), msg.sender, tokenId);
        } else {
            revert("Not enough funds provided to buy a token");
        }
    }

}
