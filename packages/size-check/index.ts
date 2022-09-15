import { readdirSync } from "fs";
import { resolve } from "path";

import { checkFileSize } from "../../scripts/utils";

readdirSync("./dist")
  .filter(i => !i.startsWith("."))
  .map(i => checkFileSize(resolve("./dist", i), true));
