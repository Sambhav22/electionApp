var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts)
{
    var electionInstance;

    it("number of candidates = 9", function()
    {
        return Election.deployed().then(
        function(instance)
        {
            return instance.candidateCount();
        }).then(
        function(count)
        {
            assert.equal(count, 9);
        });
    });

    it("correct values for each candidate", function()
    {
        return Election.deployed().then(
        function(instance)
        {
            electionInstance = instance;
            return electionInstance.candidateMap(1);
        }).then(
        function(candidate)
        {
            assert.equal(candidate[0], 1, "correct id - 1");
            assert.equal(candidate[1], "Bharatiya Janata Party", "correct name - 1");
            assert.equal(candidate[2], 0, "correct votes count - 1");
            return electionInstance.candidateMap(2);
        }).then(
        function(candidate)
        {
            assert.equal(candidate[0], 2, "correct id - 2");
            assert.equal(candidate[1], "Indian National Congress", "correct name - 2");
            assert.equal(candidate[2], 0, "correct votes count - 2");
            return electionInstance.candidateMap(3);
        }).then(
        function(candidate)
        {
            assert.equal(candidate[0], 3, "correct id - 3");
            assert.equal(candidate[1], "Shiv Sena", "correct name - 3");
            assert.equal(candidate[2], 0, "correct votes count - 3");
            return electionInstance.candidateMap(4);
        }).then(
        function(candidate)
        {
            assert.equal(candidate[0], 4, "correct id - 4");
            assert.equal(candidate[1], "Bahujan Samaj Party", "correct name - 4");
            assert.equal(candidate[2], 0, "correct votes count - 4");
            return electionInstance.candidateMap(5);
        }).then(
        function(candidate)
        {
            assert.equal(candidate[0], 5, "correct id - 5");
            assert.equal(candidate[1], "Samajhwadi Party", "correct name - 5");
            assert.equal(candidate[2], 0, "correct votes count - 5");
            return electionInstance.candidateMap(6);
        }).then(
        function(candidate)
        {
            assert.equal(candidate[0], 6, "correct id - 6");
            assert.equal(candidate[1], "Independent", "correct name - 6");
            assert.equal(candidate[2], 0, "correct votes count - 6");
            return electionInstance.candidateMap(7);
        }).then(
        function(candidate)
        {
            assert.equal(candidate[0], 7, "correct id - 7");
            assert.equal(candidate[1], "Communist Party of India", "correct name - 7");
            assert.equal(candidate[2], 0, "correct votes count - 7");
            return electionInstance.candidateMap(8);
        }).then(
        function(candidate)
        {
            assert.equal(candidate[0], 8, "correct id - 8");
            assert.equal(candidate[1], "Aam aadmi Party", "correct name - 8");
            assert.equal(candidate[2], 0, "correct votes count - 8");
            return electionInstance.candidateMap(9);
        }).then(
        function(candidate)
        {
            assert.equal(candidate[0], 9, "correct id - 9");
            assert.equal(candidate[1], "All India Trinamool Congress", "correct name - 9");
            assert.equal(candidate[2], 0, "correct votes count - 9");
        });
    });
});