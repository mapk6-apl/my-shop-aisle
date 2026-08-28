import { useState, useEffect } from 'react'
import './ImageSearch.css'

type PixabayHit = { id: number, webformatURL: string, previewURL: string }

type ImageSearchProps = {
    query: string
    onSelect: (url: string) => void
}

export const ImageSearch: React.FC<ImageSearchProps> = ({ query, onSelect }) => {
    const [results, setResults] = useState<PixabayHit[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedId, setSelectedId] = useState<number | null>(null)

    useEffect(() => {
        if (!query || query.trim().length < 2) {
            setResults([])
            return
        }

        setLoading(true)
        //wait 500ms after the user stops typing before searching so we're not firing a request on every single key
        const timeoutId = setTimeout(async () => {
            try {
                const key = import.meta.env.VITE_PIXABAY_API_KEY
                const response = await fetch(
                    `https://pixabay.com/api/?key=${key}&q=${encodeURIComponent(query)}&image_type=photo&per_page=8`
                )
                const data = await response.json()
                setResults(data.hits || [])
            } finally {
                setLoading(false)
            }
        }, 500)

        return () => clearTimeout(timeoutId)
    }, [query])

    if (!query || query.trim().length < 2) return null

    return (
        <div className='image-search'>
            {loading && <p className='image-search-loading'>Finding images...</p>}
            {!loading && results.length === 0 && (
                <p className='image-search-loading'>No matching images found.</p>
            )}
            {!loading && results.length > 0 && (
                <div className='image-search-results'>
                    {results.map(hit => (
                        <img
                            key={hit.id}
                            src={hit.previewURL}
                            alt='Result'
                            className={selectedId === hit.id ? 'image-search-thumb image-search-thumb-selected' : 'image-search-thumb'}
                            onClick={() => { setSelectedId(hit.id); onSelect(hit.webformatURL) }}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}