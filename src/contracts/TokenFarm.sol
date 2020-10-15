pragma solidity ^0.5.0;
import './KarmaToken.sol';
import './DaiToken.sol';

contract TokenFarm {

string public name = 'Karma Token Farm';
KarmaToken public karmaToken;
DaiToken public daiToken;

constructor(KarmaToken _karmaToken, DaiToken _daiToken) public {

    karmaToken = _karmaToken;
    daiToken = _daiToken;

}


}
