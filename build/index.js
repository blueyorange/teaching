import { Marp } from "@marp-team/marp-core";
import fs from "fs/promises";
import path from "path";
import template from "./template.js";

passthroughCopy = ["js, css"];

// Convert Markdown slide deck into HTML and CSS
const marp = new Marp();
const { html, css } = marp.render("# Hello, marp-core!");

// array to store folder and file names
const entries = [];

async function build(directoryPath) {
  const items = await fs.readdir(directoryPath);
  const indexFilePath = path.join(directoryPath, "index.html");

  items.forEach(async (item) => {
    const itemPath = path.join(directoryPath, itemName);
    const stats = await fs.stat(itemPath);

    if (stats.isDirectory()) {
      entries.push("- [itemName](/)");
    }
  });
}
