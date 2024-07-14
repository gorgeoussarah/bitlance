// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Test, console} from "forge-std/Test.sol";

import {BITLANCE}  from "../src/BITLANCE.sol";

contract BITLANCETEST is Test{
BITLANCE public bitlance;
address public tokenA = address(1);
address public tokenB = address(2);
address public manager1= address(3);

//  function addToken(address _addr)public onlyManager{
//         allowedTokens[_addr] = true;

//     }

function setUp()public{
    bitlance = new BITLANCE();
    vm.label(tokenA, "tokenA");
    vm.label(tokenB, "tokenB");
    bitlance.addToken(tokenA);

   

}

/****
 * @dev BITLANCEMANAGEMENT CONTRACT
 * 1. check if an address token is allowed
 * 2. check if an address is not allowed
 * 3. check if the call is a manager
 * 4. check an address not  manager
 * 5. add another address to the manager list
 */
function test_checkIfTokenIsAllowed()public view{
   bool isAllowed =  bitlance.allowedTokens(tokenA);
     assertEq(isAllowed, true);
}

function test_checkIfTokenIsNotAllowed()public view{
   bool isAllowed =  bitlance.allowedTokens(tokenB);
     assertEq(isAllowed, false);
}

//the address(this) was the deployer of the contract -> automatic added to the list of the managers
function test_isManager()public view{
    bool isManager = bitlance.isManager(address(this));
    assertEq(isManager, true);
}

function test_notManager()public view{
    bool isManager = bitlance.isManager(manager1);
    assertEq(isManager, false);
}
function test_addNewManager2()public {
    bitlance.addManager(manager1);
    bool isManager = bitlance.isManager(manager1);
    assertEq(isManager, true);
    }





}
