// Modern JavaScript with ES6
$(document).ready(function() {
  // Add current year to footer
  const currentYear = new Date().getFullYear();
  $(".current-year").text(currentYear);
  
  // Smooth scrolling for navigation links
  $("a[href^='#']").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      const hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function() {
        window.location.hash = hash;
      });
    }
  });
  
  // Initialize skill progress bars with animation
  $('.progress-bar').each(function() {
    const width = $(this).attr('aria-valuenow') + '%';
    $(this).css('width', '0%').animate({
      width: width
    }, 1000);
  });
});
