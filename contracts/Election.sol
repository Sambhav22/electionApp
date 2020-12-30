pragma solidity ^0.5.12;

contract Election {
	// structure for candidates
	struct Candidate {
		uint candidateId;
		string candidateName;
		uint candidateVoteCount;
	}

	uint public candidateCount;
	mapping(uint => Candidate) public candidateMap;
	mapping(address => bool) public voters;

	constructor() public {
		candidateCount = 0;
		addCandidate("Bharatiya Janata Party");
		addCandidate("Indian National Congress");
		addCandidate("Shiv Sena");
		addCandidate("Bahujan Samaj Party");
		addCandidate("Samajhwadi Party");
		addCandidate("Independent");
		addCandidate("Communist Party of India");
		addCandidate("Aam aadmi Party");
		addCandidate("All India Trinamool Congress");
	}

	function addCandidate(string memory _candidateName) private {
		candidateCount++;
		candidateMap[candidateCount] = Candidate(candidateCount, _candidateName, 0);
	}

	function CastVote(uint _candidateId) public {
		require(!voters[msg.sender]);
		require(_candidateId> 0 && _candidateId <= candidateCount);
		voters[msg.sender] = true;
		candidateMap[_candidateId].candidateVoteCount++;
	}
}