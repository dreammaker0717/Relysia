const functions = require("firebase-functions");
const next = require("next");

const isDev = process.env.NODE_ENV !== "production";

const server = next({
  dev: isDev,
  //location of .next generated after running -> yarn build
  conf: { distDir: ".next" },
});

const nextjsHandle = server.getRequestHandler();
exports.nextServer = functions.https.onRequest((req, res) => {
  res.set("Cache-Control", "public, max-age=300,s-maxage=10000");
  return server.prepare().then(() => nextjsHandle(req, res));
});
