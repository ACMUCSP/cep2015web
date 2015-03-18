$(function () {
  $("#sponsorinvite a").click(function() {
    $("#contacto input[name='form[name]']").focus();
  });
});

$('.move').click(function() {
    var elementClicked = $(this).attr("href"), dst = elementClicked.match(/#.+/);
    if (dst) {
      var destination = $(dst[0]).offset().top;
      $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination-15}, 400 );
      return false;
    }
    return true;
});

$('#capimg').mouseenter(function() {
  $(this).find('img').toggle();
});

$('#capimg').click(function() {
  $('#gallery-link')[0].click();
});
