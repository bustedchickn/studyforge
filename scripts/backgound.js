// background.js - handles initialization
chrome.runtime.onInstalled.addListener(() => {
    // Initialize your storage or other services
    chrome.storage.local.set({ initialized: true }, () => {
        console.log('Storage initialized');
    });
});