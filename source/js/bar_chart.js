define([
	'jquery'
], function ($) {

	/*
		Generates a bar chart from the dataArray provided, the array should 
		contains objects in this format  {label: 'Man Utd', value: '1200'}

		isDecending decideds wether to display the results in descending or
		ascending order.
	*/
	var BarChart = function (dataArray, isAscending){
		this.dataArray = dataArray;
		this.isAscending = isAscending;
	};

	/*
		Draws the BarChart from the data provided
	*/
	BarChart.prototype.draw = function($element){
		var that = this;
		that.$element = $element;

		/*
			Sorts the array according to the isAscending value
		*/
		var sortDataArray = function () {
			that.dataArray.sort(function(a,b) {
			    return (that.isAscending) ? (parseFloat(a.value) - parseFloat(b.value)) : (parseFloat(b.value) - parseFloat(a.value));
			});
		};

		/*
			Adds all the row elements to the container
		*/
		var appendHtmlToElm = function () {

			/* Gets the largest piece of data from the array */
			var maxData = (that.isAscending) ? that.dataArray[that.dataArray.length - 1] : that.dataArray[0];
			var maxValue = maxData.value; // User to calulate the pertcentages for each bar
			$.each(that.dataArray, function (key, data) {
				var percent = Math.round(parseFloat(data.value)/parseFloat(maxData.value)*100);

				var barChartRow = $('<div class="bar-chart--row"></div>');

				var nameSelected = (data.selected) ? ' row-name__selected' : '';
				var barSelected = (data.selected) ? ' row-bar__selected' : '';
				var valueSelected = (data.selected) ? ' row-value__selected' : '';

				barChartRow.append($('<span class="row-name' + nameSelected + '">' + data.label + '</span>'));
				barChartRow.append($('<div class="row-bar' + barSelected + '" data-percentage="' + percent + '"></div>'));
				barChartRow.append($('<div class="row-value' + valueSelected + '">£' + data.value + '</div>'));

				that.$element.append(barChartRow);

			});

			
		};

		/*
			Finds the maxiumum width in pixels of all elements with a given class,
			this is used to find size of the team name and value text, so we can
			draw the chart to the correct size
		*/
		var findMaxWidthByClass = function (className) {
			var currentMax = 0;
			$('.' + className).each(function(){
				var elmWidth = $(this).width();
				if(elmWidth>currentMax){
					currentMax = elmWidth;
				}
			});
			return currentMax + 5;
		};

		/*
			Takes the max width for the chart name and value spans
			and makes every element that width and turn them into a block.

			Allowing the chart to look nice!
		*/
		var setChartTextWidth = function () {
			$('.row-name').each(function () {
				$(this).css('display', 'block');
				$(this).css('width', that.rowNameWidth);
			});

			$('.row-value').each(function () {
				$(this).css('display', 'block');
				$(this).css('width', that.rowValueWidth);
			});
		};

		/*	
			Set the width of the bars to the correct calcualted size. 
			(100% for highest value and everything else is propotional to its value)
		*/
		var setBarWidths = function () {
			var oneLineWidths = parseInt($('.row-name').css('margin-right'), 10) + that.rowNameWidth;

			var marginsValue =  parseInt($('.row-value').css('margin-left'), 10);
			var maxBarWidth = $('.bar-chart--row').width() - that.rowValueWidth - marginsValue;

			/* If on desktop site, allow for row-name to be on the same line.  */
			if($('.row-name').css('text-align')==='right'){
				maxBarWidth -= oneLineWidths;
			}

			$('.row-bar').each(function () {
				$(this).width(parseFloat($(this).data('percentage') / 100 * maxBarWidth));
			});
		};


		/* Lets build this graph! */

		sortDataArray();
		that.$element.html(''); // Emtpy the element
		appendHtmlToElm();

		that.rowNameWidth = findMaxWidthByClass('row-name');
		that.rowValueWidth = findMaxWidthByClass('row-value');

		setChartTextWidth();
		setBarWidths();

		/* Redraw on window resize */
		$(window).resize(function () {
			setBarWidths();
		});

	};

	return BarChart;



});