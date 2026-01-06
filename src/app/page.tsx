"use client"
import IconLink from "@/components/IconLink";
import { useEffect, useRef } from "react";
import Marquee from "react-fast-marquee";
import { FaGit, FaGithub, FaLinkedin } from "react-icons/fa";
import { Fa42Group } from "react-icons/fa6";
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

  return (
    <main className="w-full h-full text-foreground bg-background">

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

      <div id="projects" className="w-screen h-screen flex">
        <div className="w-full h-full flex justify-center">

        


        </div>
      </div>

    </main>
  );
}
