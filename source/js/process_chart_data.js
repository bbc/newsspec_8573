define([
	'jquery', 
	'calculator',
	'data/teams', 
	'data/leagues'
], function ($, calculator, teams, leagues) {

	var getTeamsInLeague = function () {
		var userTeam = calculator.getTeam();
		var returnArray = [];


		$.each(teams, function(key, team) {
			if (userTeam.league === team.league) {
				returnArray.push(team);
			}
		});

		return returnArray;
	};
	/* http://stackoverflow.com/a/9716488 */
	var isNumeric = function (n) {
  		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	var getTicketPriceData = function () {
		var dataArray = [];
		var teamsInLeague = getTeamsInLeague();
		var userTeam = calculator.getTeam();

		$.each(teamsInLeague, function(key, team) {
			if(isNumeric(team.cheapSeason) && (team.cheapSeason>0)){
				dataArray.push({
					label: team.shortName, 
					value: team.cheapSeason.toString(), 
					selected: (team.name === userTeam.name)
				});				
			}else{
				/* Return blank array if one team is missing data */
				dataArray = [];
				console.log('Missing ticket price for: ' + team.name);
				return false;
			}

		});

		return dataArray;
	};

	var getPPGChartData = function () {

		var dataArray = [];
		var teamsInLeague = getTeamsInLeague();
		var userTeam = calculator.getTeam();

		$.each(teamsInLeague, function(key, team) {
			if(isNumeric(team.goalCost) && (team.goalCost>0)){
				dataArray.push({
					label: team.shortName, 
					value: parseFloat(team.goalCost).toFixed(2), 
					selected: (team.name === userTeam.name)
				});				
			}else{
				/* Return blank array if one team is missing data */
				dataArray = [];
				console.log('Missing goal cost for: ' + team.name);
				return false;
			}

		});

		return dataArray;

	};

	return {
		getPPGChartData: getPPGChartData,
		getTicketPriceData: getTicketPriceData
	};
});