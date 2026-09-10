// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console2} from "forge-std/Test.sol";
import {Beg3Factory} from "../src/Beg3Factory.sol";
import {Beg3Campaign} from "../src/Beg3Campaign.sol";

contract Beg3Test is Test {
    Beg3Factory factory;
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");

    function setUp() public {
        factory = new Beg3Factory();
        vm.deal(alice, 100 ether);
        vm.deal(bob, 100 ether);
    }

    function test_CreateCampaign() public {
        vm.prank(alice);
        address campaignAddr = factory.createCampaign(
            "Ship portfolio tracker",
            "A clean Base-native portfolio tool",
            2 ether,
            30,
            address(0)
        );

        Beg3Campaign campaign = Beg3Campaign(payable(campaignAddr));
        assertEq(campaign.creator(), alice);
        assertEq(campaign.goal(), 2 ether);
        assertEq(uint256(campaign.status()), uint256(Beg3Campaign.Status.Active));
        assertEq(factory.campaignCount(), 1);
    }

    function test_ContributeAndReachGoal() public {
        vm.prank(alice);
        address campaignAddr = factory.createCampaign(
            "Test campaign",
            "desc",
            1 ether,
            7,
            address(0)
        );
        Beg3Campaign campaign = Beg3Campaign(payable(campaignAddr));

        vm.prank(bob);
        campaign.contributeETH{value: 0.6 ether}();
        assertEq(campaign.raised(), 0.6 ether);
        assertEq(campaign.backerCount(), 1);

        vm.prank(alice);
        campaign.contributeETH{value: 0.5 ether}();
        assertEq(campaign.raised(), 1.1 ether);
        assertEq(uint256(campaign.status()), uint256(Beg3Campaign.Status.Succeeded));
    }

    function test_ClaimAfterSuccess() public {
        vm.prank(alice);
        address campaignAddr = factory.createCampaign(
            "Claim test",
            "desc",
            1 ether,
            7,
            address(0)
        );
        Beg3Campaign campaign = Beg3Campaign(payable(campaignAddr));

        vm.prank(bob);
        campaign.contributeETH{value: 1 ether}();

        uint256 balBefore = alice.balance;
        vm.prank(alice);
        campaign.claim();
        assertEq(alice.balance, balBefore + 1 ether);
        assertTrue(campaign.claimed());
    }

    function test_RefundAfterFailure() public {
        vm.prank(alice);
        address campaignAddr = factory.createCampaign(
            "Fail test",
            "desc",
            10 ether,
            1,
            address(0)
        );
        Beg3Campaign campaign = Beg3Campaign(payable(campaignAddr));

        vm.prank(bob);
        campaign.contributeETH{value: 1 ether}();

        vm.warp(block.timestamp + 2 days);

        uint256 balBefore = bob.balance;
        vm.prank(bob);
        campaign.refund();
        assertEq(bob.balance, balBefore + 1 ether);
        assertEq(campaign.contributions(bob), 0);
    }
}
