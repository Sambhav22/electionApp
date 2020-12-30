App = {

	web3Provider: null,
	contracts: {},
	account: 'Welcome',
	init: function()
	{
		return App.initWeb3();
	},

	initWeb3: function()
	{
		if (typeof web3 !== 'undefined')
		{
			App.web3Provider = web3.currentProvider;
  			web3 = new Web3(web3.currentProvider);
		}
		else
		{
			App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
			web3 = new Web3(App.web3Provider);
		}
		return App.initContract();
	},

	initContract: function()
	{
		$.getJSON("Election.json", function(election)
		{
  			App.contracts.Election = TruffleContract(election);
			App.contracts.Election.setProvider(App.web3Provider);
			return App.render();
		});
	},

	render: function()
	{
		var electionInstance;
		var loader = $("#loader");
		var content = $("#content");
		loader.show();
		content.hide();

		// get account of user
		web3.eth.getAccounts(function(err, account)
		{
  			if (err === null)
  			{
				App.account = account;
				$("#accountAddress").html("Your Account: " + account);
  			}
		});


		App.contracts.Election.deployed().then(function(instance)
		{
  			electionInstance = instance;
  			return electionInstance.candidateCount();

		}).then(function(candidateCount)
		{
  			var candidatesResults = $("#candidatesResults");
  			candidatesResults.empty();

  			var candidateSelect = $("#candidatesSelect");
  			candidateSelect.empty();

  			for (var i = 1; i <= candidateCount; i++)
  			{
				electionInstance.candidateMap(i).then(function(candidate)
				{
	  				var id = candidate[0];
	  				var name = candidate[1];
	  				var voteCount = candidate[2];
					var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
	  				candidatesResults.append(candidateTemplate);

	  				var candidateOption = "<option value='" + id + "' >" + name + "</ option>";
	  				candidateSelect.append(candidateOption);
				});
  			}
  			return electionInstance.voters(App.account);
  		}).then(function(hasVoted)
  		{
  			if(hasVoted)
  			{
  				$('form').hide();
  			}
  			loader.hide();
			content.show();
		}).catch(function(error)
		{
  			console.warn(error);
		});
	},

	castVote: function()
	{
		var candidateId = $('#candidatesSelect').val();
		console.log(candidateId);
		console.log(App.account[0]);
		App.contracts.Election.deployed().then(function(ins){
			return ins.CastVote(candidateId, {from: App.account[0]});
		}).then(function(result){
			console.log("Hello");
			window.location.reload();
		}).catch(function(err) {
			console.warn(err);
		});
	}

};


$(function() 
{
	$(window).load(function()
	{
		App.init();
	});
});
