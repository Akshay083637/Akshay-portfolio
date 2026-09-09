// Landing page: tap/click anywhere on "Ash" to reveal the nav
document.addEventListener('DOMContentLoaded', function () {
  var landing = document.getElementById('landing');
  if (landing) {
    landing.addEventListener('click', function () {
      document.body.classList.add('open');
    });
  }
});
