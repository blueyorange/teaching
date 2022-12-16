const fs = require("fs");
const path = require("path");
const dedent = require("./dedent");

function incHeaderLevel(text) {
  return text.replace(/^#+/gm, (match) => "#" + match);
}

function replaceLetteredListsWithNumbers(text) {
  return text.replace(/^\([a-z]\)/gm, (match) => {
    return String(match.charCodeAt(1) - 96) + ".";
  });
}

function mdToObj(text) {
  let level = 1;
  function objFromText(text) {
    const headerReByLevel = (level) => new RegExp(`^#{${level}}\\s(.*)$`, "gm");
    let splitText = text.split(headerReByLevel(level));
    if (splitText.length == 1) {
      return splitText[0];
    }
    return splitText.reduce((acc, curr, i, arr) => {
      if (i % 2 === 1) {
        acc[curr] = arr[i + 1];
      }
      return acc;
    }, {});
  }
  function recurse(obj) {
    level += 1;
    Object.keys(obj).forEach((key) => {
      obj[key] = objFromText(obj[key]);
      if (typeof obj[key] === "string") {
        return;
      } else {
        return recurse(obj[key]);
      }
    });
    level -= 1;
    return;
  }
  const firstObj = objFromText(text);
  recurse(firstObj);
  return firstObj;
}

function flattenObj(obj, parent, res = {}) {
  for (let key in obj) {
    let propName = parent ? parent + "/" + key : key;
    if (typeof obj[key] == "object") {
      flattenObj(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
}

function objToDir(obj, func) {
  // creates a folder for Each key in a flat object (recursively)
  // func is a function which is passed the key and the value as an object
  // and could be used to create a file based on the key and value
  Object.keys(obj).forEach((key) => {
    if (!fs.existsSync(key)) {
      fs.mkdirSync(key, { recursive: true });
    }
    if (func) {
      func(key, obj[key]);
    }
  });
}

function createTextFile(key, content) {
  const [course, module, topic, subtopic] = key.split("/");
  console.log(key);
  const str = dedent`
  ---
  marp: true
  theme: default
  math: mathjax
  paginate: true
  author: R. Johnson
  style: |
    section.objectives > ol > li {
        list-style-type: lower-alpha;
    }
  ---
  
  # ${course}
  ## ${module}
  ### ${topic}

  ---

  <!-- _class: objectives -->

  ![bg left:30%](https://images.unsplash.com/photo-1492962827063-e5ea0d8c01f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2121&q=80)
  ## ${subtopic}
  ${content}
  
  ---`;

  const pathToFile = path.join(key, `${topic}_slides.md`);
  fs.writeFileSync(pathToFile, str);
}

let text = fs.readFileSync("GCSE Physics.md", "utf-8");
const obj = mdToObj(text);
const flatObj = flattenObj(obj);
process.chdir("../src/GCSE Physics AQA");
objToDir(flatObj, createTextFile);
