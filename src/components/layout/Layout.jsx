import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    // This div should span full width
    <div className="min-h-screen flex flex-col bg-black w-full">
      <Header />
      {/* Main content area with proper centering */}
      <main className="flex-1 w-full">
        {/* This container centers content and adds responsive padding */}
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
