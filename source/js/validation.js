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
				case 'ticket-price-page':
					return validateTicketPrice();
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
				if (!$('input[name="user-ticket"]:checked').val()) {
					latestError = 'Select a ticket type!';
					return false;
				}
				return true;
			}

			function validateSelectKit() {
				if (!$('input[name="buys-kit"]:checked').val()) {
					latestError = 'Choose an option!';
					return false;
				}
				return true;
			}

			function validateTicketPrice() {
				var ticketPrice = $('#ticket-price').val();
				if (!$.isNumeric(ticketPrice) || ticketPrice<0) {
					latestError = 'Enter a ticket price of £0 or higher!';
					return false;
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
				var programmePrice = $('#programmes-price').val();
				if (!$.isNumeric(programmePrice) || programmePrice<0) {
					latestError = 'Enter a programme price of £0 or higher!';
					return false;
				}
				return true;
			}

			function validateKitPrice() {
				var kirPrice = $('#kit-price').val();
				if (!$.isNumeric(kirPrice) || kirPrice<0) {
					latestError = 'Enter a kit price of £0 or higher!';
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