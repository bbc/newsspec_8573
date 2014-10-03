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
	statsTexts['kit'] = '{TEAM_NAME} kit costs £{AMOUNT} {UP_DOWN} than the average cost for {THE}{LEAGUE_NAME}.';

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
				@param pence wether or not to show the pence value
			*/
			function makeStatText(text, currentValue, oldValue, pence){

				/* If data is missing return null */
				if(currentValue==null || oldValue==null){
					return null;
				}

				var diff = currentValue - oldValue;

				var upDownValue = (diff>=0) ? 'up' : 'down';
				var amount = (pence) ? Math.abs(diff).toFixed(2) :  Math.round(Math.abs(diff));

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
						updateText = makeStatText(statsTexts['seasonTicket'], userTeam['cheapSeason'], userTeam['cheapSeason2013'], false);
						break;
					case 'individual':
						$('.ticket-type--text').text('indivudal tickets');
						updateText = makeStatText(statsTexts['individualTicket'], userTeam['cheapTicket'], userTeam['cheapestMatchdayTicket2011'], false);
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
				var oldFood = (userTeam['pie2011']==null||userTeam['tea2011']==null) ? null : (parseFloat(userTeam['pie2011']) + parseFloat(userTeam['tea2011']));

				var updateText = makeStatText(statsTexts['food'], currentFood, oldFood, true);

				if(updateText!=null){
					$('.food-price--text').text(updateText);
					$('.food-price--text').show();
				}else{
					$('.food-price--text').hide();
				}
			}

			function updateProgrammesPriceContent(){
				var userTeam = calculator.getTeam();
				updateBreadcrums('tickets-nav--item__programmes');

				var updateText = makeStatText(statsTexts['programme'], userTeam['programme'], userTeam['programme2011'], true);

				if(updateText!=null){
					$('.programmes-price--text').text(updateText);
					$('.programmes-price--text').show();
				}else{
					$('.programmes-price--text').hide();
				}

			}

			function updateKitPriceContent(){
				var userTeam = calculator.getTeam();
				var userLeague = calculator.getLeague();

				updateBreadcrums('tickets-nav--item__kit');

				if(userTeam['adultShirt'] !== null && userLeague['avgKitCost'] !== null){
					var diff = userTeam['adultShirt'] - userLeague['avgKitCost'];

					var upDownValue = (diff>=0) ? 'more' : 'less';
					var amount = Math.abs(Math.round(diff));
					var theText = (userLeague.needThe) ? 'the ' : '';

					updateText = statsTexts['kit'];
					updateText = updateText.replace('{AMOUNT}', amount);
					updateText = updateText.replace('{UP_DOWN}', upDownValue);
					updateText = updateText.replace('{THE}', theText);
					updateText = updateText.replace('{TEAM_NAME}', userTeam['name']);
					updateText = updateText.replace('{LEAGUE_NAME}', userLeague['name']);

					$('.kit-price--text').text(updateText);
					$('.kit-price--text').show();
				}else{
					$('.kit-price--text').hide();
				}

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