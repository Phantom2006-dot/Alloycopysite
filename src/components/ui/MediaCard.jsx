import { Link } from 'react-router-dom'

export default function MediaCard({ 
  image, 
  title, 
  subtitle, 
  description,
  link, 
  buttonText = 'Learn More',
  aspectRatio = 'portrait'
}) {
  const aspectClasses = {
    portrait: 'aspect-[2/3]',
    square: 'aspect-square',
    landscape: 'aspect-video',
  }

  const Card = (
    <div className="group relative overflow-hidden rounded-lg bg-gray-900 transition-transform duration-300 hover:scale-105">
      <div className={`${aspectClasses[aspectRatio]} overflow-hidden`}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
          {subtitle && <p className="text-gray-300 text-sm mb-2">{subtitle}</p>}
          {description && <p className="text-gray-400 text-xs line-clamp-2">{description}</p>}
          {buttonText && (
            <span className="inline-block mt-3 text-xs uppercase tracking-wider text-white border-b border-white pb-1">
              {buttonText}
            </span>
          )}
        </div>
      </div>
    </div>
  )

  if (link) {
    return <Link to={link}>{Card}</Link>
  }

  return Card
}
