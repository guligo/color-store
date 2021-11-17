// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ColorCoin is ERC721, Ownable {

    constructor() ERC721("ColorCoin", "COL") {}

    function _baseURI() internal view virtual override returns (string memory) {
        return "http://127.0.0.1:8080/meta/";
    }

    function createColor(address _to, uint256 _tokenId) onlyOwner public {
        super._mint(_to, _tokenId);
    }

}
