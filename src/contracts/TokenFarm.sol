pragma solidity ^0.5.0;
import './KarmaToken.sol';
import './DaiToken.sol';

contract TokenFarm {

string public name = 'Karma Token Farm';
KarmaToken public karmaToken;
DaiToken public daiToken;

address[] public stakers
mapping(address => uint) public stakingBalance)
mapping(address => bool) public hasStaked
mapping(address => bool) public isStaking
constructor(KarmaToken _karmaToken, DaiToken _daiToken) public {
    karmaToken = _karmaToken;
    daiToken = _daiToken;

}

function stakeTokens(uint _amount) public {
    // transfer the mock tokens to the contract
    daiToken.transferFrom(msg.sender,address(this), _amount);

    //update their staking balance
    stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount

    // add user to staking array if they have not previously
    if(!hasStaked[msg.sender]) {
        stakers.push(msg.sender;)
    }
    //update their status
    hasStaked[msg.sender] = true;
}


}
