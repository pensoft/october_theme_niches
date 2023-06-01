$(window).scroll(animateNumbers);
var viewed = false;

var documentHasScroll = function() {
    return window.innerHeight <= document.body.offsetHeight;
};

$(document).ready(function() {
	/* MENU */
	$('.navbar-nav').attr('id', 'menu'); // please don't remove this line
	$( '<div class="calendar-top"></div>' ).insertBefore( "#calendar" );
	$( '<div class="card-profile-top"></div>' ).insertBefore( ".card.profile.card-profile" );
	var divs = $(".card-profiles > div");
	for(var i = 0; i < divs.length; i+=2) {
		divs.slice(i, i+2).wrapAll( '<div class="col-xs" />');
	}

	var headerNavbar = $('#headerNavbar');
	var width100 = $('.width100');
	var innerWidth = $('body').innerWidth();
	headerNavbar.width(innerWidth);
	width100.width(innerWidth);

    $('.nav-item').children("a").each(function(){
        if($(this).attr('data-toggle') == 'dropdown'){
            $(this).removeAttr('data-toggle')
        }
    });

    if (window.location.hash) {
        var link = window.location.hash;
        var anchorId = link.substr(link.indexOf("#") + 1);
        if($("#"+anchorId).offset()){
            $('html, body').animate({
                scrollTop: $("#"+anchorId).offset().top - 150
            }, 500);
        }else{
            $('.accordion-border').each(function(){
                var title = $(this).find(".accordion-toggle .col-xs.start-xs").text().toUpperCase();
                var toggler = $(this).find(".accordion-toggle");
                if ( title.indexOf(anchorId.toUpperCase()) >= 0 && !toggler.next(".accordion-content").is(':visible') ){
                    $('html, body').animate({
                        scrollTop: toggler.parent().offset().top - 150
                    }, 500);
                    toggler.trigger( "click" );
                }
            });
        }
    }

    $('.dropdown a').click(function(event) {

        if (location.href.indexOf("#") != -1) {
            var link = $(this).attr('href');
            var anchorId = link.substr(link.indexOf("#") + 1);
            if($("#"+anchorId).length>0){
                $('html, body').animate({
                    scrollTop: $("#"+anchorId).offset().top - 150
                }, 500);
            }else{
                // event.preventDefault();
                $("path[title='"+anchorId.toUpperCase()+"']").addClass('active_path');

                $('.accordion-border').each(function(){
                    var title = $(this).find(".accordion-toggle .col-xs.start-xs").text().toUpperCase();
                    var toggler = $(this).find(".accordion-toggle");
                    if ( title.indexOf(anchorId.toUpperCase()) >= 0 && !toggler.next(".accordion-content").is(':visible') ){
                        $('html, body').animate({
                            scrollTop: toggler.parent().offset().top - 150
                        }, 500);
                        toggler.trigger( "click" );
                        event.preventDefault();
                    }
                });
            }
        }


    });


	$('body').on('click', '.work_packages .accordion-toggle, .pilots .accordion-toggle', function () {
		if ($(this).next(".accordion-content").is(':visible')) {
			$(this).next(".accordion-content").slideUp(300);
			$(this).children().find(".plusminus").text('+');
			$(this).children(".plusminus").html('<span class="plus"></span>');
		} else {
			$(this).next(".accordion-content").slideDown(300);
			$(this).children().find(".plusminus").text('-');
			$(this).children(".plusminus").html('<span class="minus"></span>');
		}
	});

	$('.work_packages .accordion-content, .projects_services .accordion-content').each(function( index, value ) {
		$(value).find('a').attr( "onclick", "window.open(this.href, '_blank');" );
	});

    $('.pilots .accordion-border').click(function(){
        // $("path").removeClass('active_path');
        // var tooltip = document.getElementById("tooltip");
        // tooltip.classList.remove("active");
        var title = $(this).find(".accordion-toggle .col-xs.start-xs").text().toUpperCase();
        var toggler = $(this).find(".accordion-toggle");
        var string = title.split(',')[0];
        if (toggler.next(".accordion-content").is(':visible')) {
            $("path[title='"+string.toUpperCase()+"']").removeClass('active_path');
        } else {
            $("path[title='"+string.toUpperCase()+"']").addClass('active_path');
        }
    });





	onHashChange();
	$(window).on("hashchange", function() {
		onHashChange();
	});

	$('.nav.nav-pills').removeAttr('id');

	var count = $("h1").text().length;

	$('.tabs').each(function(){
		// For each set of tabs, we want to keep track of
		// which tab is active and its associated content
		var $active, $content, $links = $(this).find('a');
		var speed = "fast";
		var activeTab = $(location.hash);
		// If the location.hash matches one of the links, use that as the active tab.
		// If no match is found, use the first link as the initial active tab.
		$active = $($links.filter("[href=\'"+location.hash+"\']")[0] || $links[0]);

		$active.addClass('active');

		$content = $($active[0].hash);

		// Hide the remaining content
		$links.not($active).each(function () {
			$(this.hash).hide();
		});

		if(activeTab.length){
			$content.slideDown(speed);
			//scroll to element
			$('html, body').animate({
				scrollTop:  activeTab.offset().top - $('header').height()
			}, speed);
		}

		// Bind the click event handler
		$(this).find("a").click(function (e) {
			if($(this).hasClass('active')) {
				$content.slideDown({
					scrollTop: $content.offset().top - $('header').height()
				}, speed);
				var screenSize = getScreenSize();
				if (screenSize.width < 800) {
					// scroll to element
					$('html, body').animate({
						scrollTop: $content.offset().top - $('header').height() + 300  // mobile
					}, speed);
				}else{
					//scroll to element icons top
					$('html, body').animate({
						scrollTop:  $content.offset().top - $('header').height() + 300
					}, speed);
				}
				e.preventDefault();
				return false;
			}
			// Make the old tab inactive.
			$active.removeClass('active');
			// $content.slideUp({
			// 	scrollTop: $content.offset().top - $('header').height() - $('.left_sidebar').height()
			// }, speed);
			$content.hide();

			// Update the variables with the new link and content
			$active = $(this);
			$content = $(this.hash);

			location.hash = $active[0].hash;

			// Make the tab active.
			$active.addClass('active');
			$content.slideDown({
				scrollTop: $content.offset().top - $('header').height()
			}, speed);
			// var screenSize = getScreenSize();
			// if (screenSize.width < 800) {
			// 	// scroll to element
			// 	$('html, body').animate({
			// 		scrollTop: $content.offset().top - $('header').height() + 300 // mobile
			// 	}, speed);
			// }else{
			// 	//scroll to element icons top
			// 	$('html, body').animate({
			// 		scrollTop:  $content.offset().top - $('header').height() + 300
			// 	}, speed);
			// }

			// Prevent the anchor\'s default click action
			e.preventDefault();
		});
	});



	$('.numbers').attr('data-aos', 'fade-up');
	$('.mission .container').attr('data-aos', 'fade-up');
	$('.vision .container').attr('data-aos', 'fade-up');
	$('.goals .container').attr('data-aos', 'fade-up');
	$('.card-img-top').attr('data-aos', 'fade-up');
	$('.logo-container').attr('data-aos', 'fade-up');
	$('.subscribe-items a').attr('data-aos', 'fade-up');
	$('.icons a').attr('data-aos', 'fade-up');
	$('.about h1.display-1').attr('data-aos', 'fade-up');
	$('h2.underline').attr('data-aos', 'fade-up');
	$('.news_column').attr('data-aos', 'fade-up');
	// $('.timeline-item').attr('data-aos', 'fade-up');

	// about page

	$('.about img').attr('data-aos', 'fade-up');

	$('.country_map').attr('data-aos', 'fade-up');
	$('.partner-item').attr('data-aos', 'fade-up');

	// media
	$('.flyer_image_container img').attr('data-aos', 'fade-up');
	$('.broshure_and_poster img').attr('data-aos', 'fade-up');
	$('.card_image_container').attr('data-aos', 'fade-up');
	$('.coordinator_image').attr('data-aos', 'fade-up');


	// $('.news_column, .single-news-item').each(function(){
	$('.news_column').each(function(){
		$(this).find('img').wrapAll("<div class='shadow'></div>")
	});

	$('.news .news-container, .news .news-image').removeClass('col-xs-12').removeClass('center-xs');

	$('.partners .partner_description, .partners .list-item-body').each(function(){
		var countParagraphs = $(this).find('p').length;
		if(countParagraphs > 1) {
			$(this).find('p').first().append('<div class="dorsal">Read more</div>');
			$(this).find('p:not(:first)').wrapAll("<div class='toogle-contact-paragraphs'></div>")
		}
	});

	$('.dorsal').click(function () {
		var link = $(this);
		link.parent().parent().find('.toogle-contact-paragraphs').slideToggle('slow', function() {
			if ($(this).is(':visible')) {
				link.text('Read less');
			} else {
				link.text('Read more');
			}
		});

	});

	$('.see_all_partners_link').hide();


});

function onHashChange(){
	$("path").removeClass('active_path');
	$(".accordion-content").hide();
	var caseStudiesHashTitle = location.hash;

	if(caseStudiesHashTitle){
		var caseStudiesTitle = caseStudiesHashTitle.substring(1, caseStudiesHashTitle.length);
		$("path[title='"+caseStudiesTitle.toUpperCase()+"']").addClass('active_path');

		$('.pilots .accordion-border').each(function(){
			var title = $(this).find(".accordion-toggle .col-xs.start-xs").text().toUpperCase();
			var toggler = $(this).find(".accordion-toggle");
			if ( title.indexOf(caseStudiesTitle.toUpperCase()) >= 0 && !toggler.next(".accordion-content").is(':visible') ){
				toggler.trigger( "click" );
			}
		});
	}
}


function createTippy(element, options) {
	return new Promise(resolve => {
		tippy(element, Object.assign({}, {
			allowHTML: true,
			interactive: true,
			animation: 'scale',
			theme: 'light',
		}, options));
		resolve();
	});
}



function encodeURIObject(data){
    return Object.keys(data).map(function (i) {
        return encodeURIComponent(i) + '=' + encodeURIComponent(data[i])
    }).join('&');
}

function appendProfile() {
    $(document).on('profile', function (e) {
        var headerNavbarNav = $('#headerNavbarNav');
        var li = '<li class="nav-item"><a href="/profile" target = "_self">Profile</a></li >';
        headerNavbarNav.find('>ul').append(li);
    });
}
function appendSignIn(){
    $(document).on('signin', function (e) {
        var headerNavbarLogin = $('#headerNavbarNav');
        var li = '<li class="nav-item sign-in"><a href="/login" target = "_self">Login</a></li >';
		headerNavbarLogin.find('>ul').append(li);
		var menu = $('#menuToggle');
		menu.find('>ul').append(li);
    });
}

function appendSignOut() {
    $(document).on('signout', function (e) {
        var headerNavbarNav = $('#headerNavbarNav');
        var li = '<li class="nav-item  sign-in"><a data-request="onLogout" data-request-data="redirect: \'/\'">Logout</a></li >';
        headerNavbarNav.find('>ul').append(li);
		var menu = $('#menuToggle');
		menu.find('>ul').append(li);
    });
}

function appendSearchAndSocialMedia(){
	var liSearch = '<li class="nav-item search_field"><a href=\"javascript: void(0);\" onclick=\"showSearchForm();\"></a></li>';
	// var liSocial = '<li class="nav-item social"><a href=\"https://www.facebook.com/BiCIKLProjectH2020\" target=\"_blank\" class=\"pr p-facebook big\" target=\"_blank\"></a><a href=\"https://twitter.com/BiCIKL_H2020\" target=\"_blank\" class=\"pr p-twitter big\" target=\"_blank\"></a></li>';
	var menu = $('#menuToggle');
	// menu.find('>ul').append(liSearch).append(liSocial);
	menu.find('>ul').append(liSearch);
}

function redirectAndRefresh(url){
	$(".tabs a").each(function() {
		this.href = window.location.hash;
	});
	window.open(url, '_blank');
	location.reload();
}

function isBreakpointLarge() {
    return window.innerWidth <= 991;
}

function showSearchForm(){
	// if ($(".search").is(':visible')) {
	// 	$('#menu').show();
	// } else {
	// 	$(".search").slideDown(300);
	// 	$('#menu').hide();
	// }
	// $('#menu').hide();
	$('#layout-header').toggleClass('full-width');
	$('#search').toggle();
	$('#menu li').hide();
}

function hideSearchForm(){
	$('#layout-header').toggleClass('full-width');
	$('#search').hide();
	$('#menu li').show();
}

function requestFormLibrary() {
	$('#mylibraryForm').on('click', 'a', function () {
		var $form = $(this).closest('form');
		$form.request();
	})
}

function requestFormPartners() {
	$('#myPartnersForm').on('click', 'a', function () {
		var $form = $(this).closest('form');
		$form.request();
	})
}

function isScrolledIntoView(elem) {
	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + $(window).height();

	if($(elem).height()){
		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();

		return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}
	return;

}


function animateNumbers() {
	if (isScrolledIntoView($(".numbers")) && !viewed) {
		viewed = true;
		$('.count').each(function () {
			var size = $(this).text().split(".")[1] ? $(this).text().split(".")[1].length : 0;
			$(this).prop('Counter',0).animate({
				Counter: $(this).text()
			}, {
				duration: 1800,
				easing: 'swing',
				step: function (now) {
					$(this).text(parseFloat(now).toFixed(size));
				}
			});
		});
	}
}


function scrollDown(){
	var element = $('#layout-content');
	$("html, body").animate({ scrollTop: element.offset().top - 190 }, 500);
}


function onCustomPartners(pPartnerId) {
		$('.partner-item').removeClass('active_partner');
		$.request('onInsider', {
			update: { 'components/componentinsider': '#mycomponentinsider',
			},
			data: {
				partner_id: pPartnerId
			},
		}).then(response => {
			$('.partner_item_'+pPartnerId).addClass('active_partner');

			$('html, body').animate({
				scrollTop: $("#mycomponentinsider").offset().top - 100
			}, 1000);
		});
}

function init() {
    window.addEventListener('resize', function () {
        if (isBreakpointLarge()) {
            $('#card-carousel').slick('unslick');
        } else {
            if (typeof cardCarousel === 'function') {
                cardCarousel({
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    prevArrow: '<i class="slick-prev pr p-back"/>',
                    nextArrow: '<i class="slick-next pr p-forward"/>',
                });
             }
        }
        // keepFooter(documentHasScroll());

    });
    document.addEventListener('DOMContentLoaded', function () {
        if (!isBreakpointLarge()) {
            if (typeof cardCarousel === 'function') {
                cardCarousel({
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    prevArrow: '<i class="slick-prev pr p-back"/>',
                    nextArrow: '<i class="slick-next pr p-forward"/>',
                });
            }
        }
		appendSearchAndSocialMedia()
		requestFormLibrary()
		// requestFormPartners()
        // keepFooter(documentHasScroll());

    });
    // appendProfile()
    // appendSignIn()
    // appendSignOut()
}


function handlePilotsSVGMapMouseMove(event) {
	var title = $(event.target).attr('title');
	var tooltip = document.getElementById("tooltip");
	if (!title) {
		title = $(event.target).parent().attr('title');
	}

	switch (title) {
		case 'Berlin':
		case 'Rotterdam':
		case 'Barcelona':
		case 'Sheffield':
		case 'Boston':
			break;
		default:
			return tooltip.classList.remove("active");
	}

	var x = event.clientX;
	var y = event.clientY;

	tooltip.style.left = (x + 20) + "px";
	tooltip.style.top = (y - 20) + "px";

	tooltip.innerHTML = $(event.target).attr('title');
	tooltip.classList.add("active");

}

function onPilots(pTitle) {
	// $("path").removeClass('active_path');
	var tooltip = document.getElementById("tooltip");
	tooltip.classList.remove("active");
	if(!$("path[title='"+pTitle.toUpperCase()+"']").hasClass('active_path')){
        $("path[title='"+pTitle.toUpperCase()+"']").addClass('active_path');

        $('.accordion-border').each(function(){
            var title = $(this).find(".accordion-toggle .col-xs.start-xs").text().toUpperCase();
            var toggler = $(this).find(".accordion-toggle");
            if ( title.indexOf(pTitle.toUpperCase()) >= 0 && !toggler.next(".accordion-content").is(':visible') ){
                toggler.trigger( "click" );
                $('html, body').animate({
                    scrollTop: toggler.parent().offset().top - 150
                }, 500);
            }
        });
    }else{
        $("path[title='"+pTitle.toUpperCase()+"']").removeClass('active_path');
        $('.accordion-border').each(function(){
            var title = $(this).find(".accordion-toggle .col-xs.start-xs").text().toUpperCase();
            var toggler = $(this).find(".accordion-toggle");
            if ( title.indexOf(pTitle.toUpperCase()) >= 0 && toggler.next(".accordion-content").is(':visible') ){
                toggler.trigger( "click" );
            }
        });
    }

}

init()
