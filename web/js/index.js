$(document).ready(function() {
    "use strict";

    // Tabs
    $('.tabs').tabs();

    // Menu Scroll
    $('.scrollable').click(function(event) {
        $('.menu a').removeClass('active');
        $(this).addClass('active');
        var url = $(this).attr('href');
        var location = url.substring(url.indexOf('#'));
        $('html, body').animate({ scrollTop: $(location).offset().top }, 2000);
        event.preventDefault();
    });

    // Register Scroll
    $('.register-now a').click(function(event) {
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 3000);
        event.preventDefault();
    });

    // Parallax effect
    $('.header').parallax("50%", 0.2);

    // Schedule
    $('.event-info p:not(.speaker)').hide();
    $('.event.extend span').html('<i class="fa fa-angle-down"></i>');

    // Extend on click
    $('.event.extend span').click(function(e) {

        var $span = $(this);
        var $event = $span.parent().parent();

        if ($span.html() == '<i class="fa fa-angle-up"></i>') {

            $span.html('<i class="fa fa-angle-down"></i>');
        } else {

            $span.html('<i class="fa fa-angle-up"></i>');
        };

        $event.find('.event-info p:not(.speaker)').toggle();

    });

    // FlexSlider
    $('.testimonials').flexslider({
        animation: 'slide',
        selector: '.slides blockquote',
        controlNav: false,
        directionNav: true,
        slideshowSpeed: 12000,
        animationSpeed: 1200,
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>'
    });

    $('.sponsors .container .slides').flexslider({
        animation: 'slide',
        selector: 'ul li',
        controlNav: false,
        directionNav: true,
        itemWidth: 311,
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>'
    });

    // InView
    var $fadeInDown = $('.menu, .header h1, .header .subtitle, .topics h3, .topics div i, .speakers .single h3');
    var $fadeInLeft = $('.when, .where, .speakers h2, .speakers .featured h3, .schedule h2, .bullets h3, .registration h2, .sponsors h2, .location h2, .maps .images, .maps #map_canvas, .social h2');
    var $fadeInRight = $('.register-now, .speakers .subtitle, .schedule .subtitle, .registration .subtitle, .registration .price, .sponsors .subtitle, .location .subtitle, .location .address, .social .subtitle');

    $fadeInDown.css('opacity', 0);
    $fadeInLeft.css('opacity', 0);
    $fadeInRight.css('opacity', 0);

    // InView - fadeInDown
    $fadeInDown.one('inview', function(event, visible) {
        if (visible) { $(this).addClass('animated fadeInDown'); }
    });

    // InView - fadeInLeft
    $fadeInLeft.one('inview', function(event, visible) {
        if (visible) { $(this).addClass('animated fadeInLeft'); }
    });

    // InView - fadeInRight
    $fadeInRight.one('inview', function(event, visible) {
        if (visible) { $(this).addClass('animated fadeInRight'); }
    });

    // Disabling form
    $('.registration .form form input, .registration .form form button').attr('disabled', 'true');
    $('.registration .form form button').css('cursor', 'default');
    $('.registration .form').css('opacity', 0.8).css('filter', 'blur(1px)').css('-webkit-filter', 'blur(1px)');

    // Map

    var coord = [-16.39, -71.53557];
    var map = L.map('map_canvas').setView(coord, 15);

    L.tileLayer(
        'https://a.tiles.mapbox.com/v4/alculquicondor.lij5ejnh/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYWxjdWxxdWljb25kb3IiLCJhIjoiZDMxZ2JZYyJ9.9Pfq-4MgKnWSSOoj-kDxsg'
    ).addTo(map);

    L.marker(coord).addTo(map);
});
