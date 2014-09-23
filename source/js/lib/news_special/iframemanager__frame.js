define(['jquery'], function ($) {
    var hostCommunicator = {
        postMessageAvailable: (window.postMessage ? true : false),
        init: function () {
            var externalHostCommunicator = this;
            this.setHeight();
            this.startWatching();
            if (this.postMessageAvailable) {
                this.setupPostMessage();
            }
            else {
                this.setupIframeBridge();
            }
            $.on('istats', function (actionType, actionName, viewLabel) {
                externalHostCommunicator.setHeight();
                externalHostCommunicator.registerIstatsCall(actionType, actionName, viewLabel);
            });
        },
        height: 0,
        registerIstatsCall: function (actionType, actionName, viewLabel) {
            var istatsData = {
                'actionType': actionType,
                'actionName': actionName,
                'viewLabel':  viewLabel
            };
            if (this.postMessageAvailable) {
                this.sendDataByPostMessage(istatsData);
            }
            else {
                window.istatsQueue.push(istatsData);
            }
        },
        setupPostMessage: function () {
            window.setInterval(this.sendDataByPostMessage, 32);
        },
        sendDataByPostMessage: function (istatsData) {
            var talker_uid = window.location.pathname,
                message = {
                    height:           this.height,
                    hostPageCallback: hostCommunicator.hostPageCallback
                };
            if (istatsData) {
                message.istats = istatsData;
            }
            window.parent.postMessage(talker_uid + '::' + JSON.stringify(message), '*');
        },
        setupIframeBridge: function () {
            window.setInterval(this.sendDataByIframeBridge, 100);
            window.istatsQueue = [];
        },
        sendDataByIframeBridge: function () {
            window.iframeBridge = {
                height:           this.height,
                hostPageCallback: this.hostPageCallback
            };
        },
        startWatching: function () {
            window.setInterval(this.setHeight, 32);
        },
        staticHeight: null,
        setStaticHeight: function (newStaticHeight) {
            this.staticHeight = newStaticHeight;
        },
        setHeight: function () {
            var heightValues = [this.staticHeight || 0];
            if ($('.main').length > 0) {
                heightValues.push($('.main')[0].scrollHeight);
            }
            // return Math.max.apply(Math, [height, document.body.scrollHeight, $('.main').height()]),
            this.height = Math.max.apply(Math, heightValues);
        },
        hostPageCallback: false,
        setHostPageInitialization: function (callback) {
            hostCommunicator.hostPageCallback = callback.toString();
        },
        sendMessageToremoveLoadingImage: function () {
            var message,
                funcToExecute;

            funcToExecute = function () {
                var iframeDivContainer = document.getElementById('bbc-news-visual-journalism-loading-spinner');
                if (iframeDivContainer) {
                    iframeDivContainer.parentNode.removeChild(iframeDivContainer);
                }
            };

            message = {
                'hostPageCallback' : funcToExecute.toString()
            };

            if (this.postMessageAvailable) {
                window.parent.postMessage(window.location.pathname + '::' + JSON.stringify(message), '*');
            }
        }
    };
    return hostCommunicator;
});
