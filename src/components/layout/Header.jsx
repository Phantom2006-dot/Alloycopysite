import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

const tourismLinks = [
  { name: 'Visit Lagos', path: '/tourism/lagos' },
  { name: 'Visit Abuja', path: '/tourism/abuja' },
  { name: 'Visit Akwa Ibom', path: '/tourism/akwa-ibom' },
  { name: 'Visit Osun', path: '/tourism/osun' },
  { name: 'Visit Ogun', path: '/tourism/ogun' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTourismOpen, setIsTourismOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const tourismRef = useRef(null)
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
    setIsTourismOpen(false)
  }, [location])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tourismRef.current && !tourismRef.current.contains(event.target)) {
        setIsTourismOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinkClass = ({ isActive }) =>
    `text-sm uppercase tracking-wider font-medium transition-colors duration-300 ${
      isActive ? 'text-white' : 'text-gray-400 hover:text-white'
    }`

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="hidden lg:flex items-center space-x-8">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/books" className={navLinkClass}>Books</NavLink>
            <NavLink to="/films" className={navLinkClass}>Films</NavLink>
            <NavLink to="/publishing" className={navLinkClass}>Publishing</NavLink>
          </div>

          <Link to="/" className="flex-shrink-0">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center mb-1">
                <span className="text-lg font-bold">B</span>
              </div>
              <span className="text-xs uppercase tracking-[0.3em] font-light">Bauhaus</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            <div ref={tourismRef} className="relative">
              <button
                onClick={() => setIsTourismOpen(!isTourismOpen)}
                className="flex items-center text-sm uppercase tracking-wider font-medium text-gray-400 hover:text-white transition-colors duration-300"
                aria-expanded={isTourismOpen}
                aria-haspopup="true"
              >
                Tourism
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isTourismOpen ? 'rotate-180' : ''}`} />
              </button>
              {isTourismOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-sm border border-gray-800 rounded-lg shadow-xl py-2">
                  {tourismLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
            <NavLink to="/events" className={navLinkClass}>Events</NavLink>
            <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
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
          <div className="lg:hidden bg-black/95 backdrop-blur-sm border-t border-gray-800">
            <div className="px-4 py-6 space-y-4">
              <NavLink to="/" className="block py-2 text-gray-300 hover:text-white">Home</NavLink>
              <NavLink to="/books" className="block py-2 text-gray-300 hover:text-white">Books</NavLink>
              <NavLink to="/films" className="block py-2 text-gray-300 hover:text-white">Films</NavLink>
              <NavLink to="/publishing" className="block py-2 text-gray-300 hover:text-white">Publishing</NavLink>
              <div className="py-2">
                <button
                  onClick={() => setIsTourismOpen(!isTourismOpen)}
                  className="flex items-center w-full text-gray-300 hover:text-white"
                >
                  Tourism
                  <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isTourismOpen ? 'rotate-180' : ''}`} />
                </button>
                {isTourismOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {tourismLinks.map((link) => (
                      <NavLink
                        key={link.path}
                        to={link.path}
                        className="block py-1 text-sm text-gray-400 hover:text-white"
                      >
                        {link.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
              <NavLink to="/events" className="block py-2 text-gray-300 hover:text-white">Events</NavLink>
              <NavLink to="/blog" className="block py-2 text-gray-300 hover:text-white">Blog</NavLink>
              <NavLink to="/about" className="block py-2 text-gray-300 hover:text-white">About</NavLink>
              <NavLink to="/contact" className="block py-2 text-gray-300 hover:text-white">Contact</NavLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
