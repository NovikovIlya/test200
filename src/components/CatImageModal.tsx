import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface CatImageModalProps {
  onClose: () => void
  onSelect: (url: string) => void
}

const CatImageModal: React.FC<CatImageModalProps> = ({ onClose, onSelect }) => {
  const [catImages, setCatImages] = useState<string[]>([])

  useEffect(() => {
    const fetchCatImages = async () => {
      try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=9')
        const data = await response.json()
        setCatImages(data.map((cat: { url: string }) => cat.url))
      } catch (error) {
        console.error('Error fetching cat images:', error)
      }
    }

    fetchCatImages()
  }, [])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Выберите котика</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {catImages.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Cat ${index + 1}`}
              className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onSelect(url)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CatImageModal