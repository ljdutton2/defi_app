const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function(callback) {
    console.log('Issued Tokens!!')
    let tokenFarm = await TokenFarm.deployed()
    await tokenFarm.issueToken()
    callback()
};
