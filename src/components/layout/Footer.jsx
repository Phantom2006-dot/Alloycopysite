import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="inline-block mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">B</span>
                </div>
                <span className="text-sm uppercase tracking-[0.2em] font-light">Bauhaus</span>
              </div>
            </Link>
            <p className="text-gray-500 text-sm">
              Books, Films, Publishing & Tourism. Discover Nigerian culture and destinations.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/books" className="text-gray-500 hover:text-white text-sm transition-colors">Books</Link></li>
              <li><Link to="/films" className="text-gray-500 hover:text-white text-sm transition-colors">Films</Link></li>
              <li><Link to="/publishing" className="text-gray-500 hover:text-white text-sm transition-colors">Publishing</Link></li>
              <li><Link to="/events" className="text-gray-500 hover:text-white text-sm transition-colors">Events</Link></li>
              <li><Link to="/blog" className="text-gray-500 hover:text-white text-sm transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Tourism</h4>
            <ul className="space-y-2">
              <li><Link to="/tourism/lagos" className="text-gray-500 hover:text-white text-sm transition-colors">Visit Lagos</Link></li>
              <li><Link to="/tourism/abuja" className="text-gray-500 hover:text-white text-sm transition-colors">Visit Abuja</Link></li>
              <li><Link to="/tourism/akwa-ibom" className="text-gray-500 hover:text-white text-sm transition-colors">Visit Akwa Ibom</Link></li>
              <li><Link to="/tourism/osun" className="text-gray-500 hover:text-white text-sm transition-colors">Visit Osun</Link></li>
              <li><Link to="/tourism/ogun" className="text-gray-500 hover:text-white text-sm transition-colors">Visit Ogun</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Contact</h4>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">UK Office</p>
                <p className="text-gray-500 text-sm">4 Notre Dame Mews</p>
                <p className="text-gray-500 text-sm">Northampton, NN1 2BG</p>
                <p className="text-gray-500 text-sm">+44 1604 434082</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Nigeria Office</p>
                <p className="text-gray-500 text-sm">41 Coker Road, Ilupeju</p>
                <p className="text-gray-500 text-sm">Lagos, Nigeria</p>
                <p className="text-gray-500 text-sm">+234 703 889 2961</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 text-sm text-gray-500">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <span className="hidden sm:inline">|</span>
          <Link to="/terms" className="hover:text-white transition-colors">Terms and Conditions</Link>
          <span className="hidden sm:inline">|</span>
          <span>&copy; {new Date().getFullYear()} Bauhaus. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
