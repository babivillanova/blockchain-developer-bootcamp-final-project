import React, { useState } from 'react';
import Web3 from 'web3';
import { IfcGeometry, IfcSite } from 'ifc-geometry';

function VerifyCoordinates() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [coordinateSystem, setCoordinateSystem] = useState(null);
  const [error, setError] = useState(null);

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
      } else {
        console.error('MetaMask is not installed');
      }
    }

    connectToWeb3();
  }, []);

  async function handleFileChange(event) {
    try {
      // Parse the IFC file
      const file = event.target.files[0];
      const geometry = new IfcGeometry(file);
      const site = geometry.getSite();

      // Verify the coordinate system
      if (site instanceof IfcSite) {
        const { latitude, longitude, elevation } = site;
        setCoordinateSystem({ latitude, longitude, elevation });

        // Send money to the specified account
        await contract.methods.sendMoney(
          // Replace with the address of the recipient
          '',
          // Replace with the amount of money to send
          0
        ).send({ from: account });
      } else {
        setError('Coordinate system not found');
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      {web3 && (
        <form>
          <label htmlFor="file">Select an IFC file:</label>
          <input type="file" name="file" onChange={handleFileChange} />
        </form>
      )}
      {!web3 && <p>Web3 not detected</p>}
      {coordinateSystem && (
        <p>
          Coordinate system: {coordinateSystem.latitude},{coordinateSystem.longitude},
          {coordinateSystem.elevation}
        </p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default VerifyCoordinates;