export default function SectionTitle({ 
  title, 
  subtitle, 
  align = 'center',
  className = '' 
}) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <div className={`mb-12 ${alignClasses[align]} ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          {subtitle}
        </p>
      )}
      <div className="mt-6 flex justify-center">
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"></div>
      </div>
    </div>
  )
}
