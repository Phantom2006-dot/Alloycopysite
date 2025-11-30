export default function SectionTitle({ 
  title, 
  subtitle, 
  align = 'center',
  className = '',
  showLine = false
}) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <div className={`mb-10 ${alignClasses[align]} ${className}`}>
      <h2 className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-white mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 max-w-2xl mx-auto text-sm">
          {subtitle}
        </p>
      )}
      {showLine && (
        <div className="mt-6 flex justify-center">
          <div className="w-32 h-0.5 bg-white"></div>
        </div>
      )}
    </div>
  )
}
