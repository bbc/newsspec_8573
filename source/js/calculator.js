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

		/*
			Returns the breakdown costs from the user entered information
		*/
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

			/*
				Gets which ticket type the user has selected
			*/
			function getTicketType(){
				return $('input[name="user-ticket"]:checked').val();
			}

			/*
				Returns the number of games the user will have attended.

				If user has season ticket:
					= number of games in a season
				If user goes to individual games
					= number of games they've entereed
				else
					= 0
			*/
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

			/*
				Gets the price the user pays for all there tickets
			*/
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

			/*
				Gets the amount the user spends on food
			*/
			function getFoodCost() {
				if(!justKit){
					return ($('#food-price').val() * getGamesAttended());
				}else{
					return 0;
				}
			}

			/*
				The amount the user spends on programmes
			*/
			function getProgrammeCost() {
				if(!justKit){
					var programmeCost = (team.programme) ? parseFloat(team.programme) : 0;
					return (programmeCost * parseInt($('#programmes-count').val(), 10));
				}else{
					return 0;
				}
			}

			/*
				Amount the user spends on kit
			*/
			function getKitCost() {
				var shirtCost = (team.adultShirt) ? parseFloat(team.adultShirt) : 0;
				return (shirtCost * parseInt($('#adult-shirt-count').val(), 10));
			}

			/*
				Total everything up!
			*/
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

		/*
			Returns the users selected team object.
		*/
		getTeam: function() {
			return $('#user-team').data('team');
		},
		/*
			Returns the users selected league object.
		*/
		getLeague: function() {
			var team = this.getTeam();
			return leagues[team.prettyLeague];
		}
	};
});