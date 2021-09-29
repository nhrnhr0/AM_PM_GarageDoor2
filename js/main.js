// Owl
$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 35,
  nav: false,
  dots: true,
  autoPlay: true,
  autoplayTimeout: 4000,
  autoplayHoverPause: true,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 3,
    },
  },
});
