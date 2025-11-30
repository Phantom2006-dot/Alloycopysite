export default function TeamCard({ name, title, bio, image }) {
  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row gap-8">
        {image && (
          <div className="flex-shrink-0">
            <img 
              src={image} 
              alt={name} 
              className="w-48 h-48 object-cover rounded-lg grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-1">{name}</h3>
          <p className="text-gray-400 italic mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</p>
          <div className="text-gray-300 text-sm leading-relaxed space-y-4">
            {bio.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
