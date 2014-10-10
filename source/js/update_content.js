/*
	This module updates the content on the page when the user navigates through the app
*/

define(['jquery', 'calculator', 'bar_chart', 'process_data'], 
function ($, calculator, BarChart, processData) {

	/* The stats text, displayed on each page, as a fact under the inputs */
	var statsTexts = [];
	statsTexts['seasonTicket'] = 'The cost of the cheapest season ticket at your club has gone {UP_DOWN} £{AMOUNT} since 2013';
	statsTexts['individualTicket'] = 'The cost of the cheapest matchday ticket at your club has gone {UP_DOWN} £{AMOUNT} since 2011';
	statsTexts['food'] = 'The cost of a tea and a pies at your club has gone {UP_DOWN} £{AMOUNT} since 2011';
	statsTexts['programme'] = 'The cost of a programme at your club has gone {UP_DOWN} £{AMOUNT} since 2011';
	statsTexts['kit'] = '{TEAM_NAME} kit costs £{AMOUNT} {UP_DOWN} than the average cost for {THE}{LEAGUE_NAME}.';
	statsTexts['ticketCosts'] = 'The cheapest season ticket at {TEAM_NAME} are <strong>{AMOUNT}%</strong> {UP_DOWN} than the average price for {THE}{LEAGUE_NAME}.';

	/* The text used on the share buttons */
	var shareText = [];
	shareText['myTotal'] = 'Every season I spend £{AMOUNT} following {TEAM_NAME}';
	shareText['myGoalCost'] = 'Based on last season\'s results I paid £{AMOUNT} per home goal following {TEAM_NAME}';

	/*	
		Returns the short name of the users team
	*/
	function getSelectedTeamName(){
		var team = calculator.getTeam();
		return team.shortName;
	}

	/*
		Hides the navigation buttons after the selected item. This is called when
		the previous button is pressed to hide the last page
	*/
	function hideProcedingBreadcrums(newSelection){
		switch (newSelection){
			case 'nav-item__team':
				$('.nav-item__team').hide();
			/* falls through */
			case 'nav-item__tickets':
				$('.nav-item__tickets').hide();
			/* falls through */
			case 'nav-item__food':
				$('.nav-item__food').hide();
			/* falls through */
			case 'nav-item__programmes':
				$('.nav-item__programmes').hide();
			/* falls through */
			case 'nav-item__kit':
				$('.nav-item__kit').hide();
			/* falls through */
			case 'nav-item__results':
				$('.nav-item__results').hide();
				break;
		}
	}

	/*
		Update the navigation when the user clicks next or previous
	*/
	function updateBreadcrums(newSelection) {

		hideProcedingBreadcrums(newSelection);

		$('.nav .nav-item').each(function (index){
			$(this).removeClass('nav-item--active');
		});
		var $newSelection = $('.' + newSelection);

		$newSelection.addClass('nav-item--active');
		$newSelection.show();
		
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

	/*
		Updates .team-name--text with the teams short name
		Updates .team-name--text__long with the teams short name

		All elements with the class name will have its text set correctly.
	*/
	function updateTeamName(){
		
		var team = calculator.getTeam();

		$('.team-name--text').each(function(){
			$(this).text(team.shortName);
		});
		$('.team-name--text__long').each(function(){
			$(this).text(team.name);
		});
	}

	/*
		Updates the content of the select team page.
	*/
	function updateSelectTeamContent() {
		/* Padding to allow room for the auto suggest options */
		$('.main').css('padding-bottom', '300px');

		/* Hides crest and header */
		$('.team-crest').hide();
		$('.team-header').hide();
		$('.stats-fact--text').hide();

		updateBreadcrums('nav-item__team');
	}

	/*
		Updates the content of the select ticket page.
	*/
	function updateSelectTicketContent() {
		$('.main').css('padding-bottom', '18px');
		/* Show team crest and header */
		$('.team-crest').show();
		$('.team-header').show();

		updateBreadcrums('nav-item__tickets');
		updateTeamName();
			
		$('.team-header').show();

		updateTicketInputs();

	}

	/*
		Updates the content of the food page.
	*/
	function updateFoodPriceContent(){
		var userTeam = calculator.getTeam();
		updateBreadcrums('nav-item__food');


		var currentFood = (userTeam['pie']==null||userTeam['tea']==null) ? null : (parseFloat(userTeam['pie']) + parseFloat(userTeam['tea']));
		var oldFood = (userTeam['pie2011']==null||userTeam['tea2011']==null) ? null : (parseFloat(userTeam['pie2011']) + parseFloat(userTeam['tea2011']));

		var updateText = makeStatText(statsTexts['food'], currentFood, oldFood, true);

		if(updateText!=null){
			$('.stats-fact--text').text(updateText);
			$('.stats-fact--text').show();
		}else{
			$('.stats-fact--text').hide();
		}
	}

	/*
		Updates the content of the programmes page.
	*/
	function updateProgrammesPriceContent(){
		var userTeam = calculator.getTeam();
		updateBreadcrums('nav-item__programmes');

		var updateText = makeStatText(statsTexts['programme'], userTeam['programme'], userTeam['programme2011'], true);

		if(updateText!=null){
			$('.stats-fact--text').text(updateText);
			$('.stats-fact--text').show();
		}else{
			$('.stats-fact--text').hide();
		}

	}


	/*
		Updates the content of the kit page.
	*/
	function updateKitPriceContent(){
		var userTeam = calculator.getTeam();
		var userLeague = calculator.getLeague();

		updateBreadcrums('nav-item__kit');

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

			$('.stats-fact--text').text(updateText);
			$('.stats-fact--text').show();
		}else{
			$('.stats-fact--text').hide();
		}

	}

	/*
		Updates the content of the results page.

		This function gets the results from the calculator module,
		dislays the results in the breakdown element and displays the graphs
	*/
	function updateResultsPageContent(){
		/* HIDE UNNEEDED THINGS */
		$('.pagination--button').hide();
		$('.stats-fact--text').hide();

		$('.pagination--button__restart').show();

		updateBreadcrums('nav-item__results');

		updateTeamName();

		/* Display ticket price chart */

        var ticketPriceData = processData.getTicketPriceChartData();
        var ppgChartData = processData.getPPGChartData();

        if(ticketPriceData.length > 0){
            var barChart = new BarChart(ticketPriceData, false);
            barChart.draw($('#ticket-price-graph'));	            	
        }else{
        	/* Hide chart because we have no data */
        	$('#ticket-price-graph').hide();
        }


        if(ppgChartData.length > 0){
            var barChartTwo = new BarChart(ppgChartData, true);
            barChartTwo.draw($('#cost-of-goals-graph'));
            $('.goal-price-graph').show();
        }else{
        	/* Hide chart because we have no data */
        	$('.goal-price-graph').hide();
        }

        updateTicketPriceText();

		if(calculator.shouldShowBreakDown()){
			var breakdown = calculator.getResultsBreakDown();
			showBreakDownResults(breakdown);
			updateShareText(breakdown);
		}else{
			/* Show generic results */
			$('.results-breakdown').hide();
			$('.results-page--total').hide();
			$('#breakDownShare').hide();
		}
	}

	/*
		Updates the text shown above the compartive tickets bar chart.
	*/

	function updateTicketPriceText() {
		var userTeam = calculator.getTeam();
		var userLeague = calculator.getLeague();

		var diff = (userTeam['cheapSeason'] / userLeague['avgTicketCost'] * 100) - 100;
		var upDownValue = (diff>=0) ? 'more' : 'less';
		var amount = Math.abs(Math.round(diff));
		var theText = (userLeague.needThe) ? 'the ' : '';

		updateText = statsTexts['ticketCosts'];
		updateText = updateText.replace('{AMOUNT}', Math.round(amount));
		updateText = updateText.replace('{UP_DOWN}', upDownValue);
		updateText = updateText.replace('{TEAM_NAME}', userTeam['name']);

		if(userLeague.isEuropean){
			updateText = updateText.replace('{THE}{LEAGUE_NAME}', 'the other teams in Europe');
		}else{
			updateText = updateText.replace('{THE}', theText);
			updateText = updateText.replace('{LEAGUE_NAME}', userLeague['name']);
		}

		$('#compare-text--tickets').html(updateText);
	}

	/*
		Shows the breakdown of results.
	*/
	function showBreakDownResults(resultsBreakdown){
		$('#result-text-total').text('£' + resultsBreakdown.total.toFixed(2));
		$('#result-text-tickets').text('£' + resultsBreakdown.tickets.toFixed(2));
		$('#result-text-food').text('£' + resultsBreakdown.food.toFixed(2));
		$('#result-text-programme').text('£' + resultsBreakdown.programmes.toFixed(2));
		$('#result-text-kit').text('£' + resultsBreakdown.kit.toFixed(2));
		$('#result-text-home-goal').text('£' + resultsBreakdown.homeGoal.toFixed(2));
	}

	/*
		Sets the share text of both of the buttons to the users text
	*/
	function updateShareText(resultsBreakdown){
		var teamName = calculator.getTeam().shortName;
		var totalText = shareText['myTotal'].replace('{AMOUNT}', resultsBreakdown.total.toFixed(2)).replace('{TEAM_NAME}', teamName);
		var homeGoalText = shareText['myGoalCost'].replace('{AMOUNT}', resultsBreakdown.homeGoal.toFixed(2)).replace('{TEAM_NAME}', teamName);
		
		$('#totalShare').data('shareText', totalText);
		$('#myHomeGoalsShare').data('shareText', homeGoalText);
	}

	/*
		Updates the inputs shown on the select ticket page, when the user selects a different ticket type
		a different set of inputs will be shown
	*/
	function updateTicketInputs(){

		var userTeam = calculator.getTeam();
		var updateText = '';

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

		if(updateText!==''){
			$('.stats-fact--text').text(updateText);
			$('.stats-fact--text').show();
		}else{
			$('.stats-fact--text').hide();
		}

		var checked = $('input[name=user-ticket]:checked', '.select-ticket').val();

		$('.ticket-option').hide();
		$('.ticket-option-' + checked).show();


	}

	$('input[name=user-ticket]').change(
	    function(){
			updateTicketInputs();  
	    }
	);  


	/*
		Results all elements when the user clicks start agian.

		This stops the user from seeing the text that they entered the last time
		they ran the calcualtor.
	*/
	function resetAllElms(){
		$('#user-team').val('');
		$('#user-team').data('team', null);

		$('#ticket_season').prop('checked', true);
		updateTicketInputs();

		$('#season-ticket-cost').val('');
		$('#individual-ticket-cost').val('');
		$('#user-game-count').val('');
		$('#food-price').val('');
		$('#programmes-count').val('');
		$('#adult-shirt-count').val('');

		$('.bar-chart').html('');

		$('.pagination--button').show();
		$('.pagination--button__restart').hide();
		$('.pagination--button__previous').hide();
		try {
	    	window.top.scrollIframeTo(0);
	    }catch(err){
	    	// Probably a XSS error
	    }
	}


	return {
		update: function (nextPage) {
			/*
				Determine which page is being shown next and update the content accordingly
			*/
			switch (nextPage) {
				case 'select-team':
					return updateSelectTeamContent();
				case 'select-ticket':
					return updateSelectTicketContent();
				case 'food-price-page':
					return updateFoodPriceContent();
				case 'programmes-price-page':
					return updateProgrammesPriceContent();
				case 'kit-price-page':
					return updateKitPriceContent();
				case 'results-page':
					return updateResultsPageContent();
			}

		},
		resetAllElms: resetAllElms
	};

});