export default function SectionWrapper({ 
  children, 
  className = '', 
  id,
  background = 'black'
}) {
  const bgClasses = {
    black: 'bg-black',
    dark: 'bg-gray-950',
    gradient: 'bg-gradient-to-b from-black to-gray-950',
  }

  return (
    <section 
      id={id} 
      className={`py-16 md:py-24 ${bgClasses[background]} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
