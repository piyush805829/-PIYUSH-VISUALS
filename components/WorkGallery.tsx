"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Sparkles, Layers, SlidersHorizontal } from "lucide-react";
import { PROJECTS, CATEGORIES, Project } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";

export function WorkGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [onlyFeatured, setOnlyFeatured] = useState<boolean>(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Compute category item counts
  const categoriesWithCounts = useMemo(() => {
    return CATEGORIES.map((cat) => {
      if (cat.id === "all") {
        return { ...cat, count: PROJECTS.length };
      }
      const count = PROJECTS.filter((p) => p.category === cat.id).length;
      return { ...cat, count };
    });
  }, []);

  // Filtered project list
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;
      const matchesFeatured = onlyFeatured ? project.featured : true;
      return matchesCategory && matchesFeatured;
    });
  }, [selectedCategory, onlyFeatured]);

  return (
    <section id="work" className="py-24 sm:py-32 relative border-b border-white/[0.08]">
      {/* Background radial accent */}
      <div className="pointer-events-none absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#D6FF48]/[0.02] blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D6FF48]">
                [ 02 // ARCHIVE ]
              </span>
              <span className="text-white/20">/</span>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                {PROJECTS.length} PRODUCTION EDITS
              </span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
              SELECTED WORK
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Featured Only Toggle Button */}
            <button
              onClick={() => setOnlyFeatured(!onlyFeatured)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider border transition-all duration-300 ${
                onlyFeatured
                  ? "border-[#D6FF48] bg-[#D6FF48] text-black font-bold shadow-[0_0_20px_rgba(214,255,72,0.3)]"
                  : "border-white/10 bg-white/[0.03] text-neutral-300 hover:border-white/30"
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${onlyFeatured ? "fill-black" : "text-[#D6FF48]"}`} />
              <span>{onlyFeatured ? "Showing Featured" : "Filter Featured"}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Category Filtering Bar */}
        <div className="py-8 overflow-x-auto no-scrollbar border-b border-white/[0.06]">
          <div className="flex items-center gap-2 min-w-max">
            {categoriesWithCounts.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`group relative px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? "bg-white text-black font-bold shadow-md"
                      : "bg-[#111111] text-neutral-400 hover:text-white hover:bg-neutral-900 border border-white/[0.08]"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? "bg-black text-[#D6FF48]"
                        : "bg-white/[0.06] text-neutral-400 group-hover:text-neutral-200"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filter Summary Bar */}
        <div className="py-4 flex items-center justify-between text-xs font-mono text-neutral-400">
          <div>
            Showing <span className="text-[#D6FF48] font-bold">{filteredProjects.length}</span>{" "}
            {filteredProjects.length === 1 ? "project" : "projects"}
            {selectedCategory !== "all" && (
              <span> in <span className="text-white">{selectedCategory}</span></span>
            )}
          </div>
          {selectedCategory !== "all" && (
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-[#D6FF48] hover:underline uppercase text-[11px]"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Responsive Video Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: Math.min(idx * 0.03, 0.3) }}
                className={project.aspectRatio === "16:9" ? "sm:col-span-2 lg:col-span-2" : ""}
              >
                <ProjectCard
                  project={project}
                  onSelect={(p) => setActiveProject(p)}
                  index={idx}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="py-24 text-center border border-dashed border-white/10 my-8">
            <p className="font-editorial text-2xl text-neutral-400 uppercase">
              No projects found in this category
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setOnlyFeatured(false);
              }}
              className="mt-4 px-6 py-2.5 bg-[#D6FF48] text-black font-mono text-xs uppercase tracking-widest font-bold"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Project Viewer Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}

