"use client"
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, ChevronDown } from 'lucide-react'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#about' },
    { label: 'Pricing', href: '#pricing' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-sky-500/5' 
          : 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center 
            shadow-lg shadow-sky-500/30 group-hover:shadow-xl group-hover:shadow-sky-500/40 transition-all duration-300
            group-hover:scale-105">
            <span className="text-white font-bold text-base">S</span>
          </div>
          <span className="text-white font-semibold text-xl hidden sm:block bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
            Scrubi
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:flex">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative px-4 py-2 text-sm font-medium text-slate-300 
                      transition-all duration-200 hover:text-white
                      group"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute inset-0 rounded-lg bg-slate-800/50 opacity-0 
                      group-hover:opacity-100 transition-opacity duration-200"></span>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 
                      bg-gradient-to-r from-sky-400 to-blue-500 group-hover:w-3/4 
                      transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LoginLink postLoginRedirectURL="/dashboard">
              <Button 
                variant="outline"
                className="border-slate-700 bg-transparent text-slate-300 hover:text-white 
                  hover:bg-slate-800/50 hover:border-slate-600
                  transition-all duration-200 hidden sm:flex font-medium"
              >
                Login
              </Button>
            </LoginLink>
            <RegisterLink>
              <Button 
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 
                  text-white shadow-lg shadow-sky-500/20 hover:shadow-xl hover:shadow-sky-500/30
                  transition-all duration-300 hidden sm:flex group font-medium"
              >
                Get Started
                <ChevronDown className="ml-1 w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </Button>
            </RegisterLink>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="block rounded-lg p-2 text-slate-300 transition-all duration-200 
                hover:bg-slate-800/50 hover:text-white md:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-2 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/50">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-4 py-3 text-base font-medium text-slate-300 rounded-lg
                hover:text-white hover:bg-slate-800/50 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 space-y-2 border-t border-slate-800/50">
            <LoginLink postLoginRedirectURL="/dashboard">
              <Button 
                variant="outline"
                className="w-full border-slate-700 bg-transparent text-slate-300 hover:text-white 
                  hover:bg-slate-800/50 hover:border-slate-600 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Button>
            </LoginLink>
            <RegisterLink>
              <Button 
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 
                  text-white shadow-lg shadow-sky-500/20 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Button>
            </RegisterLink>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header