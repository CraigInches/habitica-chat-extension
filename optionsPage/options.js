// Saves options to chrome.storage
function save_options() {
  var uuid = document.getElementById('uuid').value;
  var api = document.getElementById('api').value;
  var enableSound = document.getElementById('enableSound').checked;
  var largeText = document.getElementById('largeText').checked;
  var disableAvatars = document.getElementById('disableAvatars').checked;
  var disableNotifications = document.getElementById('disableNotifications').checked;
  var messageCount = parseInt(document.getElementById('messageCount').value);
  chrome.storage.sync.set({
    uuid: uuid,
    api: api,
    enableSound: enableSound,
    largeText: largeText,
    messageCount: (messageCount > 199 ? 0 : messageCount),
    disableAvatars: disableAvatars,
    disableNotifications: disableNotifications
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.style.display = "block";
    setTimeout(function() {
      status.style.display = "none";
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    uuid: '',
    api: '',
    enableSound: true,
    largeText: false,
    disableAvatars: false,
    messageCount: 200,
    disableNotifications: false
  }, function(items) {
    document.getElementById('uuid').value = items.uuid;
    document.getElementById('api').value = items.api;
    document.getElementById('enableSound').checked = items.enableSound;
    document.getElementById('largeText').checked = items.largeText;
    document.getElementById('disableAvatars').checked = items.disableAvatars;
    document.getElementById('disableNotifications').checked = items.disableNotifications;
    document.getElementById('messageCount').value = (items.messageCount ? items.messageCount : 200);
  });
}

function openSettings() {
	chrome.tabs.create({ url: "https://habitica.com/user/settings/api" });
}

function openGitHub() {
	chrome.tabs.create({ url: "https://github.com/HabitRPG/habitica-chat-extension" });
}

function openWiki() {
	chrome.tabs.create({ url: "https://habitica.wikia.com/wiki/Chrome_Chat_Extension" });
}

function displayManualOptions() {
	document.getElementById('userForm').style.display = "block";
	document.getElementById('manualSetupTrigger').style.display = "none";
}

// Load options
document.addEventListener('DOMContentLoaded', restore_options);
// Display manual settings
document.getElementById('manualSetupTrigger').addEventListener('click', displayManualOptions);
// Link
document.getElementById('hint').addEventListener('click', openSettings);
document.getElementById('gitHub').addEventListener('click', openGitHub);
document.getElementById('wiki').addEventListener('click', openWiki);
// Saving
document.getElementById('largeText').addEventListener('click', save_options);
document.getElementById('disableAvatars').addEventListener('click', save_options);
document.getElementById('enableSound').addEventListener('click', save_options);
document.getElementById('disableNotifications').addEventListener('click', save_options);
document.getElementById('uuid').addEventListener('paste', save_options);
document.getElementById('uuid').addEventListener('keyup', save_options);
document.getElementById('api').addEventListener('paste', save_options);
document.getElementById('api').addEventListener('keyup', save_options);
document.getElementById('messageCount').addEventListener('input', save_options);