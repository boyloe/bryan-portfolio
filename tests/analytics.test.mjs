import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

test("root layout includes Vercel Web Analytics", async () => {
  const [packageJson, rootLayout] = await Promise.all([
    readFile(new URL("package.json", projectRoot), "utf8").then(JSON.parse),
    readFile(new URL("app/layout.tsx", projectRoot), "utf8"),
  ]);

  assert.equal(
    typeof packageJson.dependencies?.["@vercel/analytics"],
    "string",
    "@vercel/analytics must be a production dependency",
  );
  assert.match(
    rootLayout,
    /import\s+\{\s*Analytics\s*\}\s+from\s+["']@vercel\/analytics\/next["']/,
    "the root layout must import the Next.js Analytics component",
  );
  assert.match(
    rootLayout,
    /<Analytics\s*\/>/,
    "the root layout must render Analytics on every route",
  );
});
