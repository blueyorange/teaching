import { Marp } from "@marp-team/marp-core";
import fs from "fs";
import path from "path";
import template from "./template.js";
import chalk from "chalk";
import { Element } from "@marp-team/marpit";
import YAML from "yaml";
import readCssFiles from "./helpers/readCssFiles.js";

// Copies all files from source to destination directories
// Except markdown files which are converted to slides using marp

// read marp config file
const marpOptions = YAML.parse(
  fs.readFileSync(".marprc.yml", { encoding: "utf-8" })
);
// must be set for bespoke to work properly
marpOptions.container = [new Element("div", { id: "p" })];
// initialise marp
const marp = new Marp(marpOptions);
// add themes to marp instance
readCssFiles(marpOptions.themeDir).forEach((themeCss) => {
  marp.themeSet.add(themeCss.content);
});

// render function
const render = (markdown) => template(marp.render(markdown));

// console messages
const successMessage = (message) =>
  console.log(chalk.bgGreen.gray(" OK ") + " " + message);
const errorMessage = (message) =>
  console.log(chalk.bgRed.gray("   ERROR    ") + " " + message);

// specify source and destination directories
const sourceDirectory = "test";
const targetDirectory = "dist";

// Set options for marp
// const marpOptions = {
//   inlineSVG: true,
//   markdown: {
//     html: true,
//   },
//   container: [new Element("div", { id: "p" })],
// };
// create marp instance

// copy and render files
async function processDirectory(sourceDir, targetDir) {
  const items = fs.readdirSync(sourceDir);

  // cycle through files in current directory
  for (const item of items) {
    const sourcePath = path.join(sourceDir, item);
    const targetPath = path.join(targetDir, item);

    if (fs.statSync(sourcePath).isDirectory()) {
      fs.mkdirSync(targetPath, { recursive: true });
      // recursively apply function to all subdirectories
      await processDirectory(sourcePath, targetPath);
    } else {
      if (path.extname(item) === ".md") {
        // If the file has a ".md" extension, convert it to Marp Markdown and render as HTML
        const markdownContent = fs.readFileSync(sourcePath, "utf-8");

        const htmlFileName = path.basename(item, ".md") + ".html";
        const htmlTargetPath = path.join(targetDir, htmlFileName);
        let renderedHtml;
        try {
          renderedHtml = render(markdownContent);
        } catch (error) {
          console.log(chalkError("   ERROR  ") + error);
        }
        try {
          fs.writeFileSync(htmlTargetPath, renderedHtml);
          successMessage(htmlTargetPath);
        } catch (error) {
          errorMessage(` Couldn't write to file ${htmlTargetPath}, ${error}`);
        }
      } else {
        // For non-.md files, simply copy them to the target directory
        try {
          fs.copyFileSync(sourcePath, targetPath);
          successMessage(targetPath);
        } catch (error) {
          errorMessage(targetPath);
        }
      }
    }
  }
}

function copyFilesAndConvertMd(sourceDir, targetDir) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  processDirectory(sourceDir, targetDir);
}

copyFilesAndConvertMd(sourceDirectory, targetDirectory);
