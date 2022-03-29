// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract TweetPortal {
    uint256 totalTweets;

    event NewTweet(address indexed from, uint256 timestamp, string message);

    struct Tweet {
        address tweeter;
        string message;
        uint256 timestamp;
    }

    Tweet[] tweets;

    constructor() payable {
        console.log("Im a super small tweeter");
    }

    function tweet(string memory _message) public {
        console.log("%s tweeted w/ message %s", msg.sender, _message);
        console.log("%s has tweeted! ", msg.sender);

        tweets.push(Tweet(msg.sender, _message, block.timestamp));

        emit NewTweet(msg.sender, block.timestamp, _message);
        uint256 prizeAmount = 0.000001 ether;
        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
        totalTweets += 1;
    }

    function getAllTweets() public view returns (Tweet[] memory) {
        return tweets;
    }

    function getTotalTweets() public view returns (uint256) {
        console.log("We have %d total tweets! ", totalTweets);
        return totalTweets;
    }
}
