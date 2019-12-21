(function() {
  "use strict";

  window.addEventListener("DOMContentLoaded", init, false);

  function init() {
    document.getElementById("start").addEventListener("click", () => {
      window.location = "/formats";
      console.log("pressed");
    });
  }
})();
