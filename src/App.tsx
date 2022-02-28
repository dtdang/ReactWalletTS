import { useState } from "react";
import { ethers } from "ethers";
import './App.css';
import Web3Modal from "web3modal";
import Portis from "@portis/web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
// import WalletConnectClient  from "@walletconnect/client";
// import { CLIENT_EVENTS } from "@walletconnect/client";
// import { PairingTypes, SessionTypes } from "@walletconnect/types";


const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider , // required
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
  // uri: any,
}

const InitialState: Accounts = {
  connected: false,
  provider: null,
  address: "",
  signer: null,
  balance: 0,
  // uri: "",
};

function App() {
  //set Account state to initial values
  const [account, setAccount] = useState(InitialState);
  
  async function connect() {
    const web3ModalProvider = await web3Modal.connect();

    //Provides connection to eth network
    const provider = new ethers.providers.Web3Provider(web3ModalProvider);

    async function setAccountFromProvider() {
      //signer- access to private key and authorize network transactions
      const signer = await provider.getSigner(0);
      const address = await signer.getAddress();
      const balance = await signer.getBalance();

      setAccount({
        connected: true,
        provider,
        address,
        signer,
        //format output to something user-friendly
        balance: ethers.utils.formatEther(balance),
        // uri,
      });
    }

    // const client = await WalletConnectClient.init({
    //   projectId: "055734db83719a3a7eece1d09bc55e1e",
    //   relayUrl: "wss://relay.walletconnect.com",
    //   metadata: {
    //     name: "Example Dapp",
    //     description: "Example Dapp",
    //     url: "#",
    //     icons: ["https://walletconnect.com/walletconnect-logo.png"],
    //   },
    // });
    
    
    // client.on(
    //   CLIENT_EVENTS.pairing.proposal,
    //   async (proposal: PairingTypes.Proposal) => {
    //     // uri should be shared with the Wallet either through QR Code scanning or mobile deep linking
    //     const { uri } = proposal.signal.params;
    //   }
    // );
    
    // client.on(
    //   CLIENT_EVENTS.session.created,
    //   async (session: SessionTypes.Created) => {
    //     // session created succesfully
    //   }
    // );
    
    // const session = await client.connect({
    //   permissions: {
    //     blockchain: {
    //       chains: ["eip155:1"],
    //     },
    //     jsonrpc: {
    //       methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
    //     },
    //   },
    // });
    
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
          {/* <button className="btn" onClick={session}>
            WalletConnectV2
          </button> */}
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
