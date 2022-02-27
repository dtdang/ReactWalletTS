import React, { useState } from "react";
import './App.css';
import Web3 from "web3";
import Web3Modal from "web3modal";
import Portis from "@portis/web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "a83e54cc8ffd4887a0b8055d6130e765" // required
    }
  },
  portis: {
    package: Portis, // required
    options: {
      id: "a20d80e4-248b-4f8e-a547-d7e59e4fc6c6" // required
    }
  }
};

const web3Modal = new Web3Modal({
  cacheProvider: false,
  providerOptions, //required
  disableInjectedProvider: false
});

interface InitialState {
  address: string,
  web3: any,
  provider: any,
  chainId: number,
  networkId: number,
  connected: boolean
}

function App(){
  const [web3, setWeb3] = useState(null)
  const [accounts, setAccounts] = useState(null)
  const [chainId, setChainId] = useState(1)
  const [networkId, setNetworkId] = useState(1)
  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)



  componentDidMount() {
    if (web3Modal.cachedProvider){
      web3Connect();
    }
  }

  web3Connect = async () => {
    const provider = await web3Modal.connect();
    await provider.enable();

    const accounts = await web3.eth.getAccounts();

    const address = accounts[0];

    const chainId = await web3.eth.chainId();

    const networkId = await web3.eth.net.getId();
  } 
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>Web3modal</h1>
          <p>No wallet connected. Connect wallet to show accounts and their ETH balances.</p>

          <div id="prepare">
            <button className="btn btn-primary" id="btn-connect" onClick={() => showPrepare()}>
              Connect Wallet
            </button>
          </div>

          <div id="connected">
            <button className="btn btn-primary" id="btn-disconnect">
              Disconnect Wallet
            </button>
          </div>

          <hr></hr>

          <div id="network">
            <p>Connected Blockchain: <span id="network-name"></span></p>
            <p>Selected Account: <span id="selected-account"></span></p>
          </div>

          <hr></hr>

          <h3> All Account balances</h3>

          <table className="table table-listing">
            <thead>
              <th>Address</th>
              <th>ETH Balance</th>
            </thead>

            <tbody id="accounts"></tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
