pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/access/Ownable.sol";

contract Projects is Ownable {
  // Struct to store a project
  struct Project {
    address creator;
    address recipient;
  }

  // Mapping to store all projects
  mapping(uint => Project) public projects;

  // Event to emit when a project is created
  event ProjectCreated(uint index, address creator, address recipient);

  // External contract to use for payment
  Payment contract payment;

  // Constructor to set the payment contract
  constructor(address _payment) public {
    payment = Payment(_payment);
  }

  // Function to create a new project
  function createProject(address recipient) public {
    // Get the current number of projects
    uint numProjects = projects.length;

    // Create a new project
    projects[numProjects] = Project({
      creator: msg.sender,
      recipient: recipient
    });

    // Emit the ProjectCreated event
    emit ProjectCreated(numProjects, msg.sender, recipient);
  }

  // Function to pay the recipient of a project
  function payRecipient(uint projectIndex) public {
    // Get the project
    Project storage project = projects[projectIndex];

    // Check that the caller is the owner of the contract
    require(isOwner(), "Only the owner can pay the recipient");

    // Send money to the recipient using the payment contract
    bool success = payment.send.value(project.amount)(project.recipient);
    require(success, "Payment failed");
  }
}
