var url_pattern = /news.ycombinator.com/;
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (url_pattern.test(tab.url)) {
        if (changeInfo.status === 'complete') { // Or 'loading'
            chrome.tabs.executeScript(tabId, {'file':'main.js'});
            //chrome.pageAction.show(tabId);
        }
    } 
});
