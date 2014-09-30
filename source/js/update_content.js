/*
	This module updates the content on the page when the user navigates through the app
*/

define(['jquery', 'calculator'], function ($, calculator) {

	var genericText = 'The average {TEAM_NAME} fan spends £{AMOUNT} supporting them.';

	var statsTexts = [];
	statsTexts['seasonTicket'] = 'The cost of the cheapest season ticket at your club has gone {UP_DOWN} £{AMOUNT} since 2013';
	statsTexts['individualTicket'] = 'The cost of the cheapest matchday ticket at your club has gone {UP_DOWN} £{AMOUNT} since 2011';
	statsTexts['food'] = 'The cost of a tea and a pies at your club has gone {UP_DOWN} £{AMOUNT} since 2011';
	statsTexts['programme'] = 'The cost of a programme at your club has gone {UP_DOWN} £{AMOUNT} since 2011';

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

			/*
				@param text the text to be manipulated. {UP_DOWN} will be replaced
					with the actual value of up or down. {AMOUNT} will be replaced with the
					amount of difference between currentvalue and oldValue
				@param upDown contains the up and down text, split by a /. 
					For example "up/down" or "more/less" are valid params
				@param currentValue the latest value to test
				@param oldValue the older value to (Last years data).
			*/
			function makeStatText(text, upDown, currentValue, oldValue){

				/* If data is missing return null */
				if(currentValue==null || oldValue==null){
					return null;
				}

				/* Find the up and down texts */
				var upDownSplit = upDown.split('/');
				var upText = upDownSplit[0];
				var downText = upDownSplit[1];

				var diff = currentValue - oldValue;

				var upDownValue = (diff>=0) ? upText : downText;
				var amount = Math.abs(diff).toFixed(2);

				text = text.replace('{AMOUNT}', amount);
				text = text.replace('{UP_DOWN}', upDownValue);

				return text;

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

				var userTeam = calculator.getTeam();

				var updateText;

				var upOrDown = (priceDifference>0) ? 'up' : 'down';

				switch ($('input[name="user-ticket"]:checked').val()){
					case 'season':
						$('.ticket-type--text').text('season ticket');
						updateText = makeStatText(statsTexts['seasonTicket'], 'up/down', userTeam['cheapSeason'], userTeam['cheapSeason2013']);
						break;
					case 'individual':
						$('.ticket-type--text').text('indivudal tickets');
						updateText = makeStatText(statsTexts['individualTicket'], 'up/down', userTeam['cheapTicket'], userTeam['cheapestMatchdayTicket2011']);
						break;

				}
				if(updateText!=null){
					$('.ticket-price--text').text(updateText);
					$('.ticket-price--text').show();
				}else{
					$('.ticket-price--text').hide();
				}
			}

			function updateFoodPriceContent(){
				var userTeam = calculator.getTeam();
				updateBreadcrums('tickets-nav--item__food');


				var currentFood = (userTeam['pie']==null||userTeam['tea']==null) ? null : (parseFloat(userTeam['pie']) + parseFloat(userTeam['tea']));
				var oldFood = 5;//userTeam['2011pie'] + userTeam['2011tea'];

				console.log(currentFood);

				var updateText = makeStatText(statsTexts['food'], 'up/down', currentFood, oldFood);
				if(updateText!=null){
					$('.food-price--text').text(updateText);
					$('.food-price--text').show();
				}else{
					$('.food-price--text').hide();
				}
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
					/* Show generic results */
					$('.results-breakdown').hide();

					var parsedText = genericText.replace('{TEAM_NAME}', getSelectedTeamName());
					parsedText = parsedText.replace('{AMOUNT}', 500);

					$('#results-page--summary').text(parsedText);
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