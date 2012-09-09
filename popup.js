var storage = chrome.storage.local;
var message = document.querySelector('#message');

// Get at the DOM controls used in the sample.
var resetButton = document.querySelector('button.reset');
var applyButton = document.querySelector('button.apply');
var textarea = document.querySelector('textarea');

// Load any terms that may have previously been saved.
loadChanges();

resetButton.addEventListener('click', reset);
applyButton.addEventListener('click', saveChanges);

function saveChanges() {
  // Get the current terms snippet from the form.
  var termsCode = textarea.value;
  // Check that there's some code there.
  if (!termsCode) {
    setMessage('Error: No terms specified');
    return;
  }
  // Save it using the Chrome extension storage API.
  storage.set({'terms': termsCode}, function() {
    // Notify that we saved.
    setMessage('Settings saved');
  });
}

function loadChanges() {
  storage.get('terms', function(items) {
    // To avoid checking items.terms we could specify storage.get({terms: ''}) to
    // return a default value of '' if there is no terms value yet.
    if (items.terms) {
      textarea.value = items.terms;
      setMessage('Loaded saved terms.');
    }
  });
}

function reset() {
  // Remove the saved value from storage. storage.clear would achieve the same
  // thing.
  storage.remove('terms', function(items) {
    setMessage('Stored terms have been reset');
  });
  // Refresh the text area.
  textarea.value = '';
}

function setMessage(msg) {
  var message = document.querySelector('.message');
  message.innerText = msg;
  setTimeout(function() {
    message.innerText = '';
  }, 3000);
}


