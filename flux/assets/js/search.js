"use strict";
/**
 *
 * @param {string} input
 * @param {string} template Template for a search query.
 * @returns {string} Fully qualified URL
 */
function search(input, template) {
  let url;

  try {
    url = new URL(input).toString();
  } catch {
    try {
      const temp = new URL(`http://${input}`);
      if (temp.hostname.includes(".")) {
        url = temp.toString();
      }
    } catch {}
  }

  if (!url) {
    url = `https://www.bing.com/search?q=${encodeURIComponent(input)}`;
  }

  // Open the new page in a new window and inject Eruda
  const win = window.open(url, "_blank");
  if (win) {
    // Inject Eruda after the page loads — only works if CORS allows or it's a blank page
    win.onload = function () {
      const script = win.document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/eruda";
      script.onload = () => win.eruda.init();
      win.document.body.appendChild(script);
    };
  }

  return url;
}
