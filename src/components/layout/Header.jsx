import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const navLinkClass = ({ isActive }) =>
    `text-sm tracking-wider transition-colors duration-300 ${
      isActive ? 'text-white' : 'text-gray-400 hover:text-white'
    }`

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-black'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="hidden lg:flex items-center space-x-10">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/books" className={navLinkClass}>Books</NavLink>
            <NavLink to="/tv" className={navLinkClass}>TV</NavLink>
            <NavLink to="/films" className={navLinkClass}>Film</NavLink>
          </div>

          <Link to="/" className="flex-shrink-0">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center mb-1">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="17" cy="17" r="8" fill="white"/>
                  <circle cx="31" cy="17" r="8" fill="white"/>
                  <circle cx="17" cy="31" r="8" fill="white"/>
                  <circle cx="31" cy="31" r="8" fill="white"/>
                </svg>
              </div>
              <span className="text-xs tracking-[0.15em]">
                <span className="font-normal">bauhaus</span>
                <span className="font-semibold">production</span>
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-10">
            <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
            <NavLink to="/team" className={navLinkClass}>Team</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-black border-t border-gray-800">
            <div className="px-4 py-6 space-y-4">
              <NavLink to="/" className="block py-2 text-gray-300 hover:text-white">Home</NavLink>
              <NavLink to="/books" className="block py-2 text-gray-300 hover:text-white">Books</NavLink>
              <NavLink to="/tv" className="block py-2 text-gray-300 hover:text-white">TV</NavLink>
              <NavLink to="/films" className="block py-2 text-gray-300 hover:text-white">Film</NavLink>
              <NavLink to="/about" className="block py-2 text-gray-300 hover:text-white">About Us</NavLink>
              <NavLink to="/team" className="block py-2 text-gray-300 hover:text-white">Team</NavLink>
              <NavLink to="/contact" className="block py-2 text-gray-300 hover:text-white">Contact</NavLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
