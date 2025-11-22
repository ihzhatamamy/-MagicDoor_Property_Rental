import React, { useState } from "react";
import Web3 from "web3";

function ConnectWalletButton() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        setLoading(true);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        setAccount(account);
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        const balanceWei = await web3.eth.getBalance(account);
        const balanceEth = web3.utils.fromWei(balanceWei, "ether");
        if (balanceEth) {
          setBalance(balanceEth);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance(null);
    setWeb3(null);
  };

  return (
    <>
      {loading ? (
        <button className="connect-wallet">
          <div className="loader" />
        </button>
      ) : !account ? (
        <button onClick={connectWallet} className="connect-wallet">
          Connect Wallet
        </button>
      ) : (
        <>
          {/* <button onClick={disconnectWallet} className="connect-wallet">
            <p>{account.substring(0, 12)}...</p>
            <p>{balance} ETH</p>
          </button> */}
            <li>
                <a href="#" className="dropdown-trigger connect-wallet">Connected</a>
                <ul className="dropdown-menu">
                    <li>{account.substring(0, 12)}...</li>
                    <li>{balance} ETH</li>
                    <li><button onClick={disconnectWallet} className="connect-wallet">Disconnect</button></li>
                </ul>
            </li>
        </>
      )}
    </>
  );
}

export default ConnectWalletButton;
