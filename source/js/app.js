define(['lib/news_special/bootstrap', 'lib/news_special/share_tools/controller', 'page_manager'], function (news, shareTools, PageManager) {

    return {
        init: function (storyPageUrl) {

            news.pubsub.emit('istats', ['app-initiated', 'newsspec-nonuser', true]);

            
            shareTools.init('.shareToolsHolder', {
                storyPageUrl:  storyPageUrl,
                header:       'Share this page',
                message:      'Custom message',
                hashtag:      'BBCNewsGraphics',
                template:     'dropdown'
            });

            news.sendMessageToremoveLoadingImage();

            new PageManager();
        }
    };

});
