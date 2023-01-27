### blockchain-developer-bootcamp-final-project
# THE BIM COORDINATE ORACLE 

This app allows users to receive an IFC BIM file from designers pre assigned, and automatically validate the coordinates in the file to ensure that they are correct. If the coordinates are valid, the app self initiates payment to the designer using the Projects smart contract. This automates the payment process and ensures that designers are only paid if their work meets the required specifications.

The process of receiving and validating the IFC BIM file is an important part of the overall workflow, as it ensures that the design meets the necessary standards and requirements. By automating the payment process based on the validity of the coordinates, the app streamlines the process and reduces the risk of errors or discrepancies. This helps to improve efficiency and accuracy, and ensures that designers are fairly compensated for their work. Overall, the functionality of receiving and validating an IFC BIM file and automating payment based on the results is an important and valuable feature of the app.


## About the code structure
This app is a simple function component based React app that allows users to interact with a smart contract on the Ethereum blockchain. The app detects the presence of MetaMask, connects to the current account, and displays information from the smart contract. It also allows the user to submit a transaction to update the smart contract state. If the transaction is successful, the app updates the frontend to reflect the new state. The app also includes a function called VerifyCoordinates that allows the user to input an IFC file and verify if the coordinate system is correct. If the coordinates are correct, the app calls the smart contract to send money to a specific account. The smart contract, called Projects, stores the accounts of the creator and recipient for each project and allows the creator to pay the recipient if the coordinates are correct.

## Protecting against Solidity Pitfalls and Attacks and Smart Contract Pitfalls and Attacks

To protect against the "Using Specific Compiler Pragma" attack, it is recommended to use the latest version of Solidity (^0.8.0 in this case). This ensures that the contract is compiled with the latest compiler features and security fixes.

To protect against the "Checks-Effects-Interactions" attack, the payRecipient function first checks that the caller is the owner of the contract using the isOwner function. It then calls the send function of the Payment contract to send money to the recipient. Finally, it checks the return value of the send function to ensure that the payment was successful. This avoids any state changes after external calls, as the state changes (sending the payment) are only performed if the checks (caller is owner and payment was successful) are successful.

## Try it yourself

Clone the repository https://github.com/babivillanova/blockchain-developer-bootcamp-final-project and run the code with the commands

yarn

yarn start
