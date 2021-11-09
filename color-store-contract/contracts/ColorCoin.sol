// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ColorCoin is ERC721 {

    constructor() ERC721("ColorCoin", "COL") {
    }

    function createColor(address _to, uint256 _tokenId) public {
        super._mint(_to, _tokenId);
    }

}
