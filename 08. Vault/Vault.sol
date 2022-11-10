// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Vault {
  bool public locked;       //slot 0
  bytes32 private password; //slot 1

  constructor(bytes32 _password)  {
    locked = true;
    password = _password;
  }

  function unlock(bytes32 _password) public {
    if (password == _password) {
      locked = false;
    }
  }
}