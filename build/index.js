import { Marp } from "@marp-team/marp-core";
import fs from "fs";
import path from "path";
import template from "./template.js";
import chalk from 'chalk';

// specify source and destination directories
const sourceDirectory = 'test';
const targetDirectory = 'dist';

const marpOptions = { html: true };
const marp = new Marp(marpOptions);

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

        const htmlFileName = path.basename(item, ".md") + ".html";
        const htmlTargetPath = path.join(targetDir, htmlFileName);

        const renderedHtml = template(marp.render(markdownContent));

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
