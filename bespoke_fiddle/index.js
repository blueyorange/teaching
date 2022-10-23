const { Marp } = require('@marp-team/marp-core')
const fs = require('fs')

const marp = new Marp({ minifyCSS: false, inlineSVG: true });

const md = fs.readFileSync("./presentation.md", "utf-8");

const { html, css } = marp.render(md);
// 4. Use output in your HTML
const htmlFile = `
<!DOCTYPE html>
<html><body>
  <style>${css}</style>
  ${html}
  <script type="module">
  import bespoke from 'https://cdn.skypack.dev/bespoke';
  var deck = bespoke.from('.marpit');
</script>
</body></html>
`;
fs.writeFileSync("example.html", htmlFile);
