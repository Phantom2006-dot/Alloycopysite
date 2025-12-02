import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

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
    `relative text-xs sm:text-[13px] font-medium tracking-[0.1em] uppercase transition-all duration-300 py-2 ${
      isActive 
        ? 'text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] sm:after:h-[2px] after:bg-white' 
        : 'text-gray-300 hover:text-white'
    }`

  const mobileNavLinkClass = ({ isActive }) =>
    `block text-xl sm:text-2xl font-light tracking-[0.15em] uppercase transition-all duration-300 py-3 sm:py-4 ${
      isActive ? 'text-white' : 'text-gray-400 hover:text-white'
    }`

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
            {/* Desktop Left Navigation - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-12 xl:gap-16">
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
              <NavLink to="/books" className={navLinkClass}>Books</NavLink>
              <NavLink to="/tv" className={navLinkClass}>TV</NavLink>
              <NavLink to="/films" className={navLinkClass}>Film</NavLink>
            </div>

            {/* Mobile Logo - Centered */}
            <div className="lg:hidden flex items-center justify-center w-full">
              <Link to="/" className="relative z-50 flex flex-col items-center group">
                <div className="flex items-center justify-center mb-1 transition-transform duration-300 group-hover:scale-105">
                  {/* Updated SVG Logo from provided file */}
                  <div className="w-8 h-8 sm:w-10 sm:h-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 374.999991" className="w-full h-full">
                      <rect x="-37.5" width="450" fill="#ffffff" y="-37.499999" height="449.999989" fill-opacity="1"/>
                      <rect x="-37.5" width="450" fill="#000000" y="-37.499999" height="449.999989" fill-opacity="1"/>
                      <g>
                        <circle cx="148.414062" cy="154.414062" r="53" fill="#ff3131"/>
                      </g>
                      <g fill="#ffd51e">
                        <path d="M 26.046875 -29.234375 C 26.097656 -28.847656 26.125 -28.539062 26.125 -28.3125 C 26.125 -28.09375 26.125 -27.925781 26.125 -27.8125 L 26.125 -9.234375 C 25.957031 -8.335938 25.707031 -7.414062 25.375 -6.46875 C 25.09375 -5.738281 24.613281 -4.898438 23.9375 -3.953125 C 23.320312 -3.054688 22.398438 -2.269531 21.171875 -1.59375 C 20.273438 -1.144531 19.320312 -0.753906 18.3125 -0.421875 C 17.8125 -0.304688 17.265625 -0.207031 16.671875 -0.125 C 16.085938 -0.0390625 15.457031 0 14.78125 0 C 14.84375 0 14.882812 0 14.90625 0 C 14.9375 0 14.953125 0 14.953125 0 L 1.015625 0 L 1.015625 -54.015625 L 0.921875 -62.5 C 5.015625 -65.253906 9.359375 -64.441406 13.953125 -63.765625 C 22.6875 -62.765625 C 23.097656 -62.367188 23.40625 -61.972656 23.6875 -61.578125 C 23.96875 -61.191406 24.222656 -60.773438 24.453125 -60.328125 C 24.554688 -60.097656 24.632812 -59.828125 24.6875 -59.515625 C 24.75 -59.210938 24.8125 -58.863281 24.875 -58.46875 C 24.976562 -58.082031 25.03125 -57.757812 25.03125 -57.5 C 25.03125 -57.25 25.03125 -57.039062 25.03125 -56.875 L 25.03125 -45.375 C 25.03125 -43.519531 24.359375 -41.695312 23.015625 -39.90625 C 22.347656 -39.125 21.59375 -38.4375 20.75 -37.84375 C 19.90625 -37.257812 18.925781 -36.828125 17.8125 -36.546875 C 20.050781 -36.210938 21.757812 -35.539062 22.9375 -34.53125 C 24.226562 -33.40625 25.097656 -32.203125 25.546875 -30.921875 C 25.765625 -30.523438 25.929688 -29.960938 26.046875 -29.234375 Z M 13.015625 -61.078125 C 12.296875 -61.523438 11.53125 -61.675781 10.71875 -61.53125 C 9.90625 -61.394531 9.078125 -61.101562 8.234375 -60.65625 L 8.234375 -34.453125 C 8.796875 -34.835938 9.351562 -35.144531 9.90625 -35.375 C 12.550781 -36.4375 12.734375 -36.507812 12.984375 -36.59375 C 13.234375 -36.675781 13.523438 -36.742188 13.859375 -36.796875 C 14.191406 -36.910156 14.5 -37.035156 14.78125 -37.171875 C 15.0625 -37.316406 15.34375 -37.5 15.625 -37.71875 C 16.1875 -38.28125 16.664062 -38.984375 17.0625 -39.828125 C 17.507812 -40.660156 17.734375 -41.921875 17.734375 -43.609375 L 17.734375 -52.421875 C 17.40625 -55.679688 16.59375 -57.328125 C 15.78125 -58.984375 14.585938 -60.234375 13.015625 -61.078125 Z M 19.234375 -6.640625 L 19.234375 -30.40625 C 19.015625 -30.800781 18.875 -31.363281 18.8125 -32.09375 C 18.757812 -32.820312 18.34375 -33.519531 17.5625 -34.1875 C 17.28125 -34.46875 17 -34.675781 16.71875 -34.8125 C 16.4375 -34.957031 16.15625 -35.0625 15.875 -35.125 C 15.3125 -35.226562 14.820312 -35.28125 14.40625 -35.28125 C 13.988281 -35.28125 13.613281 -35.226562 13.28125 -35.125 C 11.203125 -34.300781 10.640625 -34.0625 10.078125 -33.8125 C 9.515625 -33.5625 9.007812 -33.296875 8.5625 -33.015625 L 8.234375 -6.890625 C 8.234375 -6.660156 8.242188 -6.429688 8.265625 -6.203125 C 8.296875 -5.984375 8.3125 -5.765625 8.3125 -5.546875 C 8.375 -5.316406 8.445312 -5.035156 8.53125 -4.703125 C 8.613281 -4.367188 8.738281 -4.003906 8.90625 -3.609375 C 9.550781 -2.796875 10.03125 -2.375 10.59375 -2.09375 C 11.820312 -1.59375 13.050781 -1.367188 14.28125 -1.421875 C 15.507812 -1.484375 16.6875 -1.878906 17.8125 -2.609375 C 18.757812 -3.390625 19.234375 -4.734375 19.234375 -6.640625 Z"/>
                      </g>
                    </svg>
                  </div>
                </div>
                <span className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase">
                  <span className="font-light">bauhaus</span>
                  <span className="font-semibold ml-0.5">production</span>
                </span>
              </Link>
            </div>

            {/* Desktop Logo - Centered */}
            <Link to="/" className="hidden lg:flex flex-shrink-0 relative z-50 flex-col items-center group">
              <div className="flex items-center justify-center mb-1.5 transition-transform duration-300 group-hover:scale-105">
                {/* Updated SVG Logo from provided file - Larger for desktop */}
                <div className="w-10 h-10">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 374.999991" className="w-full h-full">
                    <rect x="-37.5" width="450" fill="#ffffff" y="-37.499999" height="449.999989" fill-opacity="1"/>
                    <rect x="-37.5" width="450" fill="#000000" y="-37.499999" height="449.999989" fill-opacity="1"/>
                    <g>
                      <circle cx="148.414062" cy="154.414062" r="53" fill="#ff3131"/>
                    </g>
                    <g fill="#ffd51e">
                      <path d="M 26.046875 -29.234375 C 26.097656 -28.847656 26.125 -28.539062 26.125 -28.3125 C 26.125 -28.09375 26.125 -27.925781 26.125 -27.8125 L 26.125 -9.234375 C 25.957031 -8.335938 25.707031 -7.414062 25.375 -6.46875 C 25.09375 -5.738281 24.613281 -4.898438 23.9375 -3.953125 C 23.320312 -3.054688 22.398438 -2.269531 21.171875 -1.59375 C 20.273438 -1.144531 19.320312 -0.753906 18.3125 -0.421875 C 17.8125 -0.304688 17.265625 -0.207031 16.671875 -0.125 C 16.085938 -0.0390625 15.457031 0 14.78125 0 C 14.84375 0 14.882812 0 14.90625 0 C 14.9375 0 14.953125 0 14.953125 0 L 1.015625 0 L 1.015625 -54.015625 L 0.921875 -62.5 C 5.015625 -65.253906 9.359375 -64.441406 13.953125 -63.765625 C 22.6875 -62.765625 C 23.097656 -62.367188 23.40625 -61.972656 23.6875 -61.578125 C 23.96875 -61.191406 24.222656 -60.773438 24.453125 -60.328125 C 24.554688 -60.097656 24.632812 -59.828125 24.6875 -59.515625 C 24.75 -59.210938 24.8125 -58.863281 24.875 -58.46875 C 24.976562 -58.082031 25.03125 -57.757812 25.03125 -57.5 C 25.03125 -57.25 25.03125 -57.039062 25.03125 -56.875 L 25.03125 -45.375 C 25.03125 -43.519531 24.359375 -41.695312 23.015625 -39.90625 C 22.347656 -39.125 21.59375 -38.4375 20.75 -37.84375 C 19.90625 -37.257812 18.925781 -36.828125 17.8125 -36.546875 C 20.050781 -36.210938 21.757812 -35.539062 22.9375 -34.53125 C 24.226562 -33.40625 25.097656 -32.203125 25.546875 -30.921875 C 25.765625 -30.523438 25.929688 -29.960938 26.046875 -29.234375 Z M 13.015625 -61.078125 C 12.296875 -61.523438 11.53125 -61.675781 10.71875 -61.53125 C 9.90625 -61.394531 9.078125 -61.101562 8.234375 -60.65625 L 8.234375 -34.453125 C 8.796875 -34.835938 9.351562 -35.144531 9.90625 -35.375 C 12.550781 -36.4375 12.734375 -36.507812 12.984375 -36.59375 C 13.234375 -36.675781 13.523438 -36.742188 13.859375 -36.796875 C 14.191406 -36.910156 14.5 -37.035156 14.78125 -37.171875 C 15.0625 -37.316406 15.34375 -37.5 15.625 -37.71875 C 16.1875 -38.28125 16.664062 -38.984375 17.0625 -39.828125 C 17.507812 -40.660156 17.734375 -41.921875 17.734375 -43.609375 L 17.734375 -52.421875 C 17.40625 -55.679688 16.59375 -57.328125 C 15.78125 -58.984375 14.585938 -60.234375 13.015625 -61.078125 Z M 19.234375 -6.640625 L 19.234375 -30.40625 C 19.015625 -30.800781 18.875 -31.363281 18.8125 -32.09375 C 18.757812 -32.820312 18.34375 -33.519531 17.5625 -34.1875 C 17.28125 -34.46875 17 -34.675781 16.71875 -34.8125 C 16.4375 -34.957031 16.15625 -35.0625 15.875 -35.125 C 15.3125 -35.226562 14.820312 -35.28125 14.40625 -35.28125 C 13.988281 -35.28125 13.613281 -35.226562 13.28125 -35.125 C 11.203125 -34.300781 10.640625 -34.0625 10.078125 -33.8125 C 9.515625 -33.5625 9.007812 -33.296875 8.5625 -33.015625 L 8.234375 -6.890625 C 8.234375 -6.660156 8.242188 -6.429688 8.265625 -6.203125 C 8.296875 -5.984375 8.3125 -5.765625 8.3125 -5.546875 C 8.375 -5.316406 8.445312 -5.035156 8.53125 -4.703125 C 8.613281 -4.367188 8.738281 -4.003906 8.90625 -3.609375 C 9.550781 -2.796875 10.03125 -2.375 10.59375 -2.09375 C 11.820312 -1.59375 13.050781 -1.367188 14.28125 -1.421875 C 15.507812 -1.484375 16.6875 -1.878906 17.8125 -2.609375 C 18.757812 -3.390625 19.234375 -4.734375 19.234375 -6.640625 Z"/>
                    </g>
                  </svg>
                </div>
              </div>
              <span className="text-[11px] tracking-[0.2em] uppercase">
                <span className="font-light">bauhaus</span>
                <span className="font-semibold ml-0.5">production</span>
              </span>
            </Link>

            {/* Desktop Right Navigation - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-12 xl:gap-16">
              <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
              <NavLink to="/team" className={navLinkClass}>Team</NavLink>
              <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center group ml-auto"
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

      {/* Mobile Menu Overlay */}
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
          <nav className="flex flex-col items-center space-y-2 px-4 w-full">
            <NavLink to="/" className={mobileNavLinkClass}>Home</NavLink>
            <NavLink to="/books" className={mobileNavLinkClass}>Books</NavLink>
            <NavLink to="/tv" className={mobileNavLinkClass}>TV</NavLink>
            <NavLink to="/films" className={mobileNavLinkClass}>Film</NavLink>
            <div className="w-16 h-px bg-gray-700/50 my-4 sm:my-6" />
            <NavLink to="/about" className={mobileNavLinkClass}>About Us</NavLink>
            <NavLink to="/team" className={mobileNavLinkClass}>Team</NavLink>
            <NavLink to="/contact" className={mobileNavLinkClass}>Contact</NavLink>
          </nav>
          
          {/* Optional: Add social links or contact info in mobile menu */}
          <div className="mt-8 sm:mt-12 text-center text-gray-400 text-sm px-4">
            <p className="tracking-[0.1em] uppercase text-xs mb-2">Connect with us</p>
            <p className="text-xs">info@bauhausproduction.com</p>
          </div>
        </div>
      </div>
    </>
  )
}
