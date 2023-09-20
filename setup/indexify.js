const fs = require("fs");
const path = require("path");

function listFilesAndFolders(directoryPath) {
  const items = fs.readdirSync(directoryPath);
  const indexFilePath = path.join(directoryPath, "index.html");

  // Initialize an array to store folder and file names
  const entries = [];

  items.forEach((itemName) => {
    const itemPath = path.join(directoryPath, itemName);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      entries.push(
        `<li><a href="${itemName}/index.html">${itemName}/</a></li>`
      );
      listFilesAndFolders(itemPath); // Recursively list contents of subfolders
    } else {
      entries.push(`<li><a href="${itemName}">${itemName}</a></li>`);
    }
  });

  // Create the index.html file with the list of entries
  const indexContent = `
    <html>
    <head>
      <title>Index of ${directoryPath}</title>
    </head>
    <body>
      <h1>Index of ${directoryPath}</h1>
      <ul>
        ${entries.join("\n")}
      </ul>
    </body>
    </html>
  `;

  fs.writeFileSync(indexFilePath, indexContent);
  console.log(`Created index.html for ${directoryPath}`);
}

// Usage: Specify the root directory to start the traversal
const rootDirectory = "/path/to/your/root/directory";
listFilesAndFolders(rootDirectory);
