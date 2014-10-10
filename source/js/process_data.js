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


	var getTeamsInEurope = function () {
		var userTeam = calculator.getTeam();
		var returnArray = [];


		$.each(teams, function(key, team) {
			if (leagues[team.prettyLeague].isEuropean) {
				team.cheapSeason = Math.round(team.cheapSeason);
				returnArray.push(team);
			}
		});

		return returnArray;
	};

	/* http://stackoverflow.com/a/9716488 */
	var isNumeric = function (n) {
  		return !isNaN(parseFloat(n)) && isFinite(n);
	};

	var getEuropeanTicketChartData = function () {
		var dataArray = [];
		var userTeam = calculator.getTeam();

		var teamsInEurope = getTeamsInEurope();

		$.each(teamsInEurope, function(key, team) {
			if(isNumeric(team.cheapSeason) && (team.cheapSeason>0)){
				dataArray.push({
					label: team.shortName, 
					value: team.cheapSeason.toString(), 
					selected: (team.name === userTeam.name)
				});				
			}

		});

		return dataArray;
	};

	var getTicketPriceChartData = function () {
		var dataArray = [];
		var userTeam = calculator.getTeam();

		if(calculator.getLeague().isEuropean){
			return getEuropeanTicketChartData();
		}

		var teamsInLeague = getTeamsInLeague();

		$.each(teamsInLeague, function(key, team) {
			if(isNumeric(team.cheapSeason) && (team.cheapSeason>0)){
				dataArray.push({
					label: team.shortName, 
					value: team.cheapSeason.toString(), 
					selected: (team.name === userTeam.name)
				});				
			}

		});

		return dataArray;
	};

	var getPPGChartData = function () {

		var dataArray = [];

		/* If European return no data. */
		if(calculator.getLeague().isEuropean){
			return dataArray;
		}

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
				return false;
			}

		});

		return dataArray;

	};

	var getTeamSearchData = function () {
		var teamsObject = [];
		$.each(teams, function (index, team) {
			teamsObject.push({
				value: team.name,
				data: { 
					league: team.league,
					team: team 
				}
			});
		});
		return teamsObject;
	};

	return {
		getPPGChartData: getPPGChartData,
		getTicketPriceChartData: getTicketPriceChartData,
		getTeamSearchData: getTeamSearchData
	};
});