export default (content) =>
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
    <link rel="stylesheet" href="/css/bespoke.css" />
  </head>
  <body>
    <div class="bespoke-marp-osc">
      <button data-bespoke-marp-osc="prev" tabindex="-1" title="Previous slide">
        Previous slide</button
      ><span data-bespoke-marp-osc="page"></span
      ><button data-bespoke-marp-osc="next" tabindex="-1" title="Next slide">
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
    ${content}
    <script src="/js/bespoke.js"></script>
  </body>
</html>`;
