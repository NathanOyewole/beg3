// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {Beg3Campaign} from "./Beg3Campaign.sol";

/**
 * @title Beg3Factory
 * @notice Deploys cheap campaign clones (ERC-1167) for Base builders.
 */
contract Beg3Factory {
    using Clones for address;

    address public immutable implementation;
    address public owner;

    address[] public allCampaigns;
    mapping(address => address[]) public campaignsByCreator;

    event CampaignCreated(
        address indexed campaign,
        address indexed creator,
        string title,
        uint256 goal,
        uint256 deadline,
        address token
    );

    error InvalidGoal();
    error InvalidDeadline();
    error InvalidTitle();

    constructor() {
        implementation = address(new Beg3Campaign());
        owner = msg.sender;
    }

    function createCampaign(
        string calldata title,
        string calldata description,
        uint256 goal,
        uint256 durationDays,
        address token
    ) external returns (address campaign) {
        if (bytes(title).length == 0) revert InvalidTitle();
        if (goal == 0) revert InvalidGoal();
        if (durationDays == 0 || durationDays > 365) revert InvalidDeadline();

        uint256 deadline = block.timestamp + (durationDays * 1 days);

        campaign = implementation.clone();
        Beg3Campaign(payable(campaign)).initialize(
            msg.sender,
            title,
            description,
            goal,
            deadline,
            token
        );

        allCampaigns.push(campaign);
        campaignsByCreator[msg.sender].push(campaign);

        emit CampaignCreated(campaign, msg.sender, title, goal, deadline, token);
    }

    function campaignCount() external view returns (uint256) {
        return allCampaigns.length;
    }

    function getCampaignsByCreator(address creator) external view returns (address[] memory) {
        return campaignsByCreator[creator];
    }

    function getAllCampaigns() external view returns (address[] memory) {
        return allCampaigns;
    }
}
