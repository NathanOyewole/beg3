// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title Beg3Campaign
 * @notice Single funding request for a Base builder.
 *         Supports ETH + ERC20 (USDC) contributions.
 *         Creator can claim once the goal is reached or deadline passes with funds.
 *         Contributors can refund if the campaign fails (deadline passed + goal not met).
 */
contract Beg3Campaign is ReentrancyGuard {
    using SafeERC20 for IERC20;

    enum Status {
        Active,
        Succeeded,
        Failed
    }

    address public factory;
    address public creator;
    string public title;
    string public description;
    uint256 public goal;
    uint256 public deadline;
    address public token;
    uint256 public raised;
    uint256 public backerCount;
    Status public status;
    bool public claimed;

    mapping(address => uint256) public contributions;

    event Contributed(address indexed backer, uint256 amount, uint256 totalRaised);
    event Claimed(address indexed creator, uint256 amount);
    event Refunded(address indexed backer, uint256 amount);
    event StatusUpdated(Status newStatus);

    error NotActive();
    error DeadlinePassed();
    error GoalNotReached();
    error AlreadyClaimed();
    error NothingToRefund();
    error TransferFailed();
    error InvalidAmount();
    error OnlyCreator();
    error OnlyFactory();

    constructor() {
        factory = address(1);
    }

    function initialize(
        address _creator,
        string calldata _title,
        string calldata _description,
        uint256 _goal,
        uint256 _deadline,
        address _token
    ) external {
        if (factory != address(0) && factory != address(1)) revert OnlyFactory();
        require(creator == address(0), "Already initialized");

        factory = msg.sender;
        creator = _creator;
        title = _title;
        description = _description;
        goal = _goal;
        deadline = _deadline;
        token = _token;
        status = Status.Active;
    }

    function contributeETH() external payable nonReentrant {
        if (token != address(0)) revert InvalidAmount();
        _contribute(msg.value);
    }

    function contributeERC20(uint256 amount) external nonReentrant {
        if (token == address(0)) revert InvalidAmount();
        if (amount == 0) revert InvalidAmount();

        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
        _contribute(amount);
    }

    function _contribute(uint256 amount) internal {
        if (status != Status.Active) revert NotActive();
        if (block.timestamp > deadline) revert DeadlinePassed();
        if (amount == 0) revert InvalidAmount();

        if (contributions[msg.sender] == 0) {
            backerCount += 1;
        }
        contributions[msg.sender] += amount;
        raised += amount;

        emit Contributed(msg.sender, amount, raised);

        if (raised >= goal) {
            status = Status.Succeeded;
            emit StatusUpdated(Status.Succeeded);
        }
    }

    function claim() external nonReentrant {
        if (msg.sender != creator) revert OnlyCreator();
        if (claimed) revert AlreadyClaimed();

        _updateStatusIfNeeded();

        if (status != Status.Succeeded) revert GoalNotReached();

        claimed = true;
        uint256 amount = raised;

        if (token == address(0)) {
            (bool ok,) = creator.call{value: amount}("");
            if (!ok) revert TransferFailed();
        } else {
            IERC20(token).safeTransfer(creator, amount);
        }

        emit Claimed(creator, amount);
    }

    function refund() external nonReentrant {
        _updateStatusIfNeeded();

        if (status != Status.Failed) revert NotActive();

        uint256 amount = contributions[msg.sender];
        if (amount == 0) revert NothingToRefund();

        contributions[msg.sender] = 0;
        raised -= amount;

        if (token == address(0)) {
            (bool ok,) = msg.sender.call{value: amount}("");
            if (!ok) revert TransferFailed();
        } else {
            IERC20(token).safeTransfer(msg.sender, amount);
        }

        emit Refunded(msg.sender, amount);
    }

    function getCampaign()
        external
        view
        returns (
            address _creator,
            string memory _title,
            string memory _description,
            uint256 _goal,
            uint256 _deadline,
            address _token,
            uint256 _raised,
            uint256 _backerCount,
            Status _status,
            bool _claimed
        )
    {
        return (
            creator,
            title,
            description,
            goal,
            deadline,
            token,
            raised,
            backerCount,
            status,
            claimed
        );
    }

    function _updateStatusIfNeeded() internal {
        if (status != Status.Active) return;
        if (block.timestamp <= deadline) return;

        if (raised >= goal) {
            status = Status.Succeeded;
        } else {
            status = Status.Failed;
        }
        emit StatusUpdated(status);
    }

    receive() external payable {
        if (token == address(0)) {
            _contribute(msg.value);
        } else {
            revert InvalidAmount();
        }
    }
}
