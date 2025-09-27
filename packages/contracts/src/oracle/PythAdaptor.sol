// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract PythAdaptor is Ownable {
    // Token A => Token B => Price Feed Id
    mapping(address => mapping(address => bytes32)) public priceFeedIds;

    IPyth public pyth;

    constructor(address initialOwner, address _pythAddress) Ownable(initialOwner) {
        pyth = IPyth(_pythAddress);
    }

    function getPrice(address tokenA, address tokenB) public view returns (uint256) {
        bytes32 priceFeedId = priceFeedIds[tokenA][tokenB];
        require(priceFeedId != bytes32(0), "Price feed not found");

        PythStructs.Price memory price = pyth.getPriceUnsafe(priceFeedId);

        return (uint256(uint64(price.price)) * (10 ** 18)) / (10 ** uint8(uint32(-1 * price.expo)));
    }

    function setPriceFeedId(address tokenA, address tokenB, bytes32 _priceFeedId) public onlyOwner {
        priceFeedIds[tokenA][tokenB] = _priceFeedId;
    }
}
