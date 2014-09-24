/*
	This module updates the content on the page when the user navigates through the app
*/

define(['lib/news_special/bootstrap'], function (news) {
	
	return {
		update: function (nextPage) {

			var $ = news.$;

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
			}

			function updateBreadcrums(newSelection) {
				$('.tickets-nav').show();

				$('.tickets-nav .tickets-nav--item').each(function (index){
					$(this).removeClass('tickets-nav--item__active');
				});
				$('#' + newSelection).addClass('tickets-nav--item__active');
			}

			function updateSelectTeamContent() {
				$('.team-name--text').hide();
				$('.tickets-nav').hide();
			}

			function updateSelectTicketContent() {
				var userTeamSelect = $('#user-team').get(0);
				var teamText = userTeamSelect.options[userTeamSelect.selectedIndex].text;

				$('.team-name--text').text(teamText);
				$('.team-name--text').show();

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

		}
	};

});