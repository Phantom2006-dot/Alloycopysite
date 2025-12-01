import { useEffect } from 'react'
import HeroCarousel from '../components/ui/HeroCarousel'
import QuoteBanner from '../components/ui/QuoteBanner'

const carouselItems = [
  { id: 1, title: "The Wife Upstairs", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop" },
  { id: 2, title: "Work It", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop" },
  { id: 3, title: "Everything We Never Said", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop" },
  { id: 4, title: "American Royals", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop" },
  { id: 5, title: "The Davenports", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop" },
  { id: 6, title: "Tokyo Ever After", image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop" },
]

const quotes = [
  {
    quote: "BAUHAUS brings Nigerian culture to life through compelling storytelling, immersive experiences, and authentic connections that bridge communities across the globe.",
    publication: "Culture Magazine"
  },
  {
    quote: "A cultural powerhouse dedicated to celebrating Nigeria's rich heritage.",
    publication: "African Arts Review"
  }
]

export default function Home() {
  useEffect(() => {
    document.title = 'BAUHAUS'
  }, [])

  return (
    <>
      <HeroCarousel items={carouselItems} interval={1000} />
      <QuoteBanner quotes={quotes} />
    </>
  )
}
