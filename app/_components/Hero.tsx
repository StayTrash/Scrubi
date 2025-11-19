"use client"
import React from 'react'
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import { ArrowRight, Sparkles, FileText, Users, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Badge */}
      <div className='flex items-center justify-center pt-24 pb-8'>
        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full 
          bg-sky-500/10 border border-sky-500/20 backdrop-blur-sm
          text-sky-300 text-sm font-medium'>
          <Sparkles className="w-4 h-4" />
          <span>See What's New | <span className='text-sky-400 font-semibold'>AI Diagram</span></span>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Documents & diagrams
            </span>
            <br />
            <span className="text-white">
              for engineering teams
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            All-in-one markdown editor, collaborative canvas, and diagram-as-code builder.
            <br className="hidden sm:block" />
            <span className="text-slate-400"> Build, share, and collaborate seamlessly.</span>
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <RegisterLink>
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 
                  text-white px-8 py-6 text-base font-semibold shadow-lg shadow-sky-500/50 
                  hover:shadow-xl hover:shadow-sky-500/50 transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </RegisterLink>
            <Button 
              size="lg" 
              variant="outline"
              className="border-slate-700 bg-slate-900/50 text-slate-200 hover:bg-slate-800 
                hover:text-white px-8 py-6 text-base font-semibold backdrop-blur-sm"
            >
              Learn More
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
              <FileText className="w-4 h-4 text-sky-400" />
              <span className="text-sm text-slate-300">Markdown Editor</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">Real-time Collaboration</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-slate-300">AI-Powered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent"></div>
    </section>
  )
}

export default Hero