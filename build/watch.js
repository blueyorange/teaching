import YAML from "yaml";
import fs from "fs";

const config = YAML.parse(fs.readFileSync(".marprc.yml", "utf-8"));
const { sourceDirectory } = config;

function listener(eventType, filename) {
  console.log(eventType, filename);
}

fs.watch(sourceDirectory, listener);
