const TokenFarm = artifacts.require("TokenFarm");
const KarmaToken = artifacts.require("KarmaToken");
const DaiToken = artifacts.require("DaiToken");


module.exports = async function(deployer, network, accounts) {

    await deployer.deploy(DaiToken);
    const daiToken = await DaiToken.deployed()

    await deployer.deploy(KarmaToken);
    const karmaToken = await KarmaToken.deployed()
    
    await deployer.deploy(TokenFarm, karmaToken.address, daiToken.address)
    const tokenFarm = await TokenFarm.deployed()

    await karmaToken.transfer(tokenFarm.address,'1000000000000000000000000')

    // starting the user off with one million fake Dai to invest in karma
    await daiToken.transfer(accounts[1],'1000000000000000000000000')
};
