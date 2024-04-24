import fs from "fs";
const bespokeJs = fs.readFileSync("./build/bespoke.js", { encoding: "utf-8" });
const bespokeCss = fs.readFileSync("./build/bespoke.css", {
  encoding: "utf-8",
});

export default ({ html, css, comments }) =>
  `<!DOCTYPE html>
    <html lang="en-US">
      <head>
        <meta name="author" content="R. Johnson" />
        <meta property="article:author" content="R. Johnson" />
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width,height=device-height,initial-scale=1.0"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <style>
          ${bespokeCss}
        </style>
        <script src="/js/todays-date.js"></script>
        <script src="/js/wave-motion.js"></script>
        <script src="/js/wave-harmonics.js"></script>
      </head>
      <body>
        <div class="bespoke-marp-osc">
          <button
            data-bespoke-marp-osc="prev"
            tabindex="-1"
            title="Previous slide"
          >
            Previous slide</button
          ><span data-bespoke-marp-osc="page"></span
          ><button
            data-bespoke-marp-osc="next"
            tabindex="-1"
            title="Next slide"
          >
            Next slide</button
          ><button
            data-bespoke-marp-osc="fullscreen"
            tabindex="-1"
            title="Toggle fullscreen (f)"
          >
            Toggle fullscreen</button
          ><button
            data-bespoke-marp-osc="presenter"
            tabindex="-1"
            title="Open presenter view (p)"
          >
            Open presenter view
          </button>
        </div>
        <style>
          ${css}
        </style>
        ${html}
        ${comments
          .map((slideComments, index) => {
            return `<div class="bespoke-marp-note" data-index="${index}" tabindex="0">
          ${slideComments.map((comment) => `<p>${comment}</p>`).join("")}
          </div>`;
          })
          .join("")}
        <script>
          ${bespokeJs};
        </script>
      </body>
    </html> `;
