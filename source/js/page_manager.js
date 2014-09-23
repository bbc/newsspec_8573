define(['lib/news_special/bootstrap', 'validation'], function (news, validator) {
	return function () {
		var $ = news.$;
		var currentPage = 'select-team'; // Change this variable to the first page.
		var previousStack = []; // A stack for the previous button, contains previous pages

		switchToPage(currentPage); //Show the first page.

		/*
			Called when the next button is pressed.

			Will validate the page, then show the next page, adding the old page to 
			the previous page stack
		*/
		$('.pagination--next').on('click', function () {
			if (validator.validate(currentPage) === true) {

				var nextPage = getNextPage();
				previousStack.push(currentPage); /* Push old page to stack */
				switchToPage(nextPage);

				$('.pagination--previous').show();

			} else {
				alert(validator.getError());
			}
		});

		/*
			Returns user to the previous page
			
			Sends the user back and removes the old page from the stack.
		*/
		$('.pagination--previous').on('click', function () {
			var previousPage = previousStack.pop();

			switchToPage(previousPage);

			if (previousStack.length <= 0) {
				$('.pagination--previous').hide();
			}
		});


		/*
			Switch from the current page, to the page given.
		*/
		function switchToPage(page) {
			$('.' + currentPage).hide();

			currentPage = page;
			$('.' + page).show();
		}

		/*
			Gets the next question page to be shown.
		*/
		function getNextPage() {
			switch (currentPage) {
			case 'select-team':
				return 'select-ticket';
			case 'select-ticket':
				return getNextPageAfterTicket();
			}
		}

		function getNextPageAfterTicket() {
			//switch ()
		}

	};
});