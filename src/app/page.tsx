import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Hero from "@/components/sections/Hero";
import Journey from "@/components/sections/Journey";
import Projects from "@/components/sections/Projects";
import WhatIBuild from "@/components/sections/WhatIBuild";

export default function Home() {
  return (
    <main className="pt-16">
      <Nav />
      <Hero />
      <WhatIBuild />
      <FeaturedWork />
      <Projects />
      <About />
      <Journey />
      <Contact />
      <Footer />
    </main>
  );
}
