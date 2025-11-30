export default function QuoteBanner({ quote, author, publication }) {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <blockquote className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-light italic leading-relaxed mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          "{quote}"
        </blockquote>
        {author && (
          <div className="flex flex-col items-center">
            <span className="text-white font-medium">{author}</span>
            {publication && (
              <span className="text-gray-500 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                —{publication}
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
