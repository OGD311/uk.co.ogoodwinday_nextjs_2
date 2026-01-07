import { GitStats, repository } from "@/types/gitstats";
import { languageColors } from "../../public/languageColors";
import { FaStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import Link from "next/link";

export default function ProjectCard({ project } : { project: repository }) {

    const day = (24 * 60 * 60 * 1000)
    const today = new Date()

    return (
        <Link href={project.url} target="_blank" className="hover:-translate-y-5 transition-all duration-150">
            <div className="w-full border px-5 py-2 min-h-64 min-w-fit rounded-xl mb-2 relative">
                <div className="mb-2 pr-40 relative">
                    <h3 className="text-3xl">{project.name}</h3> 
                    <span className="opacity-70">
                        {project.description ? (project.description).slice(0, 45) + "..." : ''}
                    </span>    
                    <div className="flex gap-5 absolute right-0 top-0">
                        <span className="flex items-center gap-2">
                            {project.stargazerCount} <FaStar className="text-amber-300" />
                        </span>
                        <span className="flex items-center gap-2">
                            {project.forkCount} <FaCodeFork />
                        </span>
                    </div>
                </div>

                <div className="flex justify-between">
                    <span>
                        Created {Math.round(Math.abs((+today - +(new Date(project.pushedAt))) / day))} Days Ago
                    </span>
                    <span>
                        Last Updated {Math.round(Math.abs((+today - +(new Date(project.updatedAt))) / day))} Days Ago
                    </span>
                </div>

                <div className="flex gap-2 items-baseline">        
                    <span>
                        {project.defaultBranchRef.target.history.totalCount} Commits
                    </span>

                    <span className="text-sm opacity-70">
                        {(() => {
                            const days = Math.round(Math.abs((+(new Date(project.updatedAt)) - +(new Date(project.pushedAt))) / day));
                            return days === 0
                                ? project.defaultBranchRef.target.history.totalCount
                                : (project.defaultBranchRef.target.history.totalCount / days).toFixed(2);
                        })()} Commits / Day
                    </span>
                </div>

                <div className="flex w-full flex-col mt-5">

                    <div className="flex w-full h-5 bg-gray-700 rounded-xl overflow-hidden">
                        {project.languages.edges.map((language, idx) => (
                            <span
                                key={idx} 
                                style={{ width: ((language.size / project.languages.totalSize) * 100).toFixed(1) + "%", backgroundColor: languageColors[language.node.name] ? languageColors[language.node.name] : "#333" }}
                                className="h-5 not-last:mr-px">
                            </span>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 w-full h-full justify-between">
                        {project.languages.edges.map((language, idx) => (
                            <div key={idx} className="mr-auto text-md flex items-center">
                                <div 
                                    className="mr-2 w-2 h-2 rounded-full" 
                                    style={{ backgroundColor: languageColors[language.node.name] ? languageColors[language.node.name] : "#333"}}>
                                </div>
                                {language.node.name}

                                <span className="text-sm text-gray-400 ml-1">
                                    {((language.size / project.languages.totalSize) * 100) > 10 ? ((language.size / project.languages.totalSize) * 100).toFixed(0) : ((language.size / project.languages.totalSize) * 100).toFixed(1)}%
                                </span>    
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </Link>
    )
}