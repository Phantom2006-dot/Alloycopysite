import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-4">UK Office</h4>
            <div className="text-gray-400 text-sm space-y-1">
              <p>4 Notre Dame Mews</p>
              <p>Northampton, NN1 2BG</p>
              <p className="mt-2">
                <a href="tel:+441604434082" className="hover:text-white transition-colors">+44 1604 434082</a>
              </p>
              <p>
                <a href="mailto:info@bauhausproduction.com" className="hover:text-white transition-colors">info@bauhausproduction.com</a>
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-4">Quick Links</h4>
            <div className="flex flex-col space-y-2 text-gray-400 text-sm">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              <Link to="/books" className="hover:text-white transition-colors">Books</Link>
              <Link to="/tv" className="hover:text-white transition-colors">TV</Link>
              <Link to="/films" className="hover:text-white transition-colors">Film</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-4">Nigeria Office</h4>
            <div className="text-gray-400 text-sm space-y-1">
              <p>41 Coker Road</p>
              <p>Ilupeju, Lagos</p>
              <p className="mt-2">
                <a href="tel:+2347038892961" className="hover:text-white transition-colors">+234 703 889 2961</a>
              </p>
              <p>
                <a href="mailto:akinalaka@bauhaus-education.co.uk" className="hover:text-white transition-colors">akinalaka@bauhaus-education.co.uk</a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center space-x-6 mb-8">
          <a href="#" className="text-gray-500 hover:text-white transition-colors" aria-label="Facebook">
            <Facebook className="h-5 w-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors" aria-label="Twitter">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors" aria-label="Instagram">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors" aria-label="YouTube">
            <Youtube className="h-5 w-5" />
          </a>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors underline">Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-white transition-colors underline">Terms and Conditions</Link>
            <span>|</span>
            <span>&copy; 2025 Bauhaus. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
