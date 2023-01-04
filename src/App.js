import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import VerifyCoordinates from './VerifyCoordinates';

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [contractState, setContractState] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState(null);

  useEffect(() => {
    async function connectToWeb3() {
      // Detect if MetaMask is installed
      if (window.ethereum) {
        // Connect to MetaMask
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);

        // Get the current account
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        // Set up the smart contract connection
        const contract = new web3.eth.Contract(
          // Replace with the ABI of your smart contract
          [],
          // Replace with the address of your smart contract
          ''
        );
        setContract(contract);

        // Get the current state of the smart contract
        const contractState = await contract.methods.getState().call();
        setContractState(contractState);
      } else {
        console.error('MetaMask is not installed');
      }
    }

    connectToWeb3();
  }, []);

  async function handleTransaction(event) {
    event.preventDefault();

    // Get the value from the form
    const value = event.target.elements.value.value;

    // Send the transaction to update the smart contract state
    await contract.methods.setState(value).send({ from: account });

    // Get the updated state of the smart contract
    const updatedContractState = await contract.methods.getState().call();
    setContractState(updatedContractState);

    // Display a message indicating the transaction was successful
    setTransactionStatus('Transaction successful');
  }

  return (
    <div>
      {web3 && (
        <>
          <p>Web3 detected</p>
          <p>Account: {account}</p>
          <p>Contract state: {contractState}</p>
          <form onSubmit={handleTransaction}>
            <label htmlFor="value">Value:</label>
            <input type="text" name="value" />
            <button type="submit">Update contract state</button>
          </form>
          {transactionStatus && <p>{transactionStatus}</p>}
        </>
      )}
      {!web3 && <p>Web3 not detected</p>}
      <VerifyCoordinates />
    </div>
  );
}

export default App;