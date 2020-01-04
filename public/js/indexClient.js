(function() {
  "use strict";

  window.addEventListener("DOMContentLoaded", init, false);

  function init() {
    // document.getElementById("back").addEventListener("click", () => {
    //   console.log("hello");
    //   window.history.back();
    // });

    const mobileButtons = Array.from(document.getElementsByClassName("mobile"));
    mobileButtons.forEach(function(elem) {
      elem.addEventListener("click", () => {
        window.location = "/chooseUpload/mobile";
      });
    });

    const bothButtons = Array.from(document.getElementsByClassName("both"));
    bothButtons.forEach(function(elem) {
      elem.addEventListener("click", () => {
        window.location = "/chooseUpload/mobileAndDesktop";
      });
    });

    const desktopButtons = Array.from(document.getElementsByClassName("desktop"));
    desktopButtons.forEach(function(elem) {
      elem.addEventListener("click", () => {
        window.location = "/chooseUpload/desktop";
      });
    });

    const backButtons = Array.from(document.getElementsByClassName("back"));
    backButtons.forEach(function(elem) {
      elem.addEventListener("click", () => {
        window.history.back();
      });
    });

    document.getElementById("start").addEventListener("click", () => {
      window.location = "/chooseFormat";
    });
  }
})();
