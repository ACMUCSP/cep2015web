$(document).ready(function() {
    "use strict";

    // Contact Form
    $('.open-contact-form').click(function(e) {
        $('.overlay').fadeIn('fast');

        e.preventDefault();
    });

    $('.close-contact-form').click(function(e) {
        $('.overlay').hide();

        e.preventDefault();
    });

    // Back to Top
    $('a[href=#top]').click(function(event) {
        $("html,body").animate({ scrollTop: 0 }, 1000);
        event.preventDefault();
    });
});
