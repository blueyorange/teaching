import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { pipeline } from "stream";
import { URL } from "url";

async function downloadImage(imageUrl, imageFilePath) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to download image: ${response.status} ${response.statusText}`
      );
    }

    const fileStream = fs.createWriteStream(imageFilePath);
    await new Promise((resolve, reject) => {
      pipeline(response.body, fileStream, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  } catch (err) {
    console.error(`Error downloading image file ${imageUrl}: ${err}`);
    throw err;
  }
}

export async function processMarkdownFiles(dirPath) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      await processMarkdownFiles(filePath);
    } else if (stats.isFile() && path.extname(file) === ".md") {
      const imagesDir = path.join(
        path.dirname(filePath),
        path.basename(filePath, ".md")
      );
      if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir);
      }

      let fileContents = fs.readFileSync(filePath, "utf-8");

      const imageLinks = fileContents.match(/!\[(.*?)\]\((.*?)\)/g) || [];

      for (const imageLink of imageLinks) {
        const imageMatch = imageLink.match(/!\[(.*?)\]\((.*?)\)/);
        const altText = imageMatch[1];
        const imageUrl = imageMatch[2];

        let imageName = path.basename(imageUrl);
        let imageFilePath = imageUrl;

        if (!imageUrl.startsWith("http") && !imageUrl.startsWith("https")) {
          imageName = path.basename(imageUrl);
          imageFilePath = path.join(path.dirname(filePath), imageUrl);

          const newImageFilePath = path.join(imagesDir, imageName);
          try {
            fs.copyFileSync(imageFilePath, newImageFilePath);
            imageFilePath = newImageFilePath;
          } catch (err) {
            console.error(
              `Error copying image file ${imageFilePath} to ${newImageFilePath}: ${err}`
            );
            continue;
          }
        } else {
          const imageUrlObj = new URL(imageUrl);
          const imageName = path.basename(imageUrlObj.pathname);
          imageFilePath = path.join(imagesDir, imageName);

          try {
            await downloadImage(imageUrl, imageFilePath);
          } catch (err) {
            console.error(`Error downloading image file ${imageUrl}: ${err}`);
            continue;
          }
        }

        // Update the markdown link
        const updatedImageLink = `![${altText}](${path.relative(
          path.dirname(filePath),
          imageFilePath
        )})`;
        fileContents = fileContents.replace(imageLink, updatedImageLink);
      }

      // Write the updated file contents
      try {
        fs.writeFileSync(filePath, fileContents);
      } catch (err) {
        console.error(
          `Error writing updated file contents to ${filePath}: ${err}`
        );
        continue;
      }
    }
  }
}

console.log(process.cwd());
processMarkdownFiles("src", "src/assets/images");
