// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IOracle} from "../interfaces/IOracle.sol";

contract MockOracle is Ownable {
    uint256 public price;
    uint256 public volatility;

    constructor(address initialOwner, uint256 _price, uint256 _volatility) Ownable(initialOwner) {
        price = _price;
        volatility = _volatility;
    }

    function getPrice(address tokenA, address tokenB) public view returns (uint256) {
        return price;
    }

    function getVolatility(address tokenA, address tokenB) public view returns (uint256) {
        return volatility;
    }

    function setPrice(address tokenA, address tokenB, uint256 _newPrice) public onlyOwner {
        price = _newPrice;
    }

    function setVolatility(address tokenA, address tokenB, uint256 _newVolatility) public onlyOwner {
        volatility = _newVolatility;
    }
}
