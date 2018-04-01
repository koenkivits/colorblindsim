#!/usr/bin/env node

const fs = require("fs");
const { Script } = require("vm");
const { JSDOM } = require("jsdom");

const dist = __dirname + "/../dist";
const filename = dist + "/index.html";

function beforeParse(window) {
  window.inPrerender = true;
}

console.log("Prerendering index.html ...");

JSDOM.fromFile(filename, {
  beforeParse,
  resources: "usable",
  runScripts: "dangerously",
}).then(dom => {
  const renderInterval = setInterval(() => {
    if (dom.window.document.querySelector("h1")) {
      fs.writeFileSync(filename, dom.serialize());
      clearInterval(renderInterval);
      console.log("DONE.");
    }
  });
});
