"use strict"

// global object for whole project. DONT change it!
const WD = {};

// global vars
WD.ESC_CODE = 27;

// brakepoints
WD.fromDesktop = window.matchMedia( "(min-width: 1301px)" );
WD.atMobile = window.matchMedia( "(max-width: 767px)" );
WD.less500 = window.matchMedia("(max-width: 500px)");

WD.svgGlobal = function(){
  new Vue({
    	el: '#global-svg',
    	template: '<svg aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><symbol id="icon-phone" viewBox="0 0 32 32"><title>phone</title><path d="M22 20c-2 2-2 4-4 4s-4-2-6-4-4-4-4-6 2-2 4-4-4-8-6-8-6 6-6 6c0 4 4.109 12.109 8 16s12 8 16 8c0 0 6-4 6-6s-6-8-8-6z"></path></symbol><symbol id="icon-menu" viewBox="0 0 32 32"><title>menu</title><path d="M2 6h28v6h-28zM2 14h28v6h-28zM2 22h28v6h-28z"></path></symbol><symbol id="icon-cross" viewBox="0 0 32 32"><title>cross</title><path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path></symbol></defs></svg>'
    })
};

WD.mainMenuToggle = function(){
  const $menu = $('.js-menu');
  const $btnOpen = $('.js-menu-open');
  const $btnClose = $menu.find('.js-menu-close');
  const $globalWrapper = $('.global-wrapper');

  const popupOpen = function(){
    $menu.slideDown('500');
    $globalWrapper.addClass('global-wrapper--menu-opened');
  };

  const popupClose = function(){
    $menu.slideUp('500');
    $globalWrapper.removeClass('global-wrapper--menu-opened');
  };

  $btnOpen.on('click', function(){
    popupOpen();
  });

  $btnClose.on('click', function(){
    popupClose();
  });

  $(document).on('keydown.js-main-menu', function onKeyDown(evt) {
      if (evt.keyCode === WD.ESC_CODE) {
          popupClose();
      }
  });
};

WD.accordion = function(){
  const $accordion = $('.js-accordion');
  const $accordionButtons = $accordion.find('.js-accordion-header');
  const $accordionContents = $accordion.find('.js-accordion-content');
  const $accordionItems = $accordion.find('.js-accordion-item');

  $accordionButtons.on('click', function(){
    const $parentItem = $(this).closest('.js-accordion-item');
    const $parentContent = $parentItem.find('.js-accordion-content');
    const isActive = $parentItem.hasClass('active');

    $parentItem.addClass('active').siblings().removeClass('active').find('.js-accordion-content').slideUp('400');
    $parentContent.slideDown('400');

    if(isActive){
      $parentItem.removeClass('active');
      $parentContent.slideUp('400');
    }
  });

  const accordionMobile = function(){
    const $accordionMobile = $('.js-accordion-mobile');
    const $accordionMobileButtons = $accordionMobile.find('.js-accordion-mobile-header');
    const $accordionMobileContents = $accordionMobile.find('.js-accordion-mobile-content');
    const $accordionMobileItems = $accordionMobile.find('.js-accordion-mobile-item');

    $accordionMobileButtons.off('click').on('click', function(){
      const $parentItem = $(this).closest('.js-accordion-mobile-item');
      const $parentContent = $parentItem.find('.js-accordion-mobile-content');
      const isActive = $parentItem.hasClass('active');
      $parentItem.addClass('active').siblings().removeClass('active').find('.js-accordion-mobile-content').slideUp('400');

      $parentContent.slideDown('400');

      if(isActive){
        $parentItem.removeClass('active');
        $parentContent.slideUp('400');
      }
    });
  };

  $(window).resize(function() {
    const windowWidth = $(window).width();

    if(windowWidth <= 767){
      $('.js-accordion-mobile-content').hide();
      accordionMobile();
    }else{
      $('.js-accordion-mobile-content').show();
      $('.js-accordion-mobile-item').removeClass('active');
    }
  });

  accordionMobile();

};

WD.ymaps = function(){
  ymaps.ready(function() {
		$('.js-map').each(function(el, idx) {
			var lat = $(this).attr('data-lat');
			var lon = $(this).attr('data-lon');
			var addr = $(this).attr('data-addr');
		    var myMap = new ymaps.Map($(this).attr('id'), {
		            center: [lat, lon],
		            zoom: 13,
		            controls: ['zoomControl', 'fullscreenControl']
		        }, {
		            searchControlProvider: 'yandex#search'
		        }),

		        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
		            '<div style="color: #FFFFFF; font-weight: bold;"></div>'
		        ),

		        myPlacemarkWithContent = new ymaps.Placemark([lat, lon], {
		            hintContent: '',
		            balloonContent: addr,
		            iconContent: ''
		        }, {
		            iconLayout: 'default#imageWithContent',
		            iconImageHref: '/template/img/marc.png',
		            iconImageSize: [40, 47],
		            iconImageOffset: [-24, -24],
		            iconContentOffset: [15, 15],
		            iconContentLayout: MyIconContentLayout
		        });

		    myMap.geoObjects
		        .add(myPlacemarkWithContent);


		});
	});
};

(function onPageReady () {
  WD.svgGlobal();
  WD.mainMenuToggle();
  WD.accordion();
  WD.ymaps();
}());
