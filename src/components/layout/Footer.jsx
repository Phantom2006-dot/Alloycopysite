import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <div className="flex flex-col items-start">
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
                  <circle cx="17" cy="17" r="7" fill="white"/>
                  <circle cx="31" cy="17" r="7" fill="white"/>
                  <circle cx="17" cy="31" r="7" fill="white"/>
                  <circle cx="31" cy="31" r="7" fill="white"/>
                </svg>
                <span className="text-[11px] tracking-[0.2em] uppercase text-white">
                  <span className="font-light">bauhaus</span>
                  <span className="font-semibold">production</span>
                </span>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Celebrating Nigerian culture through compelling storytelling.
            </p>
          </div>
          
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-6">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-400 text-sm hover:text-white transition-colors duration-300">Home</Link>
              <Link to="/books" className="text-gray-400 text-sm hover:text-white transition-colors duration-300">Books</Link>
              <Link to="/tv" className="text-gray-400 text-sm hover:text-white transition-colors duration-300">TV</Link>
              <Link to="/films" className="text-gray-400 text-sm hover:text-white transition-colors duration-300">Film</Link>
              <Link to="/about" className="text-gray-400 text-sm hover:text-white transition-colors duration-300">About Us</Link>
              <Link to="/contact" className="text-gray-400 text-sm hover:text-white transition-colors duration-300">Contact</Link>
            </nav>
          </div>
          
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-6">
              UK Office
            </h4>
            <div className="text-gray-400 text-sm space-y-2">
              <p>4 Notre Dame Mews</p>
              <p>Northampton, NN1 2BG</p>
              <p className="pt-2">
                <a href="tel:+441604434082" className="hover:text-white transition-colors duration-300">
                  +44 1604 434082
                </a>
              </p>
              <p>
                <a href="mailto:info@bauhausproduction.com" className="hover:text-white transition-colors duration-300">
                  info@bauhausproduction.com
                </a>
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-6">
              Nigeria Office
            </h4>
            <div className="text-gray-400 text-sm space-y-2">
              <p>41 Coker Road</p>
              <p>Ilupeju, Lagos</p>
              <p className="pt-2">
                <a href="tel:+2347038892961" className="hover:text-white transition-colors duration-300">
                  +234 703 889 2961
                </a>
              </p>
              <p>
                <a href="mailto:akinalaka@bauhaus-education.co.uk" className="hover:text-white transition-colors duration-300">
                  akinalaka@bauhaus-education.co.uk
                </a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="py-6 border-t border-neutral-800">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-[11px] text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/terms" className="hover:text-white transition-colors duration-300">
              Terms and Conditions
            </Link>
            <span className="hidden sm:inline">|</span>
            <span>&copy; BAUHAUS Production 2025</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
