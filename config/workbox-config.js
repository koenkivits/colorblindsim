module.exports = {
  globDirectory: "./dist/",
  globPatterns: ["**/*.{html,js,css,svg}"],
  swDest: "./dist/sw.js",
  clientsClaim: true,
  skipWaiting: true,
};
