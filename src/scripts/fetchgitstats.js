import { writeFile } from "fs/promises";
import "dotenv/config";
import { query } from "../constants/githubQuery.js"

const result = await fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    "Content-Type": "application/json",
    "User-Agent": "ogd311-portfolio"
  },
  body: JSON.stringify({ query })
})

if (!result.ok) {
  console.log(result);
} else {
  const data = await result.json();
  data.dateBuilt = new Date().toISOString();
  await writeFile("public/gitstats.json", JSON.stringify(data, null, 2));
  console.log("gitstats.json successfully written!")
}