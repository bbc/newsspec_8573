/*
	This module is responible for validating the users inputted values.

	The validate method should be fired every time the user attempts to change page.
*/
define(['lib/news_special/bootstrap'], function (news) {

	var latestError;
	
	return {
		validate: function (currentPage) {

			latestError = '';
			/*
				Determine which page we're validating
			*/
			switch (currentPage) {
				case 'select-team':
					return validateSelectTeam();
				case 'select-ticket':
					return validateSelectTicket();
				case 'kit-select-page':
					return validateSelectKit();
				case 'food-price-page':
					return validateFoodPrice();
				case 'programmes-price-page':
					return validateProgrammesPrice();
				case 'kit-price-page':
					return validateKitPrice();
				default:
					return true;
			}

			/*
				Validate the select team page
				@returns {boolean} true if pass, false otherwise

				The error message can be retrieved using getLatestError();
			*/
			function validateSelectTeam() {
				var userTeamVal = $('#user-team');
				if ((!userTeamVal.data('team')) || (userTeamVal.val() !== userTeamVal.data('team').name)) {
					latestError = 'Please select a valid club name';
					return false;
				}
				return true;
			}

			/*
				Validate the select ticket page
				@returns {boolean} true if pass, false otherwise

				The error message can be retrieved using getLatestError();
			*/
			function validateSelectTicket() {
				var checkedBox = $('input[name="user-ticket"]:checked').val();

				if (!checkedBox) {
					latestError = 'Choose an option!';
					return false;
				}

				else if(checkedBox === 'season') {
					var seasonTicketPrice = $('#season-ticket-cost').val();
					if (!$.isNumeric(seasonTicketPrice) || seasonTicketPrice<0) {
						latestError = 'Please enter a ticket price';
						return false;
					}
				}

				else if(checkedBox === 'individual') {
					var ticketPrice = $('#individual-ticket-cost').val();
					if (!$.isNumeric(ticketPrice) || ticketPrice<0) {
						latestError = 'Please enter a ticket price';
						return false;
					}

					var noGames = $('#user-game-count').val();
					if (!$.isNumeric(noGames) || noGames<=0 || (noGames % 1 !== 0)) {
						latestError = 'Please enter a valid number for games attended';
						return false;
					}
				}

				return true;				
			}

			/*
				Validate the food page
				@returns {boolean} true if pass, false otherwise

				The error message can be retrieved using getLatestError();
			*/
			function validateFoodPrice() {
				var foodPrice = $('#food-price').val();
				if (!$.isNumeric(foodPrice) || foodPrice<0) {
					latestError = 'Please enter a valid number';
					return false;
				}
				return true;
			}

			/*
				Validate the programmes page
				@returns {boolean} true if pass, false otherwise

				The error message can be retrieved using getLatestError();
			*/
			function validateProgrammesPrice() {
				var programmePrice = $('#programmes-count').val();
				if (!$.isNumeric(programmePrice) || programmePrice<0 || (programmePrice % 1 !== 0)) {
					latestError = 'Please enter a valid number';
					return false;
				}
				return true;
			}

			/*
				Validate the kit page
				@returns {boolean} true if pass, false otherwise

				The error message can be retrieved using getLatestError();
			*/
			function validateKitPrice() {
				var kitPrice = $('#adult-shirt-count').val();
				if (!$.isNumeric(kitPrice) || kitPrice<0 || (kitPrice % 1 !== 0)) {
					latestError = 'Please enter a valid number';
					return false;
				}
				return true;
			}

		},

		/*
			Get the error message that was last set.

			The error message will be set when we find a problem.
		*/
		getError: function () {
			return latestError;
		}
	};

});