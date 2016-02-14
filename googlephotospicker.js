(function() {

  var pickerApiLoaded = false;
  var oauthToken;

  var clientId = googlePhotosPickerVars.clientId;
  var developerKey = googlePhotosPickerVars.browserKey;

  // Use the API Loader script to load google.picker and gapi.auth.
  function onApiLoad() {
    gapi.load('auth', {'callback': onAuthApiLoad});
    gapi.load('picker', {'callback': onPickerApiLoad});
  }

  function onAuthApiLoad() {
    window.gapi.auth.authorize(
      {
        'client_id': clientId,
        'scope': ['https://www.googleapis.com/auth/photos'],
        'immediate': false
      },
      handleAuthResult);
  }

  function onPickerApiLoad() {
    pickerApiLoaded = true;
  }

  function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
      oauthToken = authResult.access_token;
    }
  }

  function createPicker(cb) {
    if (pickerApiLoaded && oauthToken) {
      var picker = new google.picker.PickerBuilder().
          enableFeature(google.picker.Feature.MULTISELECT_ENABLED).
          addView(google.picker.ViewId.PHOTOS).
          setOAuthToken(oauthToken).
          setDeveloperKey(developerKey).
          setCallback(cb).
          build();
      picker.setVisible(true);
    }
  }

  // Exports.
  window.openGooglePhotosPicker = createPicker;
  window.onApiLoad = onApiLoad;


  var scriptEl = document.createElement('script');
  scriptEl.setAttribute('src', 'https://apis.google.com/js/api.js?onload=onApiLoad');
  scriptEl.setAttribute('gapi_processed', 'true');
  document.head.appendChild(scriptEl);

}());
