import { writeFile, mkdir } from "fs/promises";
import { query } from "../constants/githubQuery.js";

(async () => {
  try {
    console.log("Fetching Git Stats");

    if (!process.env.GITHUB_TOKEN) {
      throw new Error("GITHUB_TOKEN is missing");
    }

    const result = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "ogd311-portfolio"
      },
      body: JSON.stringify({ query })
    });

    if (!result.ok) {
      const text = await result.text();
      throw new Error(`GitHub API failed: ${result.status} ${text}`);
    }

    const data = await result.json();
    data.dateBuilt = new Date().toISOString();

    await mkdir("public", { recursive: true });
    await writeFile(
      "public/gitstats.json",
      JSON.stringify(data, null, 2)
    );

    console.log("Precache: gitstats.json written");
    process.exit(0);
  } catch (err) {
    console.error("Precache failed:", err);
    process.exit(1);
  }
})();
