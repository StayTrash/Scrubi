"use client"
import React from 'react'
import { Github, Twitter, Linkedin } from 'lucide-react'

function Footer() {
  return (
    <footer className="relative border-t border-slate-800/50 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-white font-semibold text-lg">Scrubi</span>
            </div>
            <p className="text-slate-400 max-w-md">
              All-in-one markdown editor, collaborative canvas, and diagram-as-code builder 
              for modern engineering teams.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-slate-400 hover:text-white transition">Features</a></li>
              <li><a href="#pricing" className="text-slate-400 hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition">Documentation</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-slate-400 hover:text-white transition">About</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition">Blog</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Scrubi. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-400 hover:text-white transition" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition" aria-label="Github">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

