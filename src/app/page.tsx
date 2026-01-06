"use client"
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  return (
    <main className="w-full h-full text-foreground bg-background">

      <div id="home" className="w-screen h-screen flex rounded-b-2xl" style={{
        backgroundSize: "40px 40px",
        backgroundImage: "radial-gradient(circle, var(--foreground) 1px, var(--background) 1px)"
      }}>
        <div className="w-1/3 h-1/3 self-center ml-20 text-5xl font-bold flex items-center">
          <Typewriter words={["Student", "Developer", "Entrepreneur"]} />
        </div>
      </div>

    </main>
  );
}
