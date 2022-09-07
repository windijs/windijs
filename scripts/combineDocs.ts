import { basename, resolve } from "path";
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "fs";

/* Api pages is build with typedoc, this is a hack to redirect api link */
function transformIndex (entry = "./docs/.vitepress/dist/index.html") {
  let src = readFileSync(entry).toString();
  src = src.replace("href=\"/api.html\"", "style=\"cursor:pointer;\" onclick=\"document.location.href='/api.html'\"");
  writeFileSync(entry, src);
}

function copy (item: string, target: string) {
  const stat = statSync(item);
  if (stat.isDirectory()) {
    if (!existsSync(resolve(target))) mkdirSync(resolve(target));
    readdirSync(item).map(i => copy(resolve(item, i), resolve(target, i)));
  } else {
    copyFileSync(item, target);
  }
}

function copyApi (entry = "./api", target = "./docs/.vitepress/dist") {
  copy(resolve(entry, "modules.html"), resolve(target, "api.html"));
  copy(resolve(entry, "assets"), resolve(target, "assets"));
  readdirSync(entry).filter(i => i !== "assets" && !i.endsWith(".html")).map(i => resolve(entry, i)).map(i => copy(i, resolve(target, basename(i))));
}

transformIndex();
copyApi();
