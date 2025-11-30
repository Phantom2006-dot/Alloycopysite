import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs text-gray-500">
          <Link to="/privacy" className="hover:text-white transition-colors underline">Privacy Policy</Link>
          <span>|</span>
          <Link to="/terms" className="hover:text-white transition-colors underline">Terms and Conditions</Link>
          <span>|</span>
          <span>&copy; Bauhaus Production {new Date().getFullYear()}</span>
          <span>|</span>
          <span>Website by <a href="#" className="underline hover:text-white transition-colors">Soul Coast Creative</a></span>
        </div>
      </div>
    </footer>
  )
}
