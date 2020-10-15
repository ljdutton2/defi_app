pragma solidity ^0.5.0;
import './KarmaToken.sol';
import './DaiToken.sol';

contract TokenFarm {

string public name = 'Karma Token Farm';
address public owner;
KarmaToken public karmaToken;
DaiToken public daiToken;

address[] public stakers;
mapping(address => uint) public stakingBalance;
mapping(address => bool) public hasStaked;
mapping(address => bool) public isStaking;

constructor(KarmaToken _karmaToken, DaiToken _daiToken) public {
    karmaToken = _karmaToken;
    daiToken = _daiToken;
    owner = msg.sender;
}

function stakeTokens(uint _amount) public {
    require(_amount>0,"amount cannot be zero");
    // transfer the mock tokens to the contract
    daiToken.transferFrom(msg.sender,address(this), _amount);

    //update their staking balance
    stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

    // add user to staking array if they have not previously
    if(!hasStaked[msg.sender]) {
        stakers.push(msg.sender);
    }
    //update their status
    hasStaked[msg.sender] = true;
}
function issueToken() public {
    require(msg.sender == owner, "Only the owner of the contract can issue token");
    
    //issue token to all stakers
     for(uint i=0;i<stakers.length; i++) {
        address recipient = stakers[i];
        uint balance = stakingBalance[recipient];
        if(balance>0){
            karmaToken.transfer(recipient,balance);
        }
        
        }
}

}
