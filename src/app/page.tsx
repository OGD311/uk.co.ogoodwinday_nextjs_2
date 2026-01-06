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

    let mouseX: number = canvas.width / 2;
    let mouseY: number = canvas.height / 2;

    const gap = 40;
    const size = 10;
    const curvePower = 1;

    function mapRange(value: number, sourceStart: number, sourceEnd: number, targetStart: number, targetEnd: number): number {
      return (((value - sourceStart) / (sourceEnd - sourceStart)) * (targetEnd - targetStart) + targetStart);
    }

    const drawBackground = () => {
      context.fillStyle = 'white';
      for (let x = 0; x < canvas.width; x += gap) {
        for (let y = 0; y < canvas.height; y += gap) {
          let distanceToMouse = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2))
          let normalisedDistance = mapRange(distanceToMouse, 0, 300, 0, 1)
          let inverseDistance = mapRange(normalisedDistance, 0, 1, 1, 0);

          inverseDistance = Math.min(Math.max(inverseDistance, 0), 1);

          let finalSize = size * (inverseDistance ** curvePower);
          if (finalSize < 2) { finalSize = 2; }

          context.fillRect(x, y, finalSize, finalSize);
        }
      }
    }

    const mousePosition = (event: MouseEvent) => {
      context.reset();
      mouseX = event.offsetX;
      mouseY = event.offsetY;
      drawBackground();
    }

    window.addEventListener('resize', () => resizeCanvas(canvas));

    function resizeCanvas(canvas: HTMLCanvasElement) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawBackground();
    }

    drawBackground();

    canvas.addEventListener('mousemove', (e) => {mousePosition(e)});
    return () => {
      canvas.removeEventListener('mousemove', mousePosition);
      window.removeEventListener('resize', () => resizeCanvas);
    }
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
