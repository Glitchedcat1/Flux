"use strict";

/**
 *
 * @param {string} input
 * @param {string} template Template for a search query.
 * @returns {string} Fully qualified URL
 */

// Load Eruda on page load
(function loadEruda() {
  fetch("https://cdn.jsdelivr.net/npm/eruda")
    .then((res) => res.text())
    .then((data) => {
      eval(data);
      if (!window.erudaLoaded) {
        eruda.init({ defaults: { displaySize: 45, theme: "AMOLED" } });
        window.erudaLoaded = true;
      }
    });
})();

function search(input, template) {
  try {
    // input is a valid URL:
    return new URL(input).toString();
  } catch (err) {
    // input was not a valid URL
  }

  try {
    const url = new URL(`http://${input}`);
    if (url.hostname.includes(".")) return url.toString();
  } catch (err) {
    // input was not valid URL
  }

  // Treat the input as a search query
  return `https://www.bing.com/?q=${encodeURIComponent(input)}`;
}
