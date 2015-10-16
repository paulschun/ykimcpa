//= require_tree .

document.addEventListener("scroll", function(event) {
  var _header = document.querySelector("header");
  if (window.pageYOffset === 0) {
    _header.className = "";
  }
  else {
    _header.className = "below-zero";
  }
});
