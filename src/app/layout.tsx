import type { Metadata } from "next";
import { Lilex } from "next/font/google";
import "./globals.css";
import DarkLightToggle from "@/components/DarkLightToggle";

const lilexSans = Lilex({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oli GD",
  description: "Oliver Goodwin-Day's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lilexSans.className} antialiased`}
      >
        <DarkLightToggle />
        {children}
      </body>
    </html>
  );
}
