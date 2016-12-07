$.holdReady( true ); // hold document ready

var mapInitialized = false,
    numInitialized = 0,
    NUM_ITEMS_TO_BE_INITIALIZED = 5;

/*
 * @description this increments and simultaneously checks if all items
 * have been initialzied. if so, release the hold ready
 * this allows $(document).ready to run
 */
var incrementInitialized = function() {
  if (++numInitialized === NUM_ITEMS_TO_BE_INITIALIZED) {
    $.holdReady( false );
  }
};

/*
 * @description callback after the opening banner svg loads
 */
var afterOpeningBannerLoad = function() {
  incrementInitialized();
  scrollOpeningBanner();
};

/*
 * @description callback after the church svg loads
 */
var afterChurchLoad = function() {
  incrementInitialized();
};

/*
 * @description callback after the hotel svg loads
 */
var afterHotelLoad = function() {
  incrementInitialized();
};

/*
 * @description load event handler (mainly this is a signal that images have loaded)
 */
$(window).on('load', function() {
  incrementInitialized();
});

/*
 * @description Google Maps on load handler
 */
var loadMap = function() {
  incrementInitialized();
  initMap();
};

/*
 * @description main document ready handler
 */
$(document).ready(function() {
  $('#preloader').removeClass('show');
  $('#preloader').addClass('hidden');
  $('#content').removeClass('hidden');
  setupMapEvents();
  initMap();

  $('.nav:not(.nav__original)').html($('.nav__original').html());

  setTimeout(function() {
    $('.opening-banner').addClass('fade-in');
  }, 300);

  setTimeout(function() {
    repositionLetterHead();
    runCalligraphy();
    runChurchAnimation();
    setTimeout(function() { runDiscoBallShineAnimation() }, 250);
    runDiscoBallAnimation();
    runDiscoBallStarAnimation();
    parseOriginalUrl();
  }, 100);

  $(window).on('resize', function() {
    repositionLetterHead();
  });

  window.onpopstate = popStateFunc;

  scrollHandler();
  $(window).on('scroll', $.throttle( 10, scrollHandler ));
  $(window).on('scroll', $.throttle( 250, throttledScrollHandler ));

  $(window).on('mousemove', $.throttle(100, mousemoveHandler));

  setupTimelineHoverAnimations();
  setupWeddingPartyAnimations();
});

/*
 * @description center the preloader
 */
var repositionPreloader = function() {
  var preloaderWidth  = $('#preloader').width();
  var preloaderHeight = $('#preloader').height();
  var windowWidth     = $(window).width();
  var windowHeight    = $(window).height();
  $('#preloader').css({
    top: (windowHeight / 2) - (preloaderHeight / 2),
    left: (windowWidth / 2) - (preloaderWidth / 2)
  });
  $('#preloader').addClass('show');
};

/*
 * @description center the header text
 */
var repositionLetterHead = function() {
  var letterHeadHeight = $('.opening-banner-text').height();
  var windowHeight     = $(window).height();
  $('.opening-banner-text').css({
    top: (windowHeight / 2) - (letterHeadHeight / 2),
  });
};

/*
 * @description Initiate the opening banner animation and runs the "dan" animation
 */
var runCalligraphy = function() {
  // Store a reference to our paths, excluding our clip path
  var paths = $('path:not(defs path)');

  // For each path, set the stroke-dasharray and stroke-dashoffset
  // equal to the path's total length, hence rendering it invisible
  paths.each(function(i, e) {
      e.style.strokeDasharray = e.style.strokeDashoffset = e.getTotalLength();
  });

  // Create a timeline for ease of manipulation and the possibility
  // to play the animation back and forth at the requested speed.
  var tl = new TimelineMax({
    onComplete: function() {
      runCalligraphyForAnd();
    }
  });

  // Add each separate line animation to the timeline, animating the
  // stroke-dashoffset to 0. Use the duration, delay and easing to
  // achieve the perfect animation.
  tl.add([
    TweenLite.to($('#dan-d-1'), .25, {strokeDashoffset: 0, delay: 0}),
    TweenLite.to($('#dan-d-2'), .25, {strokeDashoffset: 0, delay: 0.15}),
    TweenLite.to($('#dan-d-3'), .1,  {strokeDashoffset: 0, delay: 0.3}),
    TweenLite.to($('#dan-d-4'), .1,  {strokeDashoffset: 0, delay: 0.4}),
    TweenLite.to($('#dan-d-5'), .25, {strokeDashoffset: 0, delay: 0.5}),
    TweenLite.to($('#dan-a-1'), .25, {strokeDashoffset: 0, delay: 0.65}),
    TweenLite.to($('#dan-a-2'), .25, {strokeDashoffset: 0, delay: 0.8}),
    TweenLite.to($('#dan-a-3'), .25,  {strokeDashoffset: 0, delay: 0.95}),
    TweenLite.to($('#dan-n-1'), .25, {strokeDashoffset: 0, delay: 1.05}),
    TweenLite.to($('#dan-n-2'), .25, {strokeDashoffset: 0, delay: 1.25}),
  ]);

  tl.duration(1.5);
};

/*
 * @description Initiate the "AND" animation in the opening banner
 */
var runCalligraphyForAnd = function() {
  // Create a timeline for ease of manipulation and the possibility
  // to play the animation back and forth at the requested speed.
  var tl = new TimelineMax({
    onComplete: function() {
      runCalligraphyForChristine();
    }
  });

  // Add each separate line animation to the timeline, animating the
  // stroke-dashoffset to 0. Use the duration, delay and easing to
  // achieve the perfect animation.
  tl.add([
    TweenLite.to($('#and-a-1'), .25, {strokeDashoffset: 0, delay: 0}),
    TweenLite.to($('#and-a-2'), .25, {strokeDashoffset: 0, delay: 0.15}),
    TweenLite.to($('#and-n-1'), .1,  {strokeDashoffset: 0, delay: 0.3}),
    TweenLite.to($('#and-n-2'), .1,  {strokeDashoffset: 0, delay: 0.4}),
    TweenLite.to($('#and-d-1'), .25, {strokeDashoffset: 0, delay: 0.5}),
    TweenLite.to($('#and-d-2'), .1,  {strokeDashoffset: 0, delay: 0.55}),
    TweenLite.to($('#and-d-3'), .25, {strokeDashoffset: 0, delay: 0.7}),
  ]);

  tl.duration(1);
};

/*
 * @description Initiate the "Christine" animation in the opening banner
 */
var runCalligraphyForChristine = function() {
  // Create a timeline for ease of manipulation and the possibility
  // to play the animation back and forth at the requested speed.
  var tl = new TimelineMax();

  // Add each separate line animation to the timeline, animating the
  // stroke-dashoffset to 0. Use the duration, delay and easing to
  // achieve the perfect animation.
  tl.add([
    TweenLite.to($('#christine-c-1'), .25, {strokeDashoffset: 0, delay: 0}),
    TweenLite.to($('#christine-h-1'), .1, {strokeDashoffset: 0, delay: 0.25}),
    TweenLite.to($('#christine-h-2'), .25, {strokeDashoffset: 0, delay: 0.30}),
    TweenLite.to($('#christine-h-3'), .25,  {strokeDashoffset: 0, delay: 0.45}),
    TweenLite.to($('#christine-h-4'), .25,  {strokeDashoffset: 0, delay: 0.6}),
    TweenLite.to($('#christine-r-1'), .1, {strokeDashoffset: 0, delay: 0.75}),
    TweenLite.to($('#christine-r-2'), .25, {strokeDashoffset: 0, delay: 0.8}),
    TweenLite.to($('#christine-r-3'), .25,  {strokeDashoffset: 0, delay: 0.95}),
    TweenLite.to($('#christine-i-1-1'), .25,  {strokeDashoffset: 0, delay: 1.10}),
    TweenLite.to($('#christine-s-1'), .25,  {strokeDashoffset: 0, delay: 1.25}),
    TweenLite.to($('#christine-s-2'), .1,  {strokeDashoffset: 0, delay: 1.4}),
    TweenLite.to($('#christine-s-3'), .25,  {strokeDashoffset: 0, delay: 1.45}),
    TweenLite.to($('#christine-t-1'), .25,  {strokeDashoffset: 0, delay: 1.6}),
    TweenLite.to($('#christine-t-2'), .25,  {strokeDashoffset: 0, delay: 1.75}),
    TweenLite.to($('#christine-i-2-1'), .25,  {strokeDashoffset: 0, delay: 1.9}),
    TweenLite.to($('#christine-n-1'), .25,  {strokeDashoffset: 0, delay: 2.05}),
    TweenLite.to($('#christine-n-2'), .25,  {strokeDashoffset: 0, delay: 2.2}),
    TweenLite.to($('#christine-e-1'), .25,  {strokeDashoffset: 0, delay: 2.35}),
    TweenLite.to($('#christine-e-2'), .25,  {strokeDashoffset: 0, delay: 2.5}),
    TweenLite.to($('#christine-e-3'), .25,  {strokeDashoffset: 0, delay: 2.65}),
    TweenLite.to($('#christine-dot-1'), .5,  {strokeDashoffset: 0, delay: 2.8}),
    TweenLite.to($('#christine-dot-2'), .5,  {strokeDashoffset: 0, delay: 2.9}),
  ]);

  tl.duration(2);
};

/*
 * @description Initiate the church animation
 */
var runChurchAnimation = function() {
  // Create a timeline for ease of manipulation and the possibility
  // to play the animation back and forth at the requested speed.
  var tl = new TimelineMax();

  // Add each separate line animation to the timeline, animating the
  // stroke-dashoffset to 0. Use the duration, delay and easing to
  // achieve the perfect animation.
  // tl.add([
  //   TweenLite.to($('.ray.ray-1'), .25, {strokeDashoffset: '-14.95', delay: .1}),
  //
  //   TweenLite.to($('.ray.ray-2'), .25, {strokeDashoffset: '-46.2', delay: .1}),
  // ]);
  tl.add([
    TweenLite.to($('.ray.ray-1'), .25, {strokeDashoffset: 0, delay: .1}),
    TweenLite.to($('.ray.ray-1'), .75, {opacity: 0, delay: .35}),

    TweenLite.to($('.ray.ray-2'), .25, {strokeDashoffset: 0, delay: .1}),
    TweenLite.to($('.ray.ray-2'), .75, {opacity: 0, delay: .35}),

    TweenLite.to($('.ray.ray-3'), .25, {strokeDashoffset: 0, delay: .1}),
    TweenLite.to($('.ray.ray-3'), .75, {opacity: 0, delay: .35}),

    TweenLite.to($('.ray.ray-4'), .25, {strokeDashoffset: 0, delay: .1}),
    TweenLite.to($('.ray.ray-4'), .75, {opacity: 0, delay: .35}),

    TweenLite.to($('.ray.ray-5'), .25, {strokeDashoffset: 0, delay: .1}),
    TweenLite.to($('.ray.ray-5'), .75, {opacity: 0, delay: .35}),

    TweenLite.to($('.ray.ray-6'), .25, {strokeDashoffset: 0, delay: .1}),
    TweenLite.to($('.ray.ray-6'), .75, {opacity: 0, delay: .35}),

    TweenLite.to($('.ray.ray-7'), .25, {strokeDashoffset: 0, delay: .1}),
    TweenLite.to($('.ray.ray-7'), .75, {opacity: 0, delay: .35}),

    TweenLite.to($('.ray.ray-8'), .25, {strokeDashoffset: 0, delay: .1}),
    TweenLite.to($('.ray.ray-8'), .75, {opacity: 0, delay: .35}),

    // TweenLite.to($('.ray.ray-9'), .25, {strokeDashoffset: 0, delay: .1}),
    // TweenLite.to($('.ray.ray-9'), .75, {opacity: 0, delay: .35}),
  ]);

  tl.duration(1.5);
  tl.repeat(-1);
  tl.repeatDelay(0.15);
};

/*
 * @description Initiate the disco ball with shine animation
 */
var runDiscoBallShineAnimation = function() {
  // Create a timeline for ease of manipulation and the possibility
  // to play the animation back and forth at the requested speed.
  var tl = new TimelineMax();

  // Add each separate line animation to the timeline, animating the
  // stroke-dashoffset to 0. Use the duration, delay and easing to
  // achieve the perfect animation.
  tl.add([
    TweenLite.to($('.disco.disco-1-3'), .2, {fill: '#ffffff', delay: 0}),
    TweenLite.to($('.disco.disco-1-3'), .2, {fill: '#ffffff', delay: .2}),

    TweenLite.to($('.disco.disco-1-4'), .2, {fill: '#ffffff', delay: 0}),
    TweenLite.to($('.disco.disco-1-4'), .2, {fill: '#ffffff', delay: .2}),
    TweenLite.to($('.disco.disco-1-4'), .6, {fill: '#d9dcd6', delay: .4}),


    TweenLite.to($('.disco.disco-2-3'), .2, {fill: '#9bacb6', delay: 0}),
    TweenLite.to($('.disco.disco-2-3'), .2, {fill: '#ffffff', delay: .2}),
    TweenLite.to($('.disco.disco-2-3'), .2, {fill: '#ffffff', delay: .4}),
    TweenLite.to($('.disco.disco-2-3'), .4, {fill: '#9bacb6', delay: .6}),

    TweenLite.to($('.disco.disco-2-4'), .2, {fill: '#d9dcd6', delay: 0}),
    TweenLite.to($('.disco.disco-2-4'), .2, {fill: '#ffffff', delay: .2}),
    TweenLite.to($('.disco.disco-2-4'), .2, {fill: '#ffffff', delay: .4}),
    TweenLite.to($('.disco.disco-2-4'), .4, {fill: '#d9dcd6', delay: .6}),


    TweenLite.to($('.disco.disco-3-3'), .4, {fill: '#d9dcd6', delay: 0}),
    TweenLite.to($('.disco.disco-3-3'), .2, {fill: '#ffffff', delay: .4}),
    TweenLite.to($('.disco.disco-3-3'), .2, {fill: '#ffffff', delay: .6}),
    TweenLite.to($('.disco.disco-3-3'), .2, {fill: '#d9dcd6', delay: .8}),

    TweenLite.to($('.disco.disco-3-4'), .4, {fill: '#9bacb6', delay: 0}),
    TweenLite.to($('.disco.disco-3-4'), .2, {fill: '#ffffff', delay: .4}),
    TweenLite.to($('.disco.disco-3-4'), .2, {fill: '#ffffff', delay: .6}),
    TweenLite.to($('.disco.disco-3-4'), .2, {fill: '#9bacb6', delay: .8}),


    TweenLite.to($('.disco.disco-4-3'), .6, {fill: '#9bacb6', delay: 0}),
    TweenLite.to($('.disco.disco-4-3'), .2, {fill: '#ffffff', delay: .6}),
    TweenLite.to($('.disco.disco-4-3'), .1, {fill: '#ffffff', delay: .8}),
    TweenLite.to($('.disco.disco-4-3'), .1, {fill: '#9bacb6', delay: .9}),

    TweenLite.to($('.disco.disco-4-4'), .6, {fill: '#d9dcd6', delay: 0}),
    TweenLite.to($('.disco.disco-4-4'), .2, {fill: '#ffffff', delay: .6}),
    TweenLite.to($('.disco.disco-4-4'), .1, {fill: '#ffffff', delay: .8}),
    TweenLite.to($('.disco.disco-4-4'), .1, {fill: '#d9dcd6', delay: .9}),


    TweenLite.to($('.disco.disco-5-3'), .2, {fill: '#ffffff', delay: 0}),
    TweenLite.to($('.disco.disco-5-3'), .6, {fill: '#9bacb6', delay: .2}),
    TweenLite.to($('.disco.disco-5-3'), .2, {fill: '#ffffff', delay: .8}),

    TweenLite.to($('.disco.disco-5-4'), .2, {fill: '#ffffff', delay: 0}),
    TweenLite.to($('.disco.disco-5-4'), .6, {fill: '#d9dcd6', delay: .2}),
    TweenLite.to($('.disco.disco-5-4'), .2, {fill: '#ffffff', delay: .8}),
  ]);

  tl.duration(1);
  tl.repeat(-1);
  tl.repeatDelay(.5);
};

/*
 * @description Initiate the disco ball animation
 */
var runDiscoBallAnimation = function() {
  // Create a timeline for ease of manipulation and the possibility
  // to play the animation back and forth at the requested speed.
  var tl = new TimelineMax();

  // Add each separate line animation to the timeline, animating the
  // stroke-dashoffset to 0. Use the duration, delay and easing to
  // achieve the perfect animation.
  tl.add([
    TweenLite.to($('.disco.disco-1-1'), .5, {fill: '#d9dcd6', delay: 0}),
    TweenLite.to($('.disco.disco-1-1'), .5, {fill: '#9bacb6', delay: .5}),

    TweenLite.to($('.disco.disco-1-2'), .5, {fill: '#9bacb6', delay: 0}),
    TweenLite.to($('.disco.disco-1-2'), .5, {fill: '#d9dcd6', delay: .5}),

    TweenLite.to($('.disco.disco-1-3'), .5, {fill: '#d9dcd6', delay: 0}),
    TweenLite.to($('.disco.disco-1-3'), .5, {fill: '#9bacb6', delay: .5}),

    TweenLite.to($('.disco.disco-1-4'), .5, {fill: '#9bacb6', delay: 0}),
    TweenLite.to($('.disco.disco-1-4'), .5, {fill: '#d9dcd6', delay: .5}),

    TweenLite.to($('.disco.disco-1-5'), .5, {fill: '#d9dcd6', delay: 0}),
    TweenLite.to($('.disco.disco-1-5'), .5, {fill: '#9bacb6', delay: .5}),


    TweenLite.to($('.disco.disco-2-1'), .5, {fill: '#9bacb6', delay: 0}),
    TweenLite.to($('.disco.disco-2-1'), .5, {fill: '#d9dcd6', delay: .5}),

    TweenLite.to($('.disco.disco-2-2'), .5, {fill: '#d9dcd6', delay: 0}),
    TweenLite.to($('.disco.disco-2-2'), .5, {fill: '#9bacb6', delay: .5}),

    TweenLite.to($('.disco.disco-2-3'), .5, {fill: '#9bacb6', delay: 0}),
    TweenLite.to($('.disco.disco-2-3'), .5, {fill: '#d9dcd6', delay: .5}),

    TweenLite.to($('.disco.disco-2-4'), .5, {fill: '#d9dcd6', delay: 0}),
    TweenLite.to($('.disco.disco-2-4'), .5, {fill: '#9bacb6', delay: .5}),

    TweenLite.to($('.disco.disco-2-5'), .5, {fill: '#9bacb6', delay: 0}),
    TweenLite.to($('.disco.disco-2-5'), .5, {fill: '#d9dcd6', delay: .5}),


    TweenLite.to($('.disco.disco-3-1'), .5, {fill: '#d9dcd6', delay: 0}),
    TweenLite.to($('.disco.disco-3-1'), .5, {fill: '#9bacb6', delay: .5}),

    TweenLite.to($('.disco.disco-3-2'), .5, {fill: '#9bacb6', delay: 0}),
    TweenLite.to($('.disco.disco-3-2'), .5, {fill: '#d9dcd6', delay: .5}),

    TweenLite.to($('.disco.disco-3-3'), .5, {fill: '#d9dcd6', delay: 0}),
    TweenLite.to($('.disco.disco-3-3'), .5, {fill: '#9bacb6', delay: .5}),

    TweenLite.to($('.disco.disco-3-4'), .5, {fill: '#9bacb6', delay: 0}),
    TweenLite.to($('.disco.disco-3-4'), .5, {fill: '#d9dcd6', delay: .5}),

    TweenLite.to($('.disco.disco-3-5'), .5, {fill: '#d9dcd6', delay: 0}),
    TweenLite.to($('.disco.disco-3-5'), .5, {fill: '#9bacb6', delay: .5}),


    TweenLite.to($('.disco.disco-4-1'), .5, {fill: '#9bacb6', delay: 0}),
    TweenLite.to($('.disco.disco-4-1'), .5, {fill: '#d9dcd6', delay: .5}),

    TweenLite.to($('.disco.disco-4-2'), .5, {fill: '#d9dcd6', delay: 0}),
    TweenLite.to($('.disco.disco-4-2'), .5, {fill: '#9bacb6', delay: .5}),

    TweenLite.to($('.disco.disco-4-3'), .5, {fill: '#9bacb6', delay: 0}),
    TweenLite.to($('.disco.disco-4-3'), .5, {fill: '#d9dcd6', delay: .5}),

    TweenLite.to($('.disco.disco-4-4'), .5, {fill: '#d9dcd6', delay: 0}),
    TweenLite.to($('.disco.disco-4-4'), .5, {fill: '#9bacb6', delay: .5}),

    TweenLite.to($('.disco.disco-4-5'), .5, {fill: '#9bacb6', delay: 0}),
    TweenLite.to($('.disco.disco-4-5'), .5, {fill: '#d9dcd6', delay: .5}),


    TweenLite.to($('.disco.disco-5-1'), .5, {fill: '#d9dcd6', delay: 0}),
    TweenLite.to($('.disco.disco-5-1'), .5, {fill: '#9bacb6', delay: .5}),

    TweenLite.to($('.disco.disco-5-2'), .5, {fill: '#9bacb6', delay: 0}),
    TweenLite.to($('.disco.disco-5-2'), .5, {fill: '#d9dcd6', delay: .5}),

    TweenLite.to($('.disco.disco-5-3'), .5, {fill: '#d9dcd6', delay: 0}),
    TweenLite.to($('.disco.disco-5-3'), .5, {fill: '#9bacb6', delay: .5}),

    TweenLite.to($('.disco.disco-5-4'), .5, {fill: '#9bacb6', delay: 0}),
    TweenLite.to($('.disco.disco-5-4'), .5, {fill: '#d9dcd6', delay: .5}),

    TweenLite.to($('.disco.disco-5-5'), .5, {fill: '#d9dcd6', delay: 0}),
    TweenLite.to($('.disco.disco-5-5'), .5, {fill: '#9bacb6', delay: .5}),
  ]);

  tl.duration(.5);
  tl.repeat(-1);
};

/*
 * @description Initiate the hotel star animation
 */
var runDiscoBallStarAnimation = function() {
  // Create a timeline for ease of manipulation and the possibility
  // to play the animation back and forth at the requested speed.
  var tl = new TimelineMax();

  // Add each separate line animation to the timeline, animating the
  // stroke-dashoffset to 0. Use the duration, delay and easing to
  // achieve the perfect animation.
  tl.add([
    TweenLite.to($('.hotel-icon .star-1'), .25, {opacity: 1, delay: .25}),
    TweenLite.to($('.hotel-icon .star-1'), .25, {opacity: 0, delay: .50}),
    TweenLite.to($('.hotel-icon .star-1'), .25, {opacity: 0, delay: .75}),
    TweenLite.to($('.hotel-icon .star-1'), .25, {opacity: 0, delay: 1}),

    TweenLite.to($('.hotel-icon .star-2'), .25, {opacity: 0, delay: .25}),
    TweenLite.to($('.hotel-icon .star-2'), .25, {opacity: 0, delay: .50}),
    TweenLite.to($('.hotel-icon .star-2'), .25, {opacity: 1, delay: .75}),
    TweenLite.to($('.hotel-icon .star-2'), .25, {opacity: 0, delay: 1}),

    TweenLite.to($('.hotel-icon .star-3'), .25, {opacity: 0, delay: .25}),
    TweenLite.to($('.hotel-icon .star-3'), .25, {opacity: 1, delay: .50}),
    TweenLite.to($('.hotel-icon .star-3'), .25, {opacity: 0, delay: .75}),
    TweenLite.to($('.hotel-icon .star-3'), .25, {opacity: 0, delay: 1}),

    TweenLite.to($('.hotel-icon .star-4'), .25, {opacity: 0, delay: .25}),
    TweenLite.to($('.hotel-icon .star-4'), .25, {opacity: 0, delay: .50}),
    TweenLite.to($('.hotel-icon .star-4'), .25, {opacity: 0, delay: .75}),
    TweenLite.to($('.hotel-icon .star-4'), .25, {opacity: 1, delay: 1}),
  ]);

  tl.duration(1.5);
  tl.repeat(-1);
  tl.repeatDelay(0);
};

/*
 * @description On scroll handler
 */
var scrollHandler = function() {
  scrollOpeningBanner();
};

/*
 * @description Throttled on scroll handler
 */
var throttledScrollHandler = function() {
  scrollInWedding();
  scrollInAbout();
  scrollInWeddingParty();
  scrollMap();
};

/*
 * @description Throttled mousemove handler
 */
var mousemoveHandler = function(e) {
  mousemoveNav(e);
};

/*
 * @description As the mouse moves closer to the nav, make it bigger
 * starts at the vertical center of the window
 */
mousemoveNav = function(e) {
  var maxWidth      = $(window).width() / 2.5,
      minFontSize   = 8,
      maxFontSize   = 14,
      fontSizeDelta = maxFontSize - minFontSize;

  if (e.pageX > maxWidth) {
    $('.nav-elem').css({fontSize: minFontSize + 'pt'});
    $('.nav-elems').css({opacity: 0});
    $('.nav-header').css({opacity: 1, fontSize: '16pt'});
    return;
  }

  var rate = e.pageX  / maxWidth;

  $('.nav-elem').css({
    fontSize: maxFontSize - (fontSizeDelta * rate) + 'pt',
  });
  $('.nav-elems').css({
    opacity: Math.max(1-rate, 0)
  });
  $('.nav-header').css({
    fontSize: 18 - ((18-16) * rate) + 'pt',
    opacity: rate
  });
};

/*
 * @description the opening banner is a parallax scroll
 * '#content' follows it as it's trailing behind
 * after '#content' reaches the top of the window frame,
 * we lock the parallax in place for perf reasons
 */
var scrollOpeningBanner = function() {
  var scrollTop = $(window).scrollTop();
  if (scrollTop <= $('#content').offset().top) {
    var transformBannerText = 'translateY(' + scrollTop/4 + 'px)';
    $('.opening-banner-text').css({
      '-webkit-transform': transformBannerText,
      transform: transformBannerText
    });
  } else {
    var transformBannerText = 'translateY(' + $('#content').offset().top/4 + 'px)';
    $('.opening-banner-text').css({
      '-webkit-transform': transformBannerText,
      transform: transformBannerText
    });
  }
};

/*
 * @description Make the wedding details visible
 */
var scrollInSection = function(selector, transitionClasses) {
  var scrollTop           = $(window).scrollTop(),
      wrapper             = $(selector),
      top                 = wrapper.offset().top - 100,
      bottom              = top + wrapper.outerHeight() + 100,
      reachedTopThreshold = scrollTop >= (wrapper.offset().top - ($(window).height() / 1.5)),
      notVisible          = scrollTop > bottom || scrollTop + $(window).height() <= top;

  // when $('.wedding-details-wrapper')'s top pixel reaches half of the window
  if (!wrapper.hasClass('visible') && reachedTopThreshold) {
    $(transitionClasses.join(', ')).removeClass('no-transition');
    wrapper.addClass('visible');
  } else {
    if (wrapper.hasClass('visible') && notVisible) {
      $(transitionClasses.join(', ')).addClass('no-transition');
      wrapper.removeClass('visible');
    }
  }
};

/*
 * @description Make the wedding details visible
 */
var scrollInWedding = function() {
  var transitionClasses = [
    '.wedding-details-heading',
    '.when-month',
    '.when-day',
    '.when-year',
    '.wedding-details-ceremony',
    '.wedding-details-reception'
  ]
  scrollInSection('#wedding.wedding-details-wrapper', transitionClasses);
};

/*
 * @description Make the About visible
 */
var scrollInAbout = function() {
  var transitionClasses = [
    '.wedding-details-heading',
    '.wedding-details-narrative',
    '.timeline-line',
    '.timeline-elem-date',
    '.timeline-elem-dot',
    '.timeline-elem-label',
    '.timeline-elem-bg-img img',
    '.timeline-elem-separator'
  ]
  scrollInSection('#about.wedding-details-wrapper', transitionClasses);
};

/*
 * @description Make the wedding party section visible
 */
var scrollInWeddingParty = function() {
  var transitionClasses = [
    '.wedding-details-heading',
  ]
  scrollInSection('#wedding-party.wedding-details-wrapper', transitionClasses);
};

/*
 * @description initialize the map
 */
var initMap = function() {
  if (!window.jQuery || $('#content').hasClass('hidden')) return;

  var elevator;
  var myOptions = {
    zoom: 16,
    center: new google.maps.LatLng(38.887079, -77.016078),
    mapTypeControlOptions: {
      mapTypeIds: ['styled_map']
    }
  };

  var styledMapType = new google.maps.StyledMapType(gmapStyle);
  window.bounds = new google.maps.LatLngBounds();
  var churchId = 'ChIJ9549xyW4t4kRXQo6ENcNgxk';
  var mayflowerId = 'ChIJObJi2bi3t4kRFGv6VecDQi8';

  window.map = new google.maps.Map($('#gmap')[0], myOptions);
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');
  mapInitialized = true;

  [churchId, mayflowerId].forEach(function(_id) {
    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    service.getDetails({
      placeId: _id
    }, function(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
        bounds.extend(marker.getPosition());
        infowindow.setContent('<div class="gmap-infowindow"><strong>' + place.name + '</strong><br>' +
          place.formatted_address + '</div>');
        infowindow.open(map, marker);
      }
    });
  });

  setTimeout(recenterMap, 250);
};

/*
 * @description recenter the map
 */
var recenterMap = function() {
  map.setCenter(bounds.getCenter());
  map.fitBounds(bounds);
};

var gmapStyle = [
  {
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6a6a6a"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "stylers": [
      {
        "color": "#c1f5aa"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ebebeb"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "saturation": -15
      },
      {
        "lightness": 40
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "saturation": 25
      },
      {
        "lightness": 45
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ebebeb"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.station.bus",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];

/*
 * @description Make the map visible
 */
var scrollMap = function() {
  if ($('#gmap').hasClass('visible')) return;
  var scrollTop = $(window).scrollTop();

  // when $('.wedding-details-wrapper')'s top pixel reaches half of the window
  if (scrollTop >= ($('#gmap').offset().top - ($(window).height() / 1.1))) {
    $('#gmap').addClass('visible');
    recenterMap();
  }
};

/*
 * @description initialze the map event handlers
 */
var setupMapEvents = function() {
  $('.gmap-wrapper').on('click', function() {
    transitionTo('explore');
  });
  $('.gmap-expanded-close').on('click', function(e) {
    if (window.history.state) {
      window.history.back();
    } else {
      collapseMap();
      window.history.pushState(null, null, '/');
    }
    e.stopPropagation();
  });
};

/*
 * @description make the map fullscreen
 * nothing else should be interactive
 * disables scroll
 */
var expandMap = function(e) {
  if ($('.gmap-wrapper').hasClass('expanded')) return;
  window.expandMapOriginalScrollTop = $(window).scrollTop();
  $('html, body').addClass('no-scroll');
  $('.gmap-wrapper').addClass('expanded');
  setTimeout(function() {
    $('html, body').animate({ scrollTop: $('.gmap-wrapper').offset().top }, 250);
    $('#gmap').width($(window).width() - $('.gmap-content').width());
    $('.gmap-wrapper').height($(window).height());
    google.maps.event.trigger(map, 'resize');
    recenterMap();
  }, 250);
};

/*
 * @description collapse the map from fullscreen
 */
var collapseMap = function(e) {
  if (e) e.preventDefault();
  if (!$('.gmap-wrapper').hasClass('expanded')) return;
  if (window.expandMapOriginalScrollTop !== 0)
    $('html, body').animate({ scrollTop: window.expandMapOriginalScrollTop }, 250);
  $('.gmap-wrapper').css({pointerEvents: 'none'});
  $('html, body').removeClass('no-scroll');
  $('.gmap-wrapper').removeClass('expanded');
  $('.gmap-wrapper').removeAttr('style');
  $('#gmap').removeAttr('style');

  setTimeout(function() {
    google.maps.event.trigger(map, 'resize');
    recenterMap();
  }, 250);
  return false;
};

/*
 * @description jump to a specific section of the page
 */
var jumpTo = function(section, scrollSpeed) {
  scrollSpeed = scrollSpeed || 500;

  if (section === 'explore') {
    expandMap();
    return;
  }

  if ($('.gmap-wrapper').hasClass('expanded')) {
    collapseMap();
    if (window.expandMapOriginalScrollTop === 0) {
      $('html, body').animate({
        scrollTop: $('#' + section).offset().top
      }, scrollSpeed);
    }
  } else {
    $('html, body').animate({
      scrollTop: $('#' + section).offset().top
    }, scrollSpeed);
  }
};

/*
 * @description parses the url and segments the path into an array
 */
var getPathContents = function() {
  var parser = document.createElement('a');
  parser.href = window.location.href;
  var path = parser.pathname;
  if (path[0] === '/') {
    path = path.substring(1);
  }
  if (path[path.length - 1] === '/') {
    path = path.substring(0, path.length - 1);
  }
  return path.split('/');
}

/*
 * @description parses the url to get what part of the page we should jump to
 *    should only be called once in the beginning
 */
var parseOriginalUrl = function() {
  var path = getPathContents();
  if (path && path[0] && path[0].length > 0) {
    transitionTo(path[0], 1000);
  }
};

/*
 * @description on popstate, run this
 */
var popStateFunc = function(e) {
  if (e && e.state && e.state.section && e.state.section.length > 0) {
    transitionTo(e.state.section);
  }
};

/*
 * @description calls to transition to a specific section of the page
 *     utilizes the the web history API
 */
var transitionTo = function(section, scrollSpeed) {
  var path = getPathContents();
  if (section !== path[0]) {
    history.pushState({
      section: section
    }, section, section);
  }

  jumpTo(section, scrollSpeed);
};

var skewImg1 = function(x, y, w, h, o) {
  var xr = (x - w / 2) / (w / 40);
  var xr2 = x / (w / 20) * 2.5 + 10;
  var yr = -((y - h / 2) / (h / 20));
  return "rotateY(" + xr + "deg) rotateX(" + yr + "deg) translateX(" + xr2 + "px) translateY(" + -yr * 4 + "px)";
};

var skewImg2 = function(x, y, w, h, o) {
  var xr = (x - x / 2) / (w / 100);
  var xr2 = x / (w / 20) * 2.5 + 10;
  var yr = -((y - h / 2) / (h / 10));
  return "translateX(" + xr + "px) translateY(" + -yr * 4 + "px)";
};

var skewImg3 = function(x, y, w, h, o) {
  var xr = (x - w / 2) / (w / 40);
  var xr2 = x / (w / 20) * 2.5 + 10;
  var yr = -((y - h / 2) / (h / 20));
  return "translateX(" + xr + "px) translateY(" + -yr * 4 + "px)";
};

/*
 * @description on hover timeline elem
 * logic stolen from http://actnormal.co/products/ :P
 */
var setupTimelineHoverAnimations = function() {
  $('.timeline-elem-label').on('mousemove', $.throttle(5, function(e) {
    var img = $(this).parent().find('.timeline-elem-bg-img img'),
        x   = e.pageX - $(this).offset().left,
        y   = e.pageY - $(this).offset().top,
        w   = $(this).width(),
        h   = $(this).height();

    img.css({
      transform: skewImg1(x, y, w, h)
    });
  }));
};

/*
 * @description on hover wedding party elem
 * logic stolen from http://actnormal.co/products/ :P
 */
var setupWeddingPartyAnimations = function() {
  $('.wedding-party-member').on('mousemove', $.throttle(100, function(e) {
    var img = $(this).find('img'),
        x   = e.pageX - $(this).offset().left,
        y   = e.pageY - $(this).offset().top,
        w   = $(this).width(),
        h   = $(this).height();

    $('.wedding-party-member img').css({
      left: 0,
      transform: "rotate(0) translate(0)"
    });
    $('.wedding-party-member .wedding-party-label').css({
      left: 0,
      transform: "rotate(0) translate(0)"
    });

    img.css({
      // left: -35,
      transform: skewImg3(x, y, w, h)
    });
    $(this).find('.wedding-party-label').css({
      left: -5,
      transform: skewImg2(x, y, w, h)
    });
  }));

  $('.wedding-party-member').on('mouseleave', $.debounce(100, function(e) {
    var img = $(this).find('img');
    img.css({
      left: 0,
      transform: "rotate(0) translate(0)"
    });
    $(this).find('.wedding-party-label').css({
      left: 0,
      transform: "rotate(0) translate(0)"
    });
  }));
};

// First thing that happens
repositionPreloader();
$('.opening-banner-svg').load('opening-banner.svg', afterOpeningBannerLoad);
$('.church-svg').load('church.stroke.svg', afterChurchLoad);
$('.hotel-svg').load('hotel.disco.svg', afterHotelLoad);
