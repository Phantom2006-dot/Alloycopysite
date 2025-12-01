import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const navLinkClass = ({ isActive }) =>
    `relative text-[13px] font-medium tracking-[0.08em] uppercase transition-all duration-300 py-2 ${
      isActive 
        ? 'text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-white' 
        : 'text-gray-400 hover:text-white'
    }`

  const mobileNavLinkClass = ({ isActive }) =>
    `block text-2xl font-light tracking-[0.15em] uppercase transition-all duration-300 py-4 ${
      isActive ? 'text-white' : 'text-gray-400 hover:text-white'
    }`

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            <div className="hidden lg:flex items-center space-x-12">
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
              <NavLink to="/books" className={navLinkClass}>Books</NavLink>
              <NavLink to="/tv" className={navLinkClass}>TV</NavLink>
              <NavLink to="/films" className={navLinkClass}>Film</NavLink>
            </div>

            <Link to="/" className="flex-shrink-0 relative z-50">
              <div className="flex flex-col items-center group">
                <div className="flex items-center justify-center mb-1.5 transition-transform duration-300 group-hover:scale-105">
                  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="17" cy="17" r="7" fill="white"/>
                    <circle cx="31" cy="17" r="7" fill="white"/>
                    <circle cx="17" cy="31" r="7" fill="white"/>
                    <circle cx="31" cy="31" r="7" fill="white"/>
                  </svg>
                </div>
                <span className="text-[11px] tracking-[0.2em] uppercase">
                  <span className="font-light">bauhaus</span>
                  <span className="font-semibold">production</span>
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-12">
              <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
              <NavLink to="/team" className={navLinkClass}>Team</NavLink>
              <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center group"
              aria-label="Toggle menu"
            >
              <span 
                className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-[6px]' : ''
                }`}
              />
              <span 
                className={`block w-6 h-[2px] bg-white my-1 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0 scale-0' : ''
                }`}
              />
              <span 
                className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="absolute inset-0 bg-black/98 backdrop-blur-lg"
          onClick={() => setIsMenuOpen(false)}
        />
        
        <div 
          className={`relative z-10 h-full flex flex-col items-center justify-center transition-all duration-500 delay-100 ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <nav className="flex flex-col items-center space-y-2">
            <NavLink to="/" className={mobileNavLinkClass}>Home</NavLink>
            <NavLink to="/books" className={mobileNavLinkClass}>Books</NavLink>
            <NavLink to="/tv" className={mobileNavLinkClass}>TV</NavLink>
            <NavLink to="/films" className={mobileNavLinkClass}>Film</NavLink>
            <div className="w-16 h-px bg-gray-700 my-6" />
            <NavLink to="/about" className={mobileNavLinkClass}>About Us</NavLink>
            <NavLink to="/team" className={mobileNavLinkClass}>Team</NavLink>
            <NavLink to="/contact" className={mobileNavLinkClass}>Contact</NavLink>
          </nav>
        </div>
      </div>
    </>
  )
}
