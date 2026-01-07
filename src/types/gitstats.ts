export interface GitStats {
    data: {
        user: {
            repositories: {
                nodes: Array<{
                    name: string;
                    description: string | null;
                    url: string;
                    stargazerCount: number;
                    forkCount: number;
                    updatedAt: string;
                    pushedAt: string;
                    languages: {
                        totalSize: number;
                        edges: Array<{
                            size: number;
                            node: {
                                name: string;
                            };
                        }>;
                    };
                    defaultBranchRef: {
                        name: string
                        target: {
                            history: {
                                totalCount: number;
                            };
                        };
                    };
                }>;
            };
        };
    };
    dateBuilt?: string;
}


export interface repository {
    name: string;
    description: string | null;
    url: string;
    stargazerCount: number;
    forkCount: number;
    updatedAt: string;
    pushedAt: string;
    languages: {
        totalSize: number;
        edges: Array<{
            size: number;
            node: {
                name: string;
            };
        }>;
    };
    defaultBranchRef: {
        name: string;
        target: {
            history: {
                totalCount: number;
            };
        };
    };
}