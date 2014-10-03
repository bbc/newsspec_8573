define(['lib/news_special/bootstrap', 'lib/news_special/share_tools/controller', 'page_manager', 'bar_chart'], function (news, shareTools, PageManager, BarChart) {

    return {
        init: function (storyPageUrl) {

            news.pubsub.emit('istats', ['app-initiated', 'newsspec-nonuser', true]);

            
            shareTools.init('.shareToolsHolder', {
                storyPageUrl:  storyPageUrl,
                header:       'Share this page',
                message:      'Custom message',
                hashtag:      'BBCNewsGraphics',
                template:     'default'
            });

            news.sendMessageToremoveLoadingImage();

            new PageManager();

            var testArray = [];
            testArray.push({label: 'Man United', value: '1200', selected: true});
            testArray.push({label: 'Man City', value: '1100'});
            testArray.push({label: 'Chelsea', value: '800'});
            testArray.push({label: 'Arsenal', value: '1600'});
            testArray.push({label: 'Liverpool', value: '10'});

            var testArray2 = [];
            testArray2.push({label: 'Man United', value: '32.20', selected: true});
            testArray2.push({label: 'Man City', value: '6.40'});
            testArray2.push({label: 'Chelsea', value: '16.10'});
            testArray2.push({label: 'Arsenal', value: '5.40'});
            testArray2.push({label: 'Liverpool', value: '4.20'});

            var barChart = new BarChart(testArray, false);
            barChart.draw($('#barChartOne'));

            var barChart2 = new BarChart(testArray2, true);
            barChart2.draw($('#barChartTwo'));
        }
    };

});
