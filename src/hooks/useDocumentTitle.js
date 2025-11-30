import { useEffect } from 'react'

export function useDocumentTitle(title) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title
    return () => {
      document.title = prevTitle
    }
  }, [title])
}

export function useMetaDescription(description) {
  useEffect(() => {
    const metaDescription = document.querySelector('meta[name="description"]')
    const prevDescription = metaDescription?.getAttribute('content')
    
    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    }
    
    return () => {
      if (metaDescription && prevDescription) {
        metaDescription.setAttribute('content', prevDescription)
      }
    }
  }, [description])
}
