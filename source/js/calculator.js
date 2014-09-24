define([
	'jquery', 
	'data/teams', 
	'data/leagues'
], function ($, teams, leagues) {

	this.getTeam = function(){
		var selectTeam = $('#user-team').val();
		return teams[selectTeam];
	};

	this.getLeagueData = function(){
		var team = getTeam();
		return leagues[team.league];
	};


	return {
		getResultsBreakDown: function () {
			
			var justKit = isJustKit();
			var league = getLeagueData();

			var resultsBreakDown = {};

			resultsBreakDown.tickets = getTicketCosts();
			resultsBreakDown.food = getFoodCost();
			resultsBreakDown.programmes = getProgrammeCost();
			resultsBreakDown.kit = getKitCost();

			/* Returns true or false if the user only buys kit and nothing else */
			function isJustKit() {
				return ($('input[name="user-ticket"]:checked').val()==='none');
			}


			function getTicketCosts() {
				if(!justKit){
					return $('#ticket-price').val()*1;
				}else{
					return 0;
				}
			}

			function getFoodCost() {
				if(!justKit){
					return ($('#food-price').val() * league.homeGames);
				}else{
					return 0;
				}
			}

			function getProgrammeCost() {
				if(!justKit){
					return ($('#programmes-price').val() * league.homeGames);
				}else{
					return 0;
				}
			}

			function getKitCost() {
				return $('#kit-price').val()*1;
			}
			console.log(resultsBreakDown);

		}
	};
});