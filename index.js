$(document).ready(function() {
  $(".current-year").text(new Date().getFullYear());

  $("a[href^='#']").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({ scrollTop: $(hash).offset().top - 70 }, 600);
      if (history.pushState) {
        history.pushState(null, null, hash);
      }
    }
  });

  var animateProgressBars = function() {
    $('.progress-bar').each(function() {
      var $bar = $(this);
      if ($bar.data('animated')) return;
      var rect = this.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        var width = $bar.attr('aria-valuenow') + '%';
        this.style.width = '0%';
        var el = this;
        void el.offsetWidth;
        el.style.width = width;
        $bar.data('animated', true);
      }
    });
  };

  animateProgressBars();
  $(window).on('scroll', animateProgressBars);

  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 50) {
      $('.navbar').css('box-shadow', '0 2px 12px rgba(0,0,0,0.15)');
    } else {
      $('.navbar').css('box-shadow', '0 1px 3px rgba(0,0,0,0.08)');
    }
  });
});
