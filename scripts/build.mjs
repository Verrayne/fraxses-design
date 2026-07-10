import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const requiredFiles = ["src/main.tsx", "src/App.tsx", "src/pages/DocPage.tsx", "src/themes/themeRegistry.ts"];
const missing = requiredFiles.filter((file) => !existsSync(file));

if (missing.length) {
  console.error(`Build failed. Missing required source files:\n${missing.join("\n")}`);
  process.exit(1);
}

mkdirSync("dist", { recursive: true });
writeFileSync(
  "dist/index.html",
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fraxses Design</title>
  </head>
  <body>
    <div id="root">Fraxses Design build artifact generated. Run the dev server for the interactive React app.</div>
  </body>
</html>
`,
);

console.log("Build artifact generated in dist/");
