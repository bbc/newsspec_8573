define(['lib/news_special/bootstrap'], function (news) {

	var latestError;
	
	return {
		validate: function (currentPage) {

			latestError = '';

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


			function validateSelectTeam() {
				if ((!$('#user-team').data('team')) || ($('#user-team').val() !== $('#user-team').data('team').name)) {
					latestError = 'You haven\'t selected a valid club';
					return false;
				}
				return true;
			}

			function validateSelectTicket() {
				var checkedBox = $('input[name="user-ticket"]:checked').val();

				if (!checkedBox) {
					latestError = 'Choose an option!';
					return false;
				}

				else if(checkedBox === 'season') {
					var seasonTicketPrice = $('#season-ticket-cost').val();
					if (!$.isNumeric(seasonTicketPrice) || seasonTicketPrice<0) {
						latestError = 'Enter a ticket price of £0 or higher!';
						return false;
					}
				}

				else if(checkedBox === 'individual') {
					var ticketPrice = $('#individual-ticket-cost').val();
					if (!$.isNumeric(ticketPrice) || ticketPrice<0) {
						latestError = 'Enter a ticket price of £0 or higher!';
						return false;
					}

					var noGames = $('#user-game-count').val();
					if (!$.isNumeric(noGames) || noGames<=0 || (noGames % 1 !== 0)) {
						latestError = 'Number of games visited must be a whole number higher than 0.';
						return false;
					}
				}

				return true;				
			}

			function validateFoodPrice() {
				var foodPrice = $('#food-price').val();
				if (!$.isNumeric(foodPrice) || foodPrice<0) {
					latestError = 'Enter a food price of £0 or higher!';
					return false;
				}
				return true;
			}

			function validateProgrammesPrice() {
				var programmePrice = $('#programmes-count').val();
				if (!$.isNumeric(programmePrice) || programmePrice<0 || (programmePrice % 1 !== 0)) {
					latestError = 'Programme amount must be a whole number of 0 or more.';
					return false;
				}
				return true;
			}

			function validateKitPrice() {
				var kitPrice = $('#adult-shirt-count').val();
				if (!$.isNumeric(kitPrice) || kitPrice<0 || (kitPrice % 1 !== 0)) {
					latestError = 'Shirt amount must be a whole number of 0 or more.';
					return false;
				}
				return true;
			}

		},
		getError: function () {
			return latestError;
		}
	};

});