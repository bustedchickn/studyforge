// Get the current tab's URL
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = new URL(tabs[0].url);
    const siteKey = url.hostname + url.pathname;

    // Load any saved note for the current page
    chrome.storage.local.get([siteKey], (result) => {
        document.getElementById('note').value = result[siteKey] || '';
    });

    // Save note when the user clicks 'Save'
    document.getElementById('save-note').addEventListener('click', () => {
        const note = document.getElementById('note').value;
        chrome.storage.local.set({ [siteKey]: note }, () => {
            document.getElementById('status').innerText = 'Note Saved!';
            setTimeout(() => { document.getElementById('status').innerText = ''; }, 1000);
        });
    });
});