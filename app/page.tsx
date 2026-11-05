import React from "react";
import { Hero } from "@/components/Hero";
import { WorkGallery } from "@/components/WorkGallery";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkGallery />
      <Services />
      <About />
      <Contact />
    </>
  );
}

