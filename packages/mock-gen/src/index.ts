import { rmdirSync, mkdirSync, existsSync } from "node:fs";
import { generateMockData } from "@/generate";

const OUT_DIR = "./out";
const exists = () => existsSync(OUT_DIR);
const cleanup = () => rmdirSync(OUT_DIR);
const setup = () => mkdirSync(OUT_DIR);

function main() {
  if (exists()) cleanup();
  setup();

  generateMockData();
}

main();
