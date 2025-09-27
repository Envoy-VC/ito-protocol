// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IOracle} from "../interfaces/IOracle.sol";

contract MockOracle is Ownable {
    // Token A => Token B => Price
    mapping(address => mapping(address => uint256)) public price;

    // Token A => Token B => Volatility
    mapping(address => mapping(address => uint256)) public volatility;

    constructor(address initialOwner) Ownable(initialOwner) {}

    function getPrice(address tokenA, address tokenB) public view returns (uint256) {
        return price[tokenA][tokenB];
    }

    function getVolatility(address tokenA, address tokenB) public view returns (uint256) {
        return volatility[tokenA][tokenB];
    }

    function setPrice(address tokenA, address tokenB, uint256 _newPrice) public onlyOwner {
        price[tokenA][tokenB] = _newPrice;
    }

    function setVolatility(address tokenA, address tokenB, uint256 _newVolatility) public onlyOwner {
        volatility[tokenA][tokenB] = _newVolatility;
    }

    function setPriceAndVolatility(address tokenA, address tokenB, uint256 _newPrice, uint256 _newVolatility)
        public
        onlyOwner
    {
        price[tokenA][tokenB] = _newPrice;
        volatility[tokenA][tokenB] = _newVolatility;
    }
}
