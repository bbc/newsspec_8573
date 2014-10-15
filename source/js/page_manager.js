define([
	'lib/news_special/bootstrap', 
	'validation', 
	'update_content',
	'process_data',
	'lib/vendors/autocomplete'
], function (news, validator, contentManager, processData, autocompleteLib) {

	return function () {
		var $ = news.$;
		var currentPage = 'select-team'; // Change this variable to the first page.
		var previousStack = []; // A stack for the previous button, contains previous pages

		switchToPage(currentPage); //Show the first page.
		contentManager.update(currentPage);
		initClubSearch();

		/*
			Called when the next button is pressed.

			Will validate the page, then show the next page, adding the old page to 
			the previous page stack
		*/
		function goNext (){
			var errorBox = $('.pagination--error');
			if (validator.validate(currentPage) === true) {

				var nextPage = getNextPage();
				previousStack.push(currentPage); /* Push old page to stack */
				
				errorBox.hide();

				switchToPage(nextPage);

				contentManager.update(nextPage);

				if(nextPage!=='results-page'){
					$('.pagination--button__previous').show();
				}

			} else {
				
				errorBox.fadeOut('100', function(){
					errorBox.text(validator.getError());
					errorBox.fadeIn('100');						
				});
			}
		}



		$('.pagination--button__next').on('click', goNext);

		/*
			Returns user to the previous page
			
			Sends the user back and removes the old page from the stack.
		*/
		$('.pagination--button__previous').on('click', function () {
			var previousPage = previousStack.pop();

			contentManager.update(previousPage);

			switchToPage(previousPage);

			if (previousStack.length <= 0) {
				$('.pagination--button__previous').hide();
			}
		});

		$('input').not('#user-team').on('keypress', function (e){
		    var currentInputElement = $(e.target);
		    var keyCode = (e.keyCode ? e.keyCode : e.which);

		    if(keyCode === 13 || keyCode === 10){
		        //this needs to be checks as passing in the 'submitButton' is optional
		        if (e.data !== undefined) 
		        {
		            if (e.data.handler !== undefined) 
		            {
		                e.data.handler();
		            }
		        }

		        goNext();
		    	currentInputElement.blur();
		    	e.stopImmediatePropagation();
		    	return false;
			}
		});

		/*
			When the restart button is pressed
		*/
		$('.pagination--button__restart').on('click', function () {
			previousStack = [];
			currentPage = 'select-team';

			contentManager.resetAllElms();

			switchToPage(currentPage); //Show the first page.
			contentManager.update(currentPage);
		});


		/*
			Switch from the current page, to the page given.
		*/
		function switchToPage(page) {
			$('.' + currentPage).hide();
			$('.results-page').hide();

			currentPage = page;
			$('.' + page).show();
		}

		/*
			Gets the next question page to be shown.
		*/
		function getNextPage() {
			switch (currentPage) {
				/* Season ticket/indivudal ticket flow */
				case 'select-team':
					return 'select-ticket';
				case 'select-ticket':
					return getNextPageAfterTicket();
				case 'food-price-page':
					return 'programmes-price-page';
				case 'programmes-price-page':
					return 'kit-price-page';
				case 'kit-price-page':
					return 'results-page';
			}
		}

		function getNextPageAfterTicket() {
			switch ($('input[name="user-ticket"]:checked').val()){
				case 'season':
				case 'individual':
					return 'food-price-page';
				case 'none':
					return 'kit-price-page';
			}
		}

		function initClubSearch() {
			$('#user-team').autocomplete({
				lookup: processData.getTeamSearchData(),
				lookupLimit: 5,
				autoSelectFirst: true,
				groupBy: 'league',
				onSelect: function (suggestion) {
					$('#user-team').data('team', suggestion.data.team);
					$('.main').css('padding-bottom', '18px');
				},
				lookupFilter: function (suggestion, originalQuery, queryLowerCase) {
                    if(suggestion.value.toLowerCase().indexOf(queryLowerCase) !== -1){
                    	return true;
                    }
                    return suggestion.data.team.shortName.toLowerCase().indexOf(queryLowerCase) !== -1;
                }
			});
		}

		$('#homeGoalsShare').on('click', function (){
			news.pubsub.emit('istats', ['share-clicked', 'newsspec-interaction', 'price-per-home-goal']);
		});

		$('#totalShare').on('click', function (){
			news.pubsub.emit('istats', ['share-clicked', 'newsspec-interaction', 'total-spend']);
		});

	};
});