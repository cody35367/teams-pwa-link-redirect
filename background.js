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
            "outlook.office365.us"
          ],
        },
      },
    ],
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Define the URL that should trigger closing the tab
  const targetUrl = "https://statics.gov.teams.microsoft.us/evergreen-assets/safelinks/2/atp-safelinks.html"; // Change this to the URL you want to match

  // Check if the tab has finished loading and if the URL matches the target
  if (changeInfo.status === "complete" && tab.url === targetUrl) {

    setTimeout(function() {
      chrome.tabs.remove(tabId);
    }, 1000);
  }
});
