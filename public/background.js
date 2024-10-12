chrome.alarms.create("checkMessages", { periodInMinutes: 0.2 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "checkMessages") {
    checkForNewMessages();
  }
});

function checkForNewMessages() {
  fetch('http://localhost:3000/api/messages', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
    },
  })
  .then(response => {
    if (!response.ok) {
      updateBadgeError();
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    if (data && data.messages && Array.isArray(data.messages)) {
      chrome.storage.local.get({messages: []}, (result) => {
        const storedMessages = result.messages ? Object.values(result.messages) : [];

        const newMessages = data.messages.filter(msg => !storedMessages.some(storedMsg => storedMsg.id === msg.id)) || [];


        if (newMessages.length > 0) {
          const updatedMessages = [...storedMessages, ...newMessages];
          chrome.storage.local.set({ messages: updatedMessages });
          updateBadge(updatedMessages);
        }
      });
    } else {
      console.error('Unexpected data format from API');
      updateBadgeError();
    }
  })
  .catch(error => {
    console.error('Error fetching messages:', error);
    updateBadgeError();
  });
}

function updateBadge(messages) {  
  const unreadCount = messages.filter(msg => !msg.read).length;
  chrome.action.setBadgeText({ text: unreadCount > 0 ? unreadCount.toString() : '' });
  chrome.action.setBadgeTextColor({ color: 'white' });
  chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
}


function updateBadgeError() {  
  chrome.action.setBadgeText({ text: "!" });
  chrome.action.setBadgeTextColor({ color: 'white' });
  chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
}

// Initial check
checkForNewMessages();