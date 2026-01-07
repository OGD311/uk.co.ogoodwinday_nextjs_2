"use client"
import ChessLoader from "@/components/ChessLoader";
import IconLink from "@/components/IconLink";
import ProjectCard from "@/components/ProjectCard";
import SectionPopout from "@/components/SectionPopout";
import { GitStats } from "@/types/gitstats";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement | null;
    if (!canvas) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    let mouseX: number = canvas.width / 2;
    let mouseY: number = canvas.height / 2;
    let currentX: number = mouseX;
    let currentY: number = mouseY;
    
    const gap = 40;
    const size = 15;
    const curvePower = 1.2;
    const smoothingFactor = 0.3;
    
    
    const drawBackground = (currentX: number, currentY: number) => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = getComputedStyle(document.body).getPropertyValue('--foreground') || '#fff';
      for (let x = Math.floor(size/2); x < canvas.width; x += gap) {
        for (let y = Math.floor(size/2); y < canvas.height; y += gap) {
          let distanceToMouse = Math.sqrt(Math.pow(x - currentX, 2) + Math.pow(y - currentY, 2))
          let normalisedDistance = mapRange(distanceToMouse, 0, 300, 0, 1)
          let inverseDistance = mapRange(normalisedDistance, 0, 1, 1, 0);
          
          inverseDistance = Math.min(Math.max(inverseDistance, 0), 1);
          
          let finalSize = size * (inverseDistance ** curvePower);
          if (finalSize < 2) { finalSize = 2; }
          
          context.fillRect(x-finalSize, y-finalSize, finalSize*2, finalSize*2);
        }
      }
    }
    
    function mapRange(value: number, sourceStart: number, sourceEnd: number, targetStart: number, targetEnd: number): number {
      return (((value - sourceStart) / (sourceEnd - sourceStart)) * (targetEnd - targetStart) + targetStart);
    }

    let frameId: number | null = null;
    let lastTime: number | null = null;

    function animate() {
      const now = performance.now();
      const deltaTime = frameId ? (now - (lastTime ?? now)) / 16.67 : 1;

      lastTime = now;
      currentX += (mouseX - currentX) * (1 - Math.pow(1 - smoothingFactor, deltaTime));
      currentY += (mouseY - currentY) * (1 - Math.pow(1 - smoothingFactor, deltaTime));

      console.log(currentX, currentY)
      console.log(mouseX, mouseY)
      
      drawBackground(currentX, currentY);
      frameId = requestAnimationFrame(animate);
    }

    animate();

    const mousePosition = (event: MouseEvent) => {
      mouseX = event.offsetX;
      mouseY = event.offsetY;
    }
    
    function resizeCanvas(canvas: HTMLCanvasElement) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    const resizeHandler = () => resizeCanvas(canvas);
    window.addEventListener('resize', resizeHandler);
    canvas.addEventListener('mousemove', (e) => {mousePosition(e)});
    return () => {
      canvas.removeEventListener('mousemove', mousePosition);
      window.removeEventListener('resize', resizeHandler);
      if (frameId) { cancelAnimationFrame(frameId) };
    }
  }, []);


  const [loading, setLoading] = useState(false);
  const [isLiveSource, setIsLiveSource] = useState(false);
  const [error, setError] = useState("");
  const [gitStats, setGitStats] = useState<GitStats>();

  useEffect(() => {
    async function loadGitStats() {
      try {
        setLoading(true);

        let response = await fetch("/api/gitstats");
        
        if (response.ok) {
          setGitStats(await response.json());
          setIsLiveSource(true);
        } else {
          let response = await fetch("/gitstats.json");
          setGitStats(await response.json());
          setIsLiveSource(false);
        }
      } catch {
        setError("No projects could be loaded")
      } finally {
        setLoading(false);
      }
        
    }

    loadGitStats();
  }, [])

  return (
    <main className="w-full h-full text-foreground bg-background">
      <SectionPopout sections={["home", "projects", "experience"]} />

      <div id="home" className="w-screen h-screen flex rounded-b-2xl">
        <canvas ref={canvasRef} className="absolute w-full h-full"/>
        <div className="w-1/3 h-1/5 justify-between self-center ml-20 flex flex-col px-2 py-2 backdrop-blur-sm rounded-xl pointer-events-none">
          <h1 className="text-6xl font-bold min-h-12">
            <Typewriter words={["Student", "Developer", "Entrepreneur"]} loop />
          </h1>
          <div className="flex w-full text-6xl gap-2 pointer-events-auto">
            <IconLink url="https://github.com/ogd311">
              <FaGithub />
            </IconLink>

            <IconLink url="https://github.com/ogd311">
              <FaLinkedin />
            </IconLink>
          </div>
        </div>
      </div>

      <div id="projects" className="w-screen h-fit flex overflow-clip">
        <div className="w-full h-full flex flex-col justify-center items-baseline bg-blue-700">
          <div className="flex w-full justify-center mt-5">
            <h2 className="text-center text-5xl">Projects</h2>
            {loading ? (
              <h3 className="text-center">Loading</h3>
            ) : isLiveSource ? (
              <h3 className="text-center">Live</h3>
            ) : (
              <h3 className="text-center">
                {gitStats?.dateBuilt
                  ? new Date(gitStats.dateBuilt).toLocaleString('default', { month: 'short', year: '2-digit' })
                  : new Date().toLocaleString('default', { month: 'short', year: '2-digit' })}
              </h3>
            )}
          </div>
          
            {loading && 
            <div className="w-full min-h-128 h-full flex">
              <ChessLoader />
            </div>}
            {!loading && 
            <div className="relative h-full my-5 flex flex-col gap-5">
              <div
                className="flex whitespace-nowrap pt-5 gap-2"
                style={{
                  animation: "marquee 30s linear infinite",
                }}
                onMouseEnter={e => {
                  (e.currentTarget.style.animationPlayState = "paused");
                }}
                onMouseLeave={e => {
                  (e.currentTarget.style.animationPlayState = "running");
                }}
              >
                {gitStats?.data.user.repositories.nodes.slice(0, 10).map((repo, idx) => (
                  <ProjectCard key={idx} project={repo} />
                ))}
                {gitStats?.data.user.repositories.nodes.slice(0, 10).map((repo, idx) => (
                  <ProjectCard key={`dup-${idx}`} project={repo} />
                ))}
              </div>
              <div
                className="flex whitespace-nowrap pt-5 gap-2"
                style={{
                  animation: "marquee 30s linear infinite reverse",
                }}
                onMouseEnter={e => {
                  (e.currentTarget.style.animationPlayState = "paused");
                }}
                onMouseLeave={e => {
                  (e.currentTarget.style.animationPlayState = "running");
                }}
              >
                {gitStats?.data.user.repositories.nodes.slice(11).map((repo, idx) => (
                  <ProjectCard key={idx} project={repo} />
                ))}
                {gitStats?.data.user.repositories.nodes.slice(11).map((repo, idx) => (
                  <ProjectCard key={`dup-${idx}`} project={repo} />
                ))}
              </div>
            </div>
            }


        </div>
      </div>

      <div id="experience" className="w-screen h-screen flex">
        <div className="w-full h-full bg-green-500">

        </div>

      </div>

    </main>
  );
}
