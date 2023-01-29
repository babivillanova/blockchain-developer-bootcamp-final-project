import React, { useState } from 'react';
import { ethers } from 'ethers';
import { parseSync } from 'web-ifc';

function VerifyCoordinates() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [coordinateSystem, setCoordinateSystem] = useState(null);
  const [error, setError] = useState(null);

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
      } else {
        console.error('MetaMask is not installed');
      }
    }

    connectToEthereum();
  }, []);

  async function handleFileChange(event) {
    try {
      // Parse the IFC file
      const file = event.target.files[0];
      const { entities } = parseSync(file);

      // Verify the coordinate system
      const site = entities.find(entity => entity.type === 'IFCSITE');
      if (site) {
        const {
          ObjectPlacement: {
            PlacementRelTo: {
              IfcLocalPlacement: {
                Location: {
                  Coords: [x, y, z]
                }
              }
            }
          }
        } = site;
        setCoordinateSystem({ x, y, z });

        // Send money to the specified account
        await contract.sendMoney(
          // Replace with the address of the recipient
          '',
          // Replace with the amount of money to send
          0
        );
      } else {
        setError('Coordinate system not found');
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      {provider && (
        <form>
          <label htmlFor="file">Select an IFC file:</label>
          <input type="file" name="file" onChange={handleFileChange} />
        </form>
      )}
      {!provider && <p>Ethereum provider not detected</p>}
      {coordinateSystem && (
        <p>
          Coordinate system : {coordinateSystem.x},{coordinateSystem.y},
{coordinateSystem.z}
</p>
)}
{error && <p>Error: {error}</p>}
</div>
);
}

export default VerifyCoordinates;