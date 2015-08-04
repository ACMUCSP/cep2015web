$(document).ready(function() {
  "use strict";

  // Contact Form
  var request;

  $('.contact-form form').submit(function(event) {

    var $name = $(this).find('input[name="form[name]"]');
    var $email = $(this).find('input[name="form[email]"]');
    var $message = $(this).find('textarea');

    $('.contact-form p.error').show();
    $('input[name="form[name]"], input[name="form[email]"], textarea').removeClass('error');

    if ($name.val() == '') {
      $('.contact-form p.error').addClass('active').html('<i class="fa fa-exclamation-triangle"></i> Please enter your name.');
      $name.addClass('error').focus();
      return false;
    }

    function IsEmail(email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
    }

    if ($email.val() == '') {
      $('p.error').addClass('active').html('<i class="fa fa-exclamation-triangle"></i> Please enter your email.');
      $email.addClass('error').focus();
      return false;
    }

    if(!IsEmail($email.val())) {
      $('.contact-form p.error').addClass('active').html('<i class="fa fa-exclamation-triangle"></i> Looks like that email address is not correct. Try again.');
      $email.addClass('error').focus();
      return false;
    }

    if ($message.val() == "") {
      $('.contact-form p.error').addClass('active').html('<i class="fa fa-exclamation-triangle"></i> Please enter your message.');
      $message.addClass('error').focus();
      return false;
    }

    if (request) {
      request.abort();
    }

    var $form = $(this);
    var $inputs = $form.find('input, button, textarea');
    var serializedData = $form.serialize();

    $inputs.prop('disabled', true);

    request = $.ajax({
      url: $(this).attr('action'),
      type: 'post',
      data: serializedData
    });

    request.done(function (response, textStatus, jqXHR){
      $('.contact-form p.error').hide();
      $('.contact-form p.message').html('¡Mensaje enviado! Estaremos en contacto pronto.').fadeOut(5000);
    });

    request.fail(function (jqXHR, textStatus, errorThrown){
      console.error(
        'The following error occured: '+
        textStatus, errorThrown
      );
    });

    request.always(function () {
      $inputs.prop('disabled', false);
    });

    event.preventDefault();

  });

});
