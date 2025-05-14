"use strict";
/**
 *
 * @param {string} input
 * @param {string} template Template for a search query.
 * @returns {string} Fully qualified URL
 */
function search(input, template) {
  // Inject Eruda into THIS PAGE fix?
  (function injectEruda() {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/eruda";
    script.onload = () => eruda.init();
    document.body.appendChild(script);
  })();

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

  return url;
}
