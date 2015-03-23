$(document).ready(function() {
    "use strict";

    // Single Speakers
    $('.single').hover(function() {

        $(this).find('div').slideToggle(150);

    });

    // Tabs
    $('.tabs').tabs();

    // Menu Scroll
    $('.menu a, .scrollable').click(function(event) {
        $('.menu a').removeClass('active');
        $(this).addClass('active');
        var url = $(this).attr('href');
        var location = url.substring(url.indexOf('#'));
        $('html, body').animate({ scrollTop: $(location).offset().top }, 2000);
        event.preventDefault();
    });

    // Program Price select
    var $pricebox = $('.price div');

    $pricebox.click(function(event) {
        $pricebox.removeClass('active');
        $(this).addClass('active');

        $('.registration input[name="program"]').val($(this).find('h4').text() + ' ' + $(this).find('.amount').text());

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
        slideshowSpeed: 3600,
        animationSpeed: 1200,
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>'
    });

    /*
    $('.sponsors .container .slides').flexslider({
        animation: 'slide',
        selector: 'ul li',
        controlNav: false,
        directionNav: true,
        itemWidth: 311,
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>'
    });
    */

    // InView
    var $fadeInDown = $('.menu, .header h1, .header .subtitle, .topics h3, .topics div i, .speakers .single h3');
    var $fadeInLeft = $('.when, .where, .speakers h2, .speakers .featured h3, .schedule h2, .bullets h3, .registration h2, .registration .form, .sponsors h2, .location h2, .maps .images, .maps #map_canvas, .social h2');
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

    // Map

    var coord = [-16.39, -71.53557];
    var map = L.map('map_canvas').setView(coord, 15);

    L.tileLayer(
        'https://api.tiles.mapbox.com/v4/mapbox.comic/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q&update=i7l1q'
    ).addTo(map);

    L.marker(coord).addTo(map);

});
