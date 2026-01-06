"use client"
import IconLink from "@/components/IconLink";
import { useEffect, useRef } from "react";
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

    let gap = 40;
    let size = 1;

    const drawBackground = () => {
      for (let x = 0; x < canvas.width; x += gap) {
        for (let y = 0; y < canvas.height; y += gap) {
          context.fillStyle = 'white';
          context.fillRect(x, y, size, size);
        }
      }
    }

    drawBackground();

  }, []);

  return (
    <main className="w-full h-full text-foreground bg-background">

      <div id="home" className="w-screen h-screen flex rounded-b-2xl">
        <canvas ref={canvasRef} className="absolute w-full h-full"/>
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
