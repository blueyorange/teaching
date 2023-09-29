import katex from "katex";
import "katex/contrib/mhchem";

export default {
  options: {
    math: {
      lib: katex,
      katexFontPath: "https://example.com/assets/katex-fonts/",
      katexOption: {
        errorColor: "#ff0000",
        macros: {
          "\\RR": "\\mathbb{R}",
        },
      },
    },
  },
};
