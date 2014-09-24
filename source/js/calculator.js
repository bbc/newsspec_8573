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

			resultsBreakDown.tickets = 0;
			resultsBreakDown.food = getFoodCost();
			resultsBreakDown.programmes = 0;
			resultsBreakDown.kit = 0;

			/* Returns true or false if the user only buys kit and nothing else */
			function isJustKit() {
				return ($('input[name="user-ticket"]:checked').val()==='none');
			}

			function getFoodCost() {
				if(!justKit){
					return ($('#food-price').val() * league.homeGames);
				}else{
					return 0;
				}
			}

			console.log(resultsBreakDown);

		}
	};
});