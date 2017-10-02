jQuery(document).ready(function () {
    "use strict";
    /*** =====================================
    * Mega Menu
    * =====================================***/
    (function($) {
	    $.fn.menumaker = function(options) {
	        var cssmenu = $(this),
	            settings = $.extend({
	                format: "dropdown",
	                sticky: false
	            }, options);
	        return this.each(function() {
	            $(this).find(".button").on('click', function() {
	                $(this).toggleClass('menu-opened');
	                var mainmenu = $(this).next('ul');
	                if (mainmenu.hasClass('open')) {
	                    mainmenu.slideToggle().removeClass('open');
	                } else {
	                    mainmenu.slideToggle().addClass('open');
	                    if (settings.format === "dropdown") {
	                        mainmenu.find('ul').show();
	                    }
	                }
	            });
	            cssmenu.find('li ul').parent().addClass('has-sub');
	            var multiTg;
	            multiTg = function() {
	                cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
	                cssmenu.find('.submenu-button').on('click', function() {
	                    $(this).toggleClass('submenu-opened');
	                    if ($(this).siblings('ul').hasClass('open')) {
	                        $(this).siblings('ul').removeClass('open').slideToggle();
	                    } else {
	                        $(this).siblings('ul').addClass('open').slideToggle();
	                    }
	                });
	            };
	            if (settings.format === 'multitoggle') multiTg();
	            else cssmenu.addClass('dropdown');
	            if (settings.sticky === true) cssmenu.css('position', 'fixed');
	            var resizeFix;
	            resizeFix = function() {
	                var mediasize = 1000;
	                if ($(window).width() > mediasize) {
	                    cssmenu.find('ul').show();
	                }
	                if ($(window).width() <= mediasize) {
	                    cssmenu.find('ul').hide().removeClass('open');
	                }
	            };
	            resizeFix();
	            return $(window).on('resize', resizeFix);
	        });
	    };
	})(jQuery);
	 $("#easy-menu").menumaker({
        format: "multitoggle"
    });
    /*** =====================================
    * Slider
    * =====================================***/
    $(".slider-carousel").owlCarousel( {
        autoPlay: true,
        pagination: false,
        items: 1,
        itemsDesktop: [991, 1],
        itemsDesktopSmall: [667, 1],
        itemsTablet: [500, 1],
        itemsMobile: 1,
        navigation:true,
        navigationText: [
          "<i class='ion-ios-arrow-left'></i>",
          "<i class='ion-ios-arrow-right'></i>"
        ]
    });
    /*** =====================================
    * Rond Slider
    * =====================================***/
    function colorFullProgress() {
        var colorFullProgressActive = $('.colorfull-progress-active');
        var len = colorFullProgressActive.length;
        for (var i = 0; i < len; i++) {
            var roundId = '#' + colorFullProgressActive[i].id;
            $(roundId).circliful();
        }
    }
    if ($('.colorfull-progress-active') != null) {
        colorFullProgress();
    }
     function roundSliderActive() {
        var roundSliderActive = $('.round-slider-active');
        var len = roundSliderActive.length;
        for (var i = 0; i < len; i++) {
            var roundId = '#' + roundSliderActive[i].id;
            var dataValue = $(roundId).attr('data-value');
            var dataHeight = $(roundId).attr('data-height');
            var dataWidth = $(roundId).attr('data-width');
            $(roundId).roundSlider({
                radius: dataHeight,
                width: dataWidth,
                value: dataValue,
                startAngle:'90',
                handleSize: 0,
                sliderType: "min-range",
                disabled:true,
            });
        }
    }
    if ($('.round-slider-active') != null) {
        roundSliderActive();
    }
    /*** =====================================
    *  Event Counter
    * ===================================== ***/
    $('#event-one-counter').countdown({
        until: $.countdown.UTCDate(+10, 2017, 5 - 1, 28),
        format: 'dHM',
        padZeroes: true
    });
    $('#event-two-counter').countdown({
        until: $.countdown.UTCDate(+10, 2017, 5 - 1, 15),
        format: 'dHM',
        padZeroes: true
    });
    $('#event-three-counter').countdown({
        until: $.countdown.UTCDate(+10, 2017, 5 - 1, 19),
        format: 'dHM',
        padZeroes: true
    });
    $('#event-four-counter').countdown({
        until: $.countdown.UTCDate(+10, 2017, 5 - 1, 28),
        format: 'dHM',
        padZeroes: true
    });
    $('#event-five-counter').countdown({
        until: $.countdown.UTCDate(+10, 2017, 5 - 1, 28),
        format: 'dHM',
        padZeroes: true
    });
    $('#event-detail-one-counter').countdown({
        until: $.countdown.UTCDate(+10, 2017, 5 - 1, 28),
        format: 'dHMS',
        padZeroes: true
    });

    /*** =====================================
    *  Popup Video
    * ===================================== ***/
    $('.video-play-box .play-button').magnificPopup({
        items: {
            src: 'https://www.youtube.com/watch?v=UAJyJt_lnKA'
        },
        type: 'iframe', // this is default type
    });
    /** =====================================
    *   Barfiller
    * ===================================== **/
    function suneBarfiller() {
        var suneBarfiller = document.getElementsByClassName('barfiller');
        var len = suneBarfiller.length;
        for (var i = 0; i < len; i++) {
            var suneBarId = '#' + suneBarfiller[i].id;
             $(suneBarId).barfiller();
        }
    }
    if (document.getElementsByClassName('barfiller') != null) {
        suneBarfiller();
    }
    /** =====================================
    * Hot Jobs Rating
    * =====================================**/
    function sunerating() {
        var suneRate = document.getElementsByClassName('sune-rating');
        var len = suneRate.length;
        for (var i = 0; i < len; i++) {
            var suneRateId = '#' + suneRate[i].id;
            var dataValue = $(suneRateId).attr('data-value');
            $(suneRateId).rateYo({
                  rating: dataValue,
                  starWidth: "13px",
            });
        }
    }
    if (document.getElementsByClassName('sune-rating') != null) {
        sunerating();
    }
    /** =====================================
    * Event Detail Calender
    * =====================================**/
    $('.calendar-day > .events').popover({
        container: '.sune-event-calender',
        content: 'Hello World',
        html: true,
        placement: 'top',
        template: '<div class="popover calendar-event-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    $('.calendar-day > .events').on('show.bs.popover', function () {
          var html = [
              '<div class="desc">'+$(this).find('div.desc').html()+'</div>',
          ];
        $(this).attr('data-content', html);
    });
    /** =====================================
    * Event Detail Calender
    * =====================================**/
    $('#datetimepicker').datetimepicker({
        format: 'DD/MM/YYYY'
    });

    /** =====================================
    *   Search Box
    * =====================================**/
   $('.search-box .search-icon').on('click', function(e) {
        e.preventDefault();
        $('.top-search-input-wrap').addClass('show');

   });
   $(".top-search-input-wrap .top-search-overlay, .top-search-input-wrap .close-icon").on('click', function(){
        $('.top-search-input-wrap').removeClass('show');
   })
    /** =====================================
    *   Event Calender String Counter
    * ===================================== **/
    function suneStrigngGet() {
        var suneString = $('.day-list .calendar-day span');
        var len = suneString.length;
        for (var i = 0; i < len; i++) {
            var suneStId = '#' + suneString[i].id;
            var suneStringCount = $(suneStId).html().slice(0, 1);
            $(suneStId).html(suneStringCount);
        }
    }
    /** =====================================
    *   Diference Making Image Background
    * ===================================== **/
    var imageSourch = $('.deference-making-area .image img').attr( "src" );
    var imagePath = "url("+imageSourch+")";
    $('.deference-making-area .image').css({"background-image":imagePath});
    var deferenceMakingHeight = $(".deference-making-area").height();
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    if (windowWidth < 768) {
        if ($('.day-list') != null) {
          suneStrigngGet();
      }
    }
    if (windowWidth > 991) {
        $(".deference-making-area .image").css({"height": deferenceMakingHeight});
    }
    $(window).on('resize',function(){
        if (windowWidth > 991) {
            $(".deference-making-area .image").css({"height": deferenceMakingHeight});
        }
    });
     $(window).on('load',function(){
        $('#loading').fadeOut(500);
        if (windowWidth > 991) {
            $(".deference-making-area .image").css({"height": deferenceMakingHeight});
        }
    });

	/*** =====================================* Contact Form submission* =====================================*/
	$(function() {
		$('form#contact').on('submit', function(e) {
			e.preventDefault();
			$.post('post-contact-form.php', $(this).serialize()).done(function(data) {
				$('.comment-form').fadeOut('slow', function() {
					$('.comment-form').fadeIn('slow').html(data);
				});
			}).fail(function() {
				alert('Failed to submit. Please Try again.');
			});
		});
	});
});
