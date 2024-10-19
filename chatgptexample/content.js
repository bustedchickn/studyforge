chrome.storage.local.get(null, (notes) => {
    const url = new URL(window.location.href);
    const siteKey = url.hostname + url.pathname;

    if (notes[siteKey]) {
        alert(`Note for this page:\n${notes[siteKey]}`);
    } else if (notes[url.hostname]) {
        alert(`Note for this site:\n${notes[url.hostname]}`);
    }
});