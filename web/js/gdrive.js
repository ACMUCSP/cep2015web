var developerKey = 'AIzaSyDLtjWB1-AThlKjLoHoopx0EebqMjlvSVw';
var clientId = '947605210532-5m7jn6k51cvsdl39le5oj9q7bm8n5h4j.apps.googleusercontent.com';
var scope = ['https://www.googleapis.com/auth/drive.file'];
var pickerApiLoaded = false;
var oauthToken;

function onApiLoad() {
  gapi.load('auth', {'callback': onAuthApiLoad});
  gapi.load('picker', {'callback': function() {
    pickerApiLoaded = true;
  }});
}

function handleClientLoad() {
  gapi.client.setApiKey(developerKey);
}

function onAuthApiLoad() {
  window.gapi.auth.authorize({
    'client_id': clientId,
    'scope': scope,
    'inmediate': false
  }, handleAuthResult);
}

function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    oauthToken = authResult.access_token;
    $('#act-drive').hide();
    $('#drive-bar').show();
  }
}

function createPicker() {
  if (!changed || confirm('No ha guardado los cambios. ¿Desea continuar?')) {
    if (pickerApiLoaded && oauthToken) {
      var view = new google.picker.DocsView();
      view.setMimeTypes('text/plain,text/x-c++src,text/x-csrc,application/vnd.google-apps.folder');
      view.setMode(google.picker.DocsViewMode.LIST);
      var picker = new google.picker.PickerBuilder()
        .setLocale('es')
        .addView(view)
        .setOAuthToken(oauthToken)
        .setDeveloperKey(developerKey)
        .setCallback(pickerCallback)
        .enableFeature(google.picker.Feature.NAV_HIDDEN)
        .build();
      picker.setVisible(true);
    }
  }
}

var driveFileId;

function pickerCallback(data) {
  if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
    $('#driveloader').show();
    var doc = data[google.picker.Response.DOCUMENTS][0];
    driveFileId = doc.id;
    codefn = doc.name;
    gapi.client.load('drive', 'v2', function() {
      var request = gapi.client.drive.files.get({ 'fileId': doc.id });
      request.execute(function(resp) {
        loadDriveFile(resp.downloadUrl);
      });
    });
  }
}

function loadDriveFile(downUrl) {
  $.ajax({
    url: downUrl,
    headers: { Authorization: 'Bearer ' + oauthToken },
    fileType: 'text',
    complete: function () {
      $('#driveloader').hide();
    },
    success: function(data) {
      editor.setValue(data);
      editor.gotoLine(0);
      wasSaved();
    }
  });
}

function saveDriveFile() {
  if (driveFileId) {
    $.ajax({
      type: 'PUT',
      url: 'https://www.googleapis.com/upload/drive/v2/files/' + driveFileId,
      headers: {
        Authorization: 'Bearer ' + oauthToken,
        'Content-Type': MIME_TYPE + ';charset=UTF-8',
      },
      data: editor.getValue(),
      beforeSend: function () {
        $('#driveloader').show();
      },
      complete: function () {
        $('#driveloader').hide();
      },
      success: function(doc) {
        if (doc.id) {
          wasSaved();
        } else {
          alert('Un error ocurrió al intentar guardar el archivo');
        }
      }
    });
  } else {
    var fn = prompt("Nombre de archivo: ", codefn);
    if (fn) {
      uploadDriveFile(fn);
    }
  }
}

function uploadDriveFile(fn) {
  codefn = fn;
  const boundary = 'X314159265358979323846X';
  const delimiter = "\r\n--" + boundary + "\r\n";
  const close_delim = "\r\n--" + boundary + "--";
  var metadata = {
    'title' : codefn,
    'mimeType' : MIME_TYPE,
  }
  var requestBody = delimiter +
    'Content-Type: application/json\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter + 'Content-Type: ' + MIME_TYPE + ';charset=UTF-8' + '\r\n\r\n' +
    editor.getValue() + close_delim;
  $.ajax({
    type: 'POST',
    url: 'https://www.googleapis.com/upload/drive/v2/files/?uploadType=multipart',
    headers: {
      Authorization: 'Bearer ' + oauthToken,
    'Content-Type': 'multipart/mixed; boundary="' + boundary + '"',
    },
    data: requestBody,
    beforeSend: function () {
      $('#driveloader').show();
    },
    complete: function () {
      $('#driveloader').hide();
    },
    success: function(doc) {
      driveFileId = doc.id;
      if (driveFileId) {
        wasSaved();
      } else {
        alert('Un error ocurrió al intentar guardar el archivo');
      }
    },
  });

}

$('#act-drive button').click(onApiLoad);
$('#opendrivebtn').click(createPicker);
$('#savedrivebtn').click(saveDriveFile);

