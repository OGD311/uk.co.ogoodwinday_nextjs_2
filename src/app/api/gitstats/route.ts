export async function GET() {
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
              }
          }
      }
  }`

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
    return new Response("GitHub Api Error", {
      status: 401
    })
  }

  return new Response(await result.text(), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=600"
    }
  })
}

