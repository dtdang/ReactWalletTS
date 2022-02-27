import { useState } from "react";
import { ethers } from "ethers";
import './App.css';
import Web3Modal from "web3modal";
import Portis from "@portis/web3";
import WalletConnectClient  from "@walletconnect/client";

const providerOptions = {
  walletconnect: {
    package: WalletConnectClient , // required
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
  network: "mainnet", // optional
  cacheProvider: false, // optional
  providerOptions // required
});

interface Accounts {
  connected: boolean,
  provider: any,
  address: string,
  signer: any,
  balance: any,
}

const InitialState: Accounts = {
  connected: false,
  provider: null,
  address: "",
  signer: null,
  balance: 0
};

function App() {
  const [account, setAccount] = useState(InitialState);
  
  async function connect() {
    const web3ModalProvider = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(web3ModalProvider);

    async function setAccountFromProvider() {
      const signer = await provider.getSigner(0);
      const address = await signer.getAddress();
      const balance = await signer.getBalance();

      setAccount({
        connected: true,
        provider,
        address,
        signer,
        balance: ethers.utils.formatEther(balance)
      });
    }

    setAccountFromProvider();

    web3ModalProvider.on("accountsChanged", () => {
      setAccountFromProvider();
    });
  }

  if(!account.connected) {
    return (
      <div className="App">
        <div className="col-md-12">
          <h1>Web3Modal</h1>
          <p>No wallet connected. Connect wallet to show account address and ETH balance.</p>
          <button className="btn btn-primary" onClick={connect}>
            Connect to Web3!
          </button>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="App">
        <div className="col-md-12">
          <h1>Web3Modal</h1>
          <table className="table table-listing">
            <thead>
              <th>Address</th>
              <th>ETH Balance</th>
            </thead>

            <tbody>
              <th>{ account.address }</th>
              <th>{ account.balance }</th>
            </tbody>
          </table>
          
        </div>
      </div>
    )
  }

}

export default App;
