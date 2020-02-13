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

    const backButtons = Array.from(document.getElementsByClassName("back"));
    backButtons.forEach(function(elem) {
      elem.addEventListener("click", () => {
        window.history.back();
      });
    });

    const mobileButtons = Array.from(document.getElementsByClassName("mobile"));
    mobileButtons.forEach(function(elem) {
      elem.addEventListener("click", () => {
        window.location = "/choose-upload/mobile";
      });
    });

    const bothButtons = Array.from(document.getElementsByClassName("both"));
    bothButtons.forEach(function(elem) {
      elem.addEventListener("click", () => {
        window.location = "/choose-upload/mobile-and-desktop";
      });
    });

    const desktopButtons = Array.from(document.getElementsByClassName("desktop"));
    desktopButtons.forEach(function(elem) {
      elem.addEventListener("click", () => {
        window.location = "/choose-upload/desktop";
      });
    });

    const fileButtons = Array.from(document.getElementsByClassName("file"));
    if (window.location.href == "http://localhost:3001/choose-upload/mobile") {
      fileButtons.forEach(function(elem) {
        elem.addEventListener("click", () => {
          window.location = "/mobile/file-upload";
        });
      });
    }

    if (window.location.href == "http://localhost:3001/choose-upload/desktop") {
      fileButtons.forEach(function(elem) {
        elem.addEventListener("click", () => {
          window.location = "/desktop/file-upload";
        });
      });
    }

    if (window.location.href == "http://localhost:3001/choose-upload/mobile-and-desktop") {
      fileButtons.forEach(function(elem) {
        elem.addEventListener("click", () => {
          window.location = "/mobile-and-desktop/file-upload";
        });
      });
    }

    const inputButtons = Array.from(document.getElementsByClassName("input"));
    if (window.location.href == "http://localhost:3001/choose-upload/mobile") {
      inputButtons.forEach(function(elem) {
        elem.addEventListener("click", () => {
          window.location = "/mobile/direct-input";
        });
      });
    }

    if (window.location.href == "http://localhost:3001/choose-upload/desktop") {
      inputButtons.forEach(function(elem) {
        elem.addEventListener("click", () => {
          window.location = "/desktop/direct-input";
        });
      });
    }

    if (window.location.href == "http://localhost:3001/choose-upload/mobile-and-desktop") {
      inputButtons.forEach(function(elem) {
        elem.addEventListener("click", () => {
          window.location = "/mobile-and-desktop/direct-input";
        });
      });
    }

    document.getElementById("start").addEventListener("click", () => {
      window.location = "/choose-format";
    });
  }
})();
