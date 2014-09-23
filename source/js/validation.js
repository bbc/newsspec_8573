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
			}


			function validateSelectTeam() {
				if ($('#user-team').val() === 0) {
					latestError = 'You never selected a team';
					return false;
				}
				return true;
			}

			function validateSelectTicket() {
				if (!$('input[name='user-ticket']:checked').val()) {
					latestError = 'You haven\'t selected a ticket type';
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