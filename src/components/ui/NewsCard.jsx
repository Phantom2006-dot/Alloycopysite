export default function NewsCard({ source, date, title, description, link }) {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition-colors duration-300"
    >
      <div className="text-center">
        <p className="text-amber-500 font-semibold text-sm mb-2">
          {source} ({date})
        </p>
        <h3 className="text-white font-medium mb-2">{title}</h3>
        {description && (
          <p className="text-gray-400 text-sm">{description}</p>
        )}
      </div>
    </a>
  )
}
