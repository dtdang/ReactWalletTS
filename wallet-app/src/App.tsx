import React from "react";

//import Web3 from "web3";
//import Web3Modal from "web3modal";
//import Portis from "@portis/web3";


export default function App(props) {
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1>Web3modal</h1>
          <p>No wallet connected. Connect wallet to show accounts and their ETH balances.</p>

          <div id="prepare">
            <button class="btn btn-primary" id="btn-connect">
              Connect Wallet
            </button>
          </div>

          <div id="connected">
            <button class="btn btn-primary" id="btn-disconnect">
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

          <table class="table table-listing">
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

