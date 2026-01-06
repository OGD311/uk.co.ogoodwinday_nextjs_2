"use client"
import IconLink from "@/components/IconLink";
import Link from "next/link";
import { FaAmilia, FaBlog, FaGithub, FaLink, FaLinkedin, FaMailBulk, FaMandalorian } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  return (
    <main className="w-full h-full text-foreground bg-background">

      <div id="home" className="w-screen h-screen flex rounded-b-2xl" style={{
        backgroundSize: "40px 40px",
        backgroundImage: "radial-gradient(circle, var(--foreground) 1px, var(--background) 1px)"
      }}>
        <div className="w-1/3 h-1/5 justify-between self-center ml-20 flex flex-col px-2 py-2 backdrop-blur-sm rounded-xl">
          <h1 className="text-6xl font-bold min-h-12">
            <Typewriter words={["Student", "Developer", "Entrepreneur"]} loop />
          </h1>
          <div className="flex w-full text-6xl gap-2">
            <IconLink url="https://github.com/ogd311">
              <FaGithub />
            </IconLink>

            <IconLink url="https://github.com/ogd311">
              <FaLinkedin />
            </IconLink>
          </div>
        </div>
      </div>

    </main>
  );
}
