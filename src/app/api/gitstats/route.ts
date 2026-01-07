import { query } from "@/constants/githubQuery"

export async function GET() {
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

