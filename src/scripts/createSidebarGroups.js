import fs from "node:fs/promises";

const path = "./src/content/docs";

const ucfirst = s => s[0].toUpperCase() + s.slice(1);

export const createSidebarGroups = async () => {
  const dirs = await fs.readdir(path);
  const subDirectories = [];

  for (const file of dirs) {
    const stat = await fs.stat(path + "/" + file);
    if (stat.isDirectory() && file !== "examples") {
      subDirectories.push(file);
    }
  }

  return subDirectories.map((directory) => {
    return {
      label: ucfirst(directory),
      collapsed: true,
      autogenerate: {
        directory,
      },
    };
  });
}