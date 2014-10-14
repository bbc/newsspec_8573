define(['lib/news_special/bootstrap', 'lib/news_special/share_tools/controller', 'page_manager'], function (news, shareTools, PageManager) {

    return {
        init: function (storyPageUrl) {
            
            shareTools.init('.shareToolsHolder', {
                storyPageUrl:  storyPageUrl,
                header:       'Share this page',
                message:      'Calculate the price you pay supporting your team',
                hashtag:      'PriceofFootball',
                template:     'dropdown'
            });

            news.sendMessageToremoveLoadingImage();

            new PageManager();
        }
    };

});
