import { rmdirSync, mkdirSync, existsSync } from "node:fs";
import { generateMockData } from "@/index";

const OUT_DIR = "./out";
function exists() {
  return existsSync(OUT_DIR);
}
function cleanup() {
  rmdirSync(OUT_DIR);
}
function setup() {
  mkdirSync(OUT_DIR);
}

function main() {
  if (exists()) cleanup();
  setup();

  generateMockData();
}

main();
