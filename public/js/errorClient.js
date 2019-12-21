(function() {
  "use strict";

  window.addEventListener("DOMContentLoaded", init, false);

  function init() {
    const homeButtons = Array.from(document.getElementsByClassName("home"));
    homeButtons.forEach(function(elem) {
      elem.addEventListener("click", () => {
        window.location = "/";
      });
    });
  }
})();
