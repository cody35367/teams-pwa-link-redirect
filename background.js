chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: [
      {
        id: 1,
        action: {
          type: "redirect",
          redirect: {
            regexSubstitution: "ftl\\2",
          },
        },
        condition: { 
          regexFilter: "^(http)(s?://.*)",
          resourceTypes: ["main_frame"],
          excludedRequestDomains: [
            "teams.microsoft.com",
            "login.microsoftonline.com",
            "outlook.office.com",
            "teams.microsoft.us",
            "gov.teams.microsoft.us",
            "login.microsoftonline.us",
            "outlook.office365.us",
            "extensions.gnome.org"
          ],
        },
      },
    ],
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Define the URL that should trigger closing the tab
  const targetUrls = ["statics.gov.teams.microsoft.us/evergreen-assets/safelinks"]; // Change this to the URL you want to match
  const tabUrlLower = (tab.url) ? tab.url.toLowerCase(): "";
  // Check if the tab has finished loading and if the URL matches the target
  if (changeInfo.status === "complete" && tab.url && targetUrls.some(targetUrl => tabUrlLower.includes(targetUrl.toLowerCase()))) {
    setTimeout(function() {
      chrome.tabs.remove(tabId);
    }, 1000);
  }
});

// The Polling Loop (Catch-all)
// This runs every 2 seconds to find any tabs we missed
setInterval(() => {
  chrome.tabs.query({}, (tabs) => {
    for (const tab of tabs) {
      if (tab.url === "" && tab.status === 'complete') { // This will clean up all extra about:blanks
        chrome.tabs.remove(tab.id);
      }
    }
  });
}, 5000); // Check every 5 seconds
