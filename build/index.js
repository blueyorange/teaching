import { Marp } from "@marp-team/marp-core";
import fs from "fs";
import path from "path";
import template from "./template.js";
import chalk from "chalk";
import { Element } from "@marp-team/marpit";
import YAML from "yaml";
import readCssFiles from "./helpers/readCssFiles.js";
import slugify from "slugify";

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
const sourceBaseDirectory = marpOptions.sourceDirectory;
const targetBaseDirectory = marpOptions.destinationDirectory;

// copy and render files
async function processDirectory(sourceDir, targetDir) {
  const items = fs.readdirSync(sourceDir);
  const currentDirName = path.basename(targetDir);
  let indexMarkdown = `<!-- theme: ${marpOptions.indexFileTheme} -->\n# [..](../)/${currentDirName}\n\n`;

  // cycle through files in current directory
  for (const item of items) {
    const sourcePath = path.join(sourceDir, item);
    const title = path.basename(item, ".md");
    const slug = slugify(title);
    const targetPath = path.join(targetDir, slug);
    const targetURL = "/" + path.relative(targetBaseDirectory, targetPath);

    if (fs.statSync(sourcePath).isDirectory()) {
      fs.mkdirSync(targetPath, { recursive: true });
      indexMarkdown += `- [${title}](${targetURL})\n`;
      // recursively apply function to all subdirectories
      await processDirectory(sourcePath, targetPath);
    } else {
      if (path.extname(item) === ".md") {
        // If the file has a ".md" extension, convert it to Marp Markdown and render as HTML
        const markdownContent = fs.readFileSync(sourcePath, "utf-8");
        const title = path.basename(targetPath, ".md");
        const htmlTargetPath = targetPath + ".html";
        const htmlURL = targetURL + ".html";
        let renderedHtml;
        try {
          renderedHtml = render(markdownContent);
        } catch (error) {
          errorMessage("error");
        }
        try {
          fs.writeFileSync(htmlTargetPath, renderedHtml);
          successMessage(htmlTargetPath);
          indexMarkdown += `- [${title}](${htmlURL})\n`;
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
  const indexHtml = render(indexMarkdown);
  const indexFilePath = path.join(targetDir, "index.html");
  fs.writeFileSync(indexFilePath, indexHtml, { encoding: "utf-8" });
}

function copyFilesAndConvertMd(sourceDir, targetDir) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  processDirectory(sourceDir, targetDir);
}

copyFilesAndConvertMd(sourceBaseDirectory, targetBaseDirectory);
