import './globals.css'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'
import '@fontsource/ibm-plex-sans/700.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import type { Metadata } from 'next'
import NavBar from "../components/NavBar";
import Footer from "@/components/Footer";
import { Analytics } from '@vercel/analytics/react';
import React from "react";

export const metadata: Metadata = {
  title: {
    default: 'Bhargav Oza | Robotics Simulation & RL Engineer',
    template: '%s | Bhargav Oza',
  },
  description: 'Robotics simulation and reinforcement learning engineer. Crucible, my own GPU physics engine for robot learning (CUDA C++, Vulkan), and humanoid imitation learning in MuJoCo MJX and JAX.',
  metadataBase: new URL('https://www.bhargavoza.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-paper font-sans text-ink">
      <NavBar />
      {children}
      <Footer />
      <Analytics />
      </body>
    </html>
  )
}
