// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test, console2 as console, Vm} from "forge-std/Test.sol";

// Libraries
import {Probit} from "src/libraries/Test.sol";

contract ProbitTests is Test {
    function setUp() public virtual {}

    function test_probit() public pure {
        uint256 random = uint256(keccak256(abi.encode(1))) % 1e18;
        int256 u = Probit.probit(int256(random));
        console.log("u: ", u);
    }
}
