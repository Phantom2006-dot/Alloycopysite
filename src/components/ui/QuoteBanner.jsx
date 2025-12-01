export default function QuoteBanner({ quotes = [] }) {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-neutral-950 to-black">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center space-y-12">
          {quotes.map((item, index) => (
            <div 
              key={index} 
              className="relative"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl text-neutral-800 font-serif select-none">
                "
              </div>
              <blockquote className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-serif italic leading-relaxed mb-6 px-4">
                {item.quote}
              </blockquote>
              {item.publication && (
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-px bg-neutral-700" />
                  <cite className="text-gray-400 text-sm uppercase tracking-[0.15em] not-italic">
                    {item.publication}
                  </cite>
                  <div className="w-12 h-px bg-neutral-700" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
