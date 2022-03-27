// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract TweetPortal {
    uint256 totalTweets;

    constructor() {
        console.log('Primer contrato inteligente, para generar Tweets');
    }

    function tweet() public {
        totalTweets += 1;
        console.log('%s has tweeted! ', msg.sender);
    }

    function getTotalTweets() public view returns (uint256) {
        console.log('We have %d total tweets! ', totalTweets);
        return totalTweets;
    }
}