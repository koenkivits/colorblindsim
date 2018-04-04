#!/usr/bin/env node

const fs = require("fs");
const { Script } = require("vm");
const { JSDOM } = require("jsdom");

const dist = __dirname + "/../dist";
const filename = dist + "/index.html";

function beforeParse(window) {
  window.inPrerender = true;
}

/**
 * Convert Open Graph and Twitter image URLs to absolute, because they won't work otherwise.
 */
function absolutizeMeta(dom) {
  const metas = dom.window.document.querySelectorAll("meta");
  [].forEach.call(metas, meta => {
    const metaName = meta.getAttribute("name");
    const metaProp = meta.getAttribute("property");

    if (
      metaName === "msapplication-config" ||
      metaName === "twitter:image" ||
      metaProp === "og:image"
    ) {
      meta.setAttribute(
        "content",
        "https://www.colorblindsim.com/" + meta.getAttribute("content"),
      );
    }
  });
}

console.log("Prerendering index.html ...");

JSDOM.fromFile(filename, {
  beforeParse,
  resources: "usable",
  runScripts: "dangerously",
}).then(dom => {
  const renderInterval = setInterval(() => {
    if (dom.window.document.querySelector("h1")) {
      absolutizeMeta(dom);
      fs.writeFileSync(filename, dom.serialize());
      clearInterval(renderInterval);
      console.log("DONE.");
    }
  });
});
