export default function QuoteBanner({ quotes = [] }) {
  return (
    <section className="py-16 bg-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {quotes.map((item, index) => (
          <div key={index} className="mb-8 last:mb-0">
            <blockquote className="text-lg md:text-xl text-gray-300 font-serif italic leading-relaxed mb-3">
              "{item.quote}"
            </blockquote>
            {item.publication && (
              <cite className="text-gray-400 font-serif italic text-base not-italic">
                —{item.publication}
              </cite>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
