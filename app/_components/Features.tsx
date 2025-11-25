"use client"
import React from 'react'
import { FileText, PenTool, FolderOpen, Search, Save, Layout } from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: "Block-based Editor",
    description: "Create rich documents with headers, lists, checklists, and paragraphs using a modern block-based editor.",
    color: "text-sky-400"
  },
  {
    icon: PenTool,
    title: "Drawing Canvas",
    description: "Draw diagrams and sketches using an interactive whiteboard canvas. Create visual representations with ease.",
    color: "text-blue-400"
  },
  {
    icon: FolderOpen,
    title: "File Management",
    description: "Organize your documents and drawings in one place. Create, manage, and access all your files easily.",
    color: "text-indigo-400"
  },
  {
    icon: Search,
    title: "Quick Search",
    description: "Find your files instantly with powerful search functionality. Locate documents and diagrams quickly.",
    color: "text-cyan-400"
  },
  {
    icon: Save,
    title: "Save & Sync",
    description: "Manually save your work and keep everything synchronized. Your documents and drawings are always safe.",
    color: "text-emerald-400"
  },
  {
    icon: Layout,
    title: "Dual View",
    description: "View your document editor and drawing canvas side by side. Work on both simultaneously in one workspace.",
    color: "text-violet-400"
  }
]

function Features() {
  return (
    <section id="features" className="relative py-12 sm:py-16 md:py-24 bg-slate-950 border-t border-slate-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
            Everything you need to
            <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent"> build better</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto px-2">
            Simple tools to create documents and draw diagrams for your projects.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl bg-slate-900/50 border border-slate-800 
                  hover:border-sky-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/10
                  backdrop-blur-sm"
              >
                <div className={`inline-flex p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-lg bg-slate-800/50 mb-2 sm:mb-2.5 md:mb-3 lg:mb-4 ${feature.color}`}>
                  <Icon className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white mb-1 sm:mb-1.5 md:mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-snug sm:leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Hover effect gradient */}
                <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-sky-500/0 to-blue-500/0 
                  group-hover:from-sky-500/5 group-hover:to-blue-500/5 transition-all duration-300 pointer-events-none"></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features

