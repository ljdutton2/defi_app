import React, { Component } from 'react'
import Navigation from './Navbar'
import DaiToken from '../abis/DaiToken.json'
import KarmaToken from '../abis/KarmaToken.json'
import TokenFarm from '../abis/TokenFarm.json'
import Main from './Main'
import './App.css'
import Web3 from 'web3'

class App extends Component {
  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({account:accounts[0]})
    const networkId = await web3.eth.net.getId()

    // Load DaiToken
    const daiTokenData = DaiToken.networks[networkId]
    if(daiTokenData) {
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      this.setState({ daiToken })
      let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()
      this.setState({ daiTokenBalance: daiTokenBalance.toString() })
    } else {
      window.alert('DaiToken contract not deployed to detected network.')
    }
  
    // Load KarmaToken
    const karmaTokenData = KarmaToken.networks[networkId]
    if(karmaTokenData) {
      const karmaToken = new web3.eth.Contract(KarmaToken.abi, karmaTokenData.address)
      this.setState({ karmaToken })
      let karmaTokenBalance = await karmaToken.methods.balanceOf(this.state.account).call()
      this.setState({ karmaTokenBalance: karmaTokenBalance.toString() })
    } else {
      window.alert('Karma contract not deployed to detected network.')
    }

    // Load TokenFarm
    const tokenFarmData = TokenFarm.networks[networkId]
    if(tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      this.setState({ tokenFarm })
      let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call()
      this.setState({ stakingBalance: stakingBalance.toString() })
    } else {
      window.alert('TokenFarm contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  stakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.daiToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.tokenFarm.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  unstakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.tokenFarm.methods.unstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }
    constructor(props) {
      super(props)
      this.state = {
        account: '0x0',
        daiToken: {},
        karmaToken: {},
        tokenFarm: {},
        daiTokenBalance: '0',
        karmaTokenBalance: '0',
        stakingBalance: '0',
        loading: true
      }
    }
  

  render() {
    let content
    if(this.state.loading){
      content =  <Main
      daiTokenBalance={this.state.daiTokenBalance}
      karmaTokenBalance={this.state.karmaTokenBalance}
      stakingBalance={this.state.stakingBalance}
      stakeTokens={this.stakeTokens}
      unstakeTokens={this.unstakeTokens}
      />
    } else {
      content = <Main
      daiTokenBalance={this.state.daiTokenBalance}
      karmaTokenBalance={this.state.karmaTokenBalance}
      stakingBalance={this.state.stakingBalance}
      stakeTokens={this.stakeTokens}
      unstakeTokens={this.unstakeTokens}
      />
    }
    return (
      <div>
        <Navigation account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                
              {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;