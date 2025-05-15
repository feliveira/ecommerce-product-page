import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { ProductImage, ProductColorVariant } from '@/types'

interface ProductImageGalleryProps {
  mainImage: string
  colorFilteredImages: ProductImage[]
  selectedColor: ProductColorVariant
  productTitle: string
  handleThumbnailClick: (imageUrl: string) => void
}

export default function ProductImageGallery({
  mainImage,
  colorFilteredImages,
  selectedColor,
  productTitle,
  handleThumbnailClick,
}: ProductImageGalleryProps) {
  return (
    <div className="w-full flex flex-col animate__animated animate__fadeInDown">
      <div className="w-full h-auto aspect-square bg-zinc-200 max-w-[600px] max-h-[600px] outline outline-zinc-300 shadow rounded-lg overflow-hidden flex items-center justify-center">
        {mainImage ? (
          <Zoom>
            <Image
              src={mainImage}
              alt={`${productTitle} - ${selectedColor.name}`}
              width={600}
              height={600}
              className="object-cover w-full h-full cursor-zoom-in"
              priority 
            />
          </Zoom>
        ) : (
          <div className="text-zinc-500">Image não disponível</div>
        )}
      </div>

      <div className="w-full mt-4 grid grid-cols-4 gap-2 sm:gap-4 max-w-[600px] max-h-[600px]">
        {colorFilteredImages.map((image) => (
          <button
            key={image.id}
            onClick={() => handleThumbnailClick(image.url)}
            className={`w-full aspect-square bg-zinc-200 rounded-lg overflow-hidden cursor-pointer outline-zinc-300 shadow ${
              mainImage === image.url ? 'ring-2 ring-zinc-900 ring-offset-2' : 'border-zinc-300 hover:border-zinc-500'
            }`}
            aria-label={`Imagem ${image.id.replace('img', '')} para cor ${selectedColor.name}`}
          >
            <Image
              src={image.url}
              alt={`Thumbnail ${image.id}`}
              width={150}
              height={150}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  )
}