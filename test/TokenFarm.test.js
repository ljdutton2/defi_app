
const DaiToken = artifacts.require('DaiToken')
const KarmaToken = artifacts.require('KarmaToken')
const TokenFarm = artifacts.require('TokenFarm')

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('TokenFarm', ([owner, investor]) => {
  let daiToken, karmaToken, tokenFarm

  before(async () => {
    // Load Contracts
    daiToken = await DaiToken.new()
    karmaToken = await KarmaToken.new()
    tokenFarm = await TokenFarm.new(karmaToken.address, daiToken.address)

    // Transfer all Karma tokens to farm (1 million)
    await karmaToken.transfer(tokenFarm.address, tokens('1000000'))

    // Send tokens to investor
    await daiToken.transfer(investor, tokens('100'), { from: owner })
  })
  describe('Mock DAI deployment', async () => {
    it('has a name', async () => {
      const name = await daiToken.name()
      assert.equal(name, 'Mock DAI Token')
    })
  })
})