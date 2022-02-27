import { useState } from "react";
import { ethers } from "ethers";
import './App.css';
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

  async function signMessage() {
    const signedMessage = await account.signer.signMessage("Please Login to our website!");
    console.log(signedMessage);
  }

  if(!account.connected) {
    return (
      <div className="button" onClick={connect}>
        Connect to Web3!
      </div>
    )
  }
  else {
    return (
      <div className="account">
        Address               Balance
        { account.address } { account.balance }
      </div>
    )
  }


  /*
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>Web3modal</h1>
          <p>No wallet connected. Connect wallet to show accounts and their ETH balances.</p>

          <div id="prepare">
            <button className="btn btn-primary" onClick={connect}>
              Connect Wallet
            </button>
          </div>

          <div id="connected">
            <button className="btn btn-primary">
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
  */

}

export default App;
