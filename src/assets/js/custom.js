$(document).on(
  "click",
  ".navbar-nav>li>a, .nav-link, .navbar-brand, .dropdown-menu>a",
  function (e) {
    if (
      $(e.target).is("a") &&
      $(e.target).attr("class") != "nav-link dropdown-toggle"
    ) {
      $(".navbar-collapse").collapse("hide");
    }
  }
);
