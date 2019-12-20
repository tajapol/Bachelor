(function() {
  "use strict";

  window.addEventListener("DOMContentLoaded", init, false);

  function init() {
    console.log("Client-side code running");

    const button = document.getElementById("my");
    button.addEventListener("click", function(e) {
      console.log("button was clicked");
    });
  }
})();
