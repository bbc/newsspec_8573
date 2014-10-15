define(['lib/news_special/bootstrap', 'lib/news_special/share_tools/controller', 'page_manager'], function (news, shareTools, PageManager) {

    return {
        init: function (storyPageUrl) {
            
            shareTools.init('.shareToolsHolder', {
                storyPageUrl:  storyPageUrl,
                header:       'Share this page',
                message:      'Calculate the price you pay supporting your team',
                hashtag:      'PriceofFootball',
                image:        staticDomainPath + '/img/branding.png',
                template:     'dropdown'
            });

            $('.main').show();

            news.sendMessageToremoveLoadingImage();

            new PageManager();
        }
    };

});
