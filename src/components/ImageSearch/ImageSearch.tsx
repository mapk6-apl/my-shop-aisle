import { useState } from 'react'
import './ImageSearch.css'

type PixabayHit = { id: number, webformatURL: string, previewURL: string }

type ImageSearchProps = {
    onSelect: (url: string) => void
}

export const ImageSearch: React.FC<ImageSearchProps> = ({ onSelect }) => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<PixabayHit[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedId, setSelectedId] = useState<number | null>(null)

    const handleSearch = async () => {
        if (!query) return
        setLoading(true)
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
    }

    return (
        <div className='image-search'>
            <div className='image-search-row'>
                <input
                    type='text'
                    placeholder='ex. banana'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button type='button' onClick={handleSearch}>Search</button>
            </div>
            {loading && <p className='image-search-loading'>Searching...</p>}
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
        </div>
    )
}