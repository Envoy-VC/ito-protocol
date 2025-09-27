// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Script} from "forge-std/Script.sol";
import {console2 as console} from "forge-std/console2.sol";

contract Deploy is Script {
    function run() public {
        vm.startBroadcast();

        vm.stopBroadcast();
    }
}
