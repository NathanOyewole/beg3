// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console2} from "forge-std/Script.sol";
import {Beg3Factory} from "../src/Beg3Factory.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        Beg3Factory factory = new Beg3Factory();
        console2.log("Beg3Factory deployed at:", address(factory));
        console2.log("Implementation at:", factory.implementation());

        vm.stopBroadcast();
    }
}
