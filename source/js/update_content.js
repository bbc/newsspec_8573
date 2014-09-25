/*
	This module updates the content on the page when the user navigates through the app
*/

define(['jquery', 'calculator'], function ($, calculator) {
	
	var genericText = 'The average {TEAM_NAME} fan spends £{AMOUNT} supporting them.';

	return {
		update: function (nextPage) {

			switch (nextPage) {
				case 'select-team':
					return updateSelectTeamContent();
				case 'select-ticket':
					return updateSelectTicketContent();
				case 'ticket-price-page':
					return updateTicketPriceContent();
				case 'food-price-page':
					return updateFoodPriceContent();
				case 'programmes-price-page':
					return updateProgrammesPriceContent();
				case 'kit-price-page':
					return updateKitPriceContent();
				case 'results-page':
					return updateResultsPageContent();
			}

			/* 
				Returns wether to hide the breadcrums, 
				determined by if the user doesn't buy tickets 
			*/
			function shouldShowBreadcrums() {
				switch ($('input[name="user-ticket"]:checked').val()){
					case 'season':
					case 'individual':
						return true;
					case 'none':
						return false;
				}
			}

			function getSelectedTeamName(){
				var userTeamSelect = $('#user-team').get(0);
				return userTeamSelect.options[userTeamSelect.selectedIndex].text;
			}

			function updateBreadcrums(newSelection) {
				if(shouldShowBreadcrums()){
					$('.tickets-nav').show();

					$('.tickets-nav .tickets-nav--item').each(function (index){
						$(this).removeClass('tickets-nav--item__active');
					});
					$('#' + newSelection).addClass('tickets-nav--item__active');
				} else {
					$('.tickets-nav').hide();
				}
			}

			function updateTeamName(){
				
				var teamText = getSelectedTeamName();

				$('.team-name--text').each(function(){
					$(this).text(teamText);
				});
			}

			function updateSelectTeamContent() {
				$('.team-header').hide();
				$('.tickets-nav').hide();
			}

			function updateSelectTicketContent() {
				updateTeamName();
					
				$('.team-header').show();

				$('.tickets-nav').hide();
			}

			function updateTicketPriceContent(){

				updateBreadcrums('tickets-nav--item__tickets');

				switch ($('input[name="user-ticket"]:checked').val()){
					case 'season':
						$('.ticket-type--text').text('season ticket');
						break;
					case 'individual':
						$('.ticket-type--text').text('indivudal tickets');
						break;
				}
				var priceDifference = Math.floor(Math.random() * 200) -100;
				var upOrDown = (priceDifference>0) ? 'up' : 'down';

				$('.ticket-price--text').text(upOrDown + ' £' + Math.abs(priceDifference) + ' since 2011');
			}

			function updateFoodPriceContent(){

				updateBreadcrums('tickets-nav--item__food');

				var priceDifference = Math.floor(Math.random() * 10) -5;
				var upOrDown = (priceDifference>0) ? 'up' : 'down';

				$('.food-price--text').text(upOrDown + ' £' + Math.abs(priceDifference) + ' since 2011');
			}

			function updateProgrammesPriceContent(){

				updateBreadcrums('tickets-nav--item__programmes');

				var priceDifference = Math.floor(Math.random() * 10) -5;
				var moreOrLess = (priceDifference>0) ? 'more' : 'less';

				$('.programmes-price--text').text('£' + Math.abs(priceDifference) + ' ' + moreOrLess);
			}

			function updateKitPriceContent(){
				updateBreadcrums('tickets-nav--item__kit');
			}

			function updateResultsPageContent(){
				$('.pagination').hide();
				$('.tickets-nav').hide();
				$('.team-header').hide();

				if(calculator.shouldShowBreakDown()){
					showBreakDownResults(calculator.getResultsBreakDown());
				}else{
					$('.results-breakdown').hide();

					var parsedText = genericText.replace('{TEAM_NAME}', getSelectedTeamName());
					parsedText = parsedText.replace('{AMOUNT}', 500);

					$('#results-page--summary').text(parsedText);
					/* Show generic results */
				}
			}

			function showBreakDownResults(resultsBreakdown){
				$('#result-text-total').text(resultsBreakdown.total.toFixed(2));
				$('#result-text-tickets').text('£' + resultsBreakdown.tickets.toFixed(2));
				$('#result-text-food').text('£' + resultsBreakdown.food.toFixed(2));
				$('#result-text-programme').text('£' + resultsBreakdown.programmes.toFixed(2));
				$('#result-text-kit').text('£' + resultsBreakdown.kit.toFixed(2));
			}

		}
	};

});