var editor = ace.edit("editor");
editor.setOptions({
    minLines: 23,
    maxLines: 23,
    mode: 'ace/mode/c_cpp',
    theme: 'ace/theme/tomorrow_night'
});
var changed = false;

$('#runbtn').click(function() {
    $.ajax({
        type : 'POST',
        url: $(location).attr('href'),
        data: {
            'code' : editor.getValue(),
            'input' : $('#input_ta').val()
        },
        beforeSend: function () {
            $('#loader').show();
        },
        complete: function () {
            $('#loader').hide();
        },
        success: function (data) {
            $('#output_ta').val(data.output);
            if (data.compiler_msg) {
                $('#comp_msg_ta').val(data.compiler_msg);
                $('#comp_msg').show();
                $('#comp_msg_ta').focus();
            } else {
                $('#comp_msg').hide();
                $('#output_ta').focus();
            }
            if (data.success) {
                var stats = '<strong>Tiempo:</strong> ' + data.stats[0]
                    + '&emsp;<strong>Memoria:</strong> ' + data.stats[1].toFixed(2) + 'MB';
                $('#stats').html(stats);
                $('#output_ta').removeClass('text-error');
            } else {
                $('#output_ta').addClass('text-error');
                $('#stats').html('');
            }
        },
        dataType: 'json'
    });
    return false;
});

var fullscreen = false;

$('#fullbtn').click(function() {
    if (fullscreen) {
        fullscreen = false;
        $('header').show();
        $('footer').show();
        $('h2').show();
        $('#top-margin').show();
        $('#ed-cont p').show();
        $('#ed-cont').removeClass("wide");
        editor.setOptions({
            minLines: 23,
            maxLines: 23});
        $('#ed-wrapper').css('width', '100%');
        $('#box-wrapper').css('width', '100%');
        $('#box-wrapper').css('padding-left', '0px');
    }
    else {
        fullscreen = true;
        $('header').hide();
        $('footer').hide();
        $('h2').hide();
        $('#top-margin').hide();
        $('#ed-cont p').hide();
        $('#ed-cont').addClass("wide");
        editor.setOptions({
            minLines: 37,
            maxLines: 37});
        $('#ed-wrapper').css('width', '60%');
        $('#box-wrapper').css('width', '40%');
        $('#box-wrapper').css('padding-left', '15px');
    }
});

var codefn = 'code.cpp';
var MIME_TYPE = 'text/x-c++src';
var bb_url = null;

function genCodeUrl() {
    if (bb_url)
        (window.URL || window.webkitURL).revokeObjectURL(bb_url);
    var bb = new Blob([editor.getValue()], {type: MIME_TYPE + ';charset=UTF-8'});
    bb_url = window.URL.createObjectURL(bb);
    return bb_url;
}

$('#savebtn').click(function() {
    var a = document.createElement('a');
    a.download = codefn;
    a.href = genCodeUrl();
    a.dataset.downloadurl = [MIME_TYPE, a.download, a.href].join(':');
    a.click();
    wasSaved();
    return false;
});

$('#openbtn').click(function() {
    if (!changed || confirm('No ha guardado los cambios. ¿Desea continuar?')) {
        document.getElementById('upfile').click();
    }
});

var defcode = "#include <iostream>\n\nusing namespace std;\n\nint main() {\n\tcout << \"Hola Mundo\" << endl;\n\treturn 0;\n}";

$('#newbtn').click(function() {
    if (!changed || confirm('No ha guardado los cambios. ¿Desea continuar?')) {
        editor.setValue(defcode);
        editor.gotoLine(0);
        codefn = 'code.cpp';
        driveFileId = null;
        wasSaved();
    }
});

function handleFileSelect(evt) {
    var file = evt.target.files[0];
    if (!file)
        return;
    if (file.type.match('text.*')) {
        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                editor.setValue(e.target.result);
                editor.gotoLine(0);
                codefn = theFile.name;
                driveFileId = null;
            };
        })(file);
        reader.readAsText(file);
        wasSaved();
    } else {
        alert('El archivo seleccionado no es válido.');
    }
}

function unloadMsg() {
    return 'No ha guardado los cambios';
}

function wasSaved() {
    changed = false;
    $(window).unbind('beforeunload', unloadMsg);
}

document.getElementById('upfile').addEventListener('change', handleFileSelect, false);
editor.on('change', function() {
    if (!changed) {
        changed = true;
        $(window).bind('beforeunload', unloadMsg);
        unloadBinded = true;
    }
});

