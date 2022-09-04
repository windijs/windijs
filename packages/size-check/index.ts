import { checkFileSize } from "../../scripts/utils";
import { readdirSync } from "fs";
import { resolve } from "path";

readdirSync("./dist").filter(i => !i.startsWith(".")).map(i => checkFileSize(resolve("./dist", i), true));
