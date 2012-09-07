var storage = chrome.storage.local;
var message = document.querySelector('#message');

// Get at the DOM controls used in the sample.
var resetButton = document.querySelector('button.reset');
var applyButton = document.querySelector('button.apply');
var textarea = document.querySelector('textarea');

// Load any CSS that may have previously been saved.
loadChanges();

resetButton.addEventListener('click', reset);
applyButton.addEventListener('click', applyChanges);

function saveChanges() {
  // Get the current CSS snippet from the form.
  var cssCode = textarea.value;
  // Check that there's some code there.
  if (!cssCode) {
    setMessage('Error: No CSS specified');
    return;
  }
  // Save it using the Chrome extension storage API.
  storage.set({'css': cssCode}, function() {
    // Notify that we saved.
    setMessage('Settings saved');
  });
}

function loadChanges() {
  storage.get('css', function(items) {
    // To avoid checking items.css we could specify storage.get({css: ''}) to
    // return a default value of '' if there is no css value yet.
    if (items.css) {
      textarea.value = items.css;
      setMessage('Loaded saved CSS.');
    }
  });
}

function reset() {
  // Remove the saved value from storage. storage.clear would achieve the same
  // thing.
  storage.remove('css', function(items) {
    setMessage('Stored terms have been reset');
  });
  // Refresh the text area.
  textarea.value = '';
}

function applyChanges(){
  saveChanges();
  // Check if there is CSS specified.
  storage.get('css', function(items) {
    console.log(items);
    // If there is CSS specified, inject it into the page.
    if (items.css) {
      chrome.tabs.insertCSS(null, {code: items.css}, function() {
        if (chrome.extension.lastError) {
          message.innerText = 'Not allowed to inject CSS into special page.';
        } else {
          message.innerText = 'Injected style!';
        }
      });
    } 
  });

}

function setMessage(msg) {
  var message = document.querySelector('.message');
  message.innerText = msg;
  setTimeout(function() {
    message.innerText = '';
  }, 3000);
}
