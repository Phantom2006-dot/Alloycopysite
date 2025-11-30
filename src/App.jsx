import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Books from './pages/Books'
import Films from './pages/Films'
import Publishing from './pages/Publishing'
import TourismIndex from './pages/tourism/TourismIndex'
import Lagos from './pages/tourism/Lagos'
import Abuja from './pages/tourism/Abuja'
import AkwaIbom from './pages/tourism/AkwaIbom'
import Osun from './pages/tourism/Osun'
import Ogun from './pages/tourism/Ogun'
import Events from './pages/Events'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="books" element={<Books />} />
        <Route path="films" element={<Films />} />
        <Route path="publishing" element={<Publishing />} />
        <Route path="tourism">
          <Route index element={<TourismIndex />} />
          <Route path="lagos" element={<Lagos />} />
          <Route path="abuja" element={<Abuja />} />
          <Route path="akwa-ibom" element={<AkwaIbom />} />
          <Route path="osun" element={<Osun />} />
          <Route path="ogun" element={<Ogun />} />
        </Route>
        <Route path="events" element={<Events />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}

export default App
