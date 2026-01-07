export const query = `
        query {
        user(login: "OGD311") {
            repositories(first: 20, orderBy: {field: CREATED_AT, direction: DESC}) {
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