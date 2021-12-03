// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ColorCoin is ERC721, Ownable {

    string private _metaURI;

    uint256[] private _tokenIds;

    constructor(string memory metaURI) ERC721("ColorCoin", "COL") {
        _metaURI = metaURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _metaURI;
    }

    function createColor(address to, uint256 tokenId) onlyOwner public {
        super._mint(to, tokenId);
        _tokenIds.push(tokenId);
    }

    function getTokenIds() public view virtual returns (uint256[] memory) {
        return _tokenIds;
    }

}
