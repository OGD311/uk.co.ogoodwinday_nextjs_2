import { writeFile } from "fs/promises";
import "dotenv/config";

const query = `
        query {
        user(login: "OGD311") {
            repositories(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
                nodes {
                    name
                    description
                    url
                    stargazerCount
                    forkCount
                    updatedAt
                    pushedAt
                    languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
                        totalSize
                        edges {
                            size
                            node {
                                name
                            }
                        }
                    }
                    defaultBranchRef {
                        name
                        target {
                            ... on Commit {
                                history {
                                    totalCount
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

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