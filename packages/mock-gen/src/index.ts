import { generateMockData } from "@/generate";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "./dist";
const OUT_FILE = "out.json";

const exists = () => existsSync(OUT_DIR);
const cleanup = () => rmSync(OUT_DIR, { force: true, recursive: true });
const setup = () => mkdirSync(OUT_DIR);

function main() {
  if (exists()) cleanup();
  setup();

  const fileContents = JSON.stringify(generateMockData(), undefined, 2);
  const filePath = join(OUT_DIR, OUT_FILE);
  writeFileSync(filePath, fileContents, { flag: "w" });
}

main();
