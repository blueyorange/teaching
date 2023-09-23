import { Marp } from "@marp-team/marp-core";
import fs from "fs";
import path from "path";
import template from "./template.js";

// specify source and destination directories
const sourceDirectory = 'src';
const targetDirectory = 'dist';

const marp = new Marp();

async function processDirectory(sourceDir, targetDir) {
  const items = fs.readdirSync(sourceDir);

  for (const item of items) {
    const sourcePath = path.join(sourceDir, item);
    const targetPath = path.join(targetDir, item);

    if (fs.statSync(sourcePath).isDirectory()) {
      fs.mkdirSync(targetPath, { recursive: true });
      await processDirectory(sourcePath, targetPath);
    } else {
      if (path.extname(item) === ".md") {
        // If the file has a ".md" extension, convert it to Marp Markdown and render as HTML
        const markdownContent = fs.readFileSync(sourcePath, "utf-8");
        const marpOptions = { html: true };
        const { html,css } = marp.render(markdownContent, marpOptions);

        const htmlFileName = path.basename(item, ".md") + ".html";
        const htmlTargetPath = path.join(targetDir, htmlFileName);

        // You may need to replace this step with the actual rendering of the HTML
        // Here, we assume you have a function or library to convert markdown to HTML
        const renderedHtml = template({html, css});

        fs.writeFileSync(htmlTargetPath, renderedHtml);
      } else {
        // For non-.md files, simply copy them to the target directory
        fs.copyFileSync(sourcePath, targetPath);
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
