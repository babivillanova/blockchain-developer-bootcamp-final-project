import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import VerifyCoordinates from './VerifyCoordinates';

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [state, setState] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState(null);

  useEffect(() => {
    async function connectToEthereum() {
      // Detect if MetaMask is installed
      if (window.ethereum) {
        // Connect to MetaMask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        // Get the current account
        const accounts = await provider.listAccounts();
        const signer = provider.getSigner(accounts[0]);
        setSigner(signer);

        // Set up the smart contract connection
        const contract = new ethers.Contract(
          // Replace with the address of your smart contract
          '',
          // Replace with the ABI of your smart contract
          [],
          signer
        );
        setContract(contract);

        // Get the current state of the smart contract
        const state = await contract.getState();
        setState(state);
      } else {
        console.error('MetaMask is not installed');
      }
    }

    connectToEthereum();
  }, []);

  async function handleTransaction(event) {
    event.preventDefault();

    // Get the value from the form
    const value = event.target.elements.value.value;

    // Send the transaction to update the smart contract state
    await contract.setState(value);

    // Get the updated state of the smart contract
    const updatedState = await contract.getState();
    setState(updatedState);

    // Display a message indicating the transaction was successful
    setTransactionStatus('Transaction successful');
  }

  return (
    <div>
      {provider && (
        <>
          <p>Ethereum provider detected</p>
          <p>Account: {signer.address}</p>
          <p>Contract state: {state}</p>
          <form onSubmit={handleTransaction}>
            <label htmlFor="value">Value:</label>
            <input type="text" name="value" />
            <button type="submit">Update contract state</button>
          </form>
          {transactionStatus && <p>{transactionStatus}</p>}
        </>
      )}
      {!provider && <p>Ethereum provider not detected</p>}
      <VerifyCoordinates />
    </div>
  );
}

export default App;
