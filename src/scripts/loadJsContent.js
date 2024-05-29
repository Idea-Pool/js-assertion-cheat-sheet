import { readFile } from "node:fs/promises";
import { glob } from "glob";

const jsfiles = await glob(`./src/content/docs/examples/*/*.js`);

export async function loadFileContent(slug) {
  const lastPart = slug?.substring(slug.lastIndexOf("/") + 1);

  const option = slug.includes("tools");

  const regex = new RegExp(`^examples\/([^/]+)\/${lastPart}$`);

  const fileContents = await Promise.all(
    jsfiles
      .filter(
        (fileName) =>
          fileName.toLowerCase().includes(lastPart) || fileName.match(regex)
      )
      .map(async (file) => {
        const content = await readFile(file, { encoding: "utf8" });
        const path = option
          ? file.match(/[^\\]+$/)[0]
          : file.match(/examples\\([^\\]+)\\/)[1];

        return { path, content };
      })
  );
  return fileContents;
}
