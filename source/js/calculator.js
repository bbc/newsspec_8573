define([
	'jquery', 
	'data/teams', 
	'data/leagues'
], function ($, teams, leagues) {
	return {

		/* Wether to show a breakdown of results or just a generic result */
		shouldShowBreakDown: function () {
			return true;
		},

		getResultsBreakDown: function () {
			
			var justKit = isJustKit();
			var league = this.getLeague();
			var team = this.getTeam();

			var resultsBreakDown = {};

			resultsBreakDown.tickets = getTicketCosts();
			resultsBreakDown.food = getFoodCost();
			resultsBreakDown.programmes = getProgrammeCost();
			resultsBreakDown.kit = getKitCost();
			resultsBreakDown.total = getTotal();
			resultsBreakDown.homeGoal = (league.homeGames > 0) ? (getTotal() / league.homeGames) : 0 ;

			/* Returns true or false if the user only buys kit and nothing else */
			function isJustKit() {
				return (getTicketType()==='none');
			}

			function getTicketType(){
				return $('input[name="user-ticket"]:checked').val();
			}

			function getGamesAttended() {
				switch(getTicketType()) {
					case 'season':
						return league.homeGames;
					case 'individual':
						return parseInt($('#user-game-count').val(), 10);
					default:
						return 0;
				}
			}

			function getTicketCosts() {
				var ticketType = getTicketType();
				if(ticketType==='season'){
					return parseFloat($('#season-ticket-cost').val());
				}else if (ticketType==='individual'){
					return parseFloat($('#individual-ticket-cost').val()) * getGamesAttended();
				}else{
					return 0;
				}
			}

			function getFoodCost() {
				if(!justKit){
					return ($('#food-price').val() * getGamesAttended());
				}else{
					return 0;
				}
			}

			function getProgrammeCost() {
				if(!justKit){
					var programmeCost = (team.programme) ? parseFloat(team.programme) : 0;
					return (programmeCost * parseInt($('#programmes-count').val(), 10));
				}else{
					return 0;
				}
			}

			function getKitCost() {
				var shirtCost = (team.adultShirt) ? parseFloat(team.adultShirt) : 0;
				return (shirtCost * parseInt($('#adult-shirt-count').val(), 10));
			}

			function getTotal() {
				/* Calculate total */
				var returnTotal = 0;
				returnTotal += resultsBreakDown.tickets;
				returnTotal += resultsBreakDown.food;
				returnTotal += resultsBreakDown.programmes;
				returnTotal += resultsBreakDown.kit;

				return returnTotal;
			}
			
			return resultsBreakDown;

		},

		getTeam: function() {
			return $('#user-team').data('team');
		},

		getLeague: function() {
			var team = this.getTeam();
			return leagues[team.prettyLeague];
		}
	};
});