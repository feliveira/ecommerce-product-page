"use client"

import { useState, useEffect } from "react"
import products from "@/mocks/products"
import "react-medium-image-zoom/dist/styles.css"
import "animate.css"
import { ProductColorVariant, ProductImage, ShippingInfo } from "@/types"
import ShippingCalculator from "@/components/ShippingCalculator"
import ColorSelector from "@/components/ColorSelector"
import SizeSelector from "@/components/SizeSelector"
import ProductImageGallery from "@/components/ProductImageGallery"

const STORAGE_KEY = "productPageState"
const EXPIRATION_TIME_MS = 15 * 60 * 1000

export default function Home() {
  const selectedProduct = products[0]

  const [selectedColor, setSelectedColor] = useState<ProductColorVariant>(
    selectedProduct.variants.colors[0]
  )
  const [selectedSize, setSelectedSize] = useState<string>(
    selectedProduct.variants.sizes[0]
  )
  const [mainImage, setMainImage] = useState<string>("")
  const [colorFilteredImages, setColorFilteredImages] = useState<
    ProductImage[]
  >([])
  const [cep, setCep] = useState("")
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null)
  const [cepError, setCepError] = useState("")
  const [isLoadingCep, setIsLoadingCep] = useState(false)
  const [hasLoadedSavedState, setHasLoadedSavedState] = useState(false)

  // Carrega informações de produto salvas
  useEffect(() => {
    if (typeof window === "undefined" || !selectedProduct) return

    try {
      const savedState = localStorage.getItem(STORAGE_KEY)
      if (savedState) {
        const {
          mainImage: savedMainImage,
          productId,
          selectedColorValue,
          selectedSize: savedSize,
          cep: savedCep,
          shippingInfo: savedShippingInfo,
          timestamp,
        } = JSON.parse(savedState)

        if (selectedProduct.id !== productId) {
          localStorage.removeItem(STORAGE_KEY)
          setHasLoadedSavedState(true)
          return
        }

        const now = Date.now()
        if (now - timestamp < EXPIRATION_TIME_MS) {
          if (savedMainImage) setMainImage(savedMainImage)
          if (selectedColorValue) {
            const colorToRestore = selectedProduct.variants.colors.find(
              (color) => color.value === selectedColorValue
            )
            if (colorToRestore) setSelectedColor(colorToRestore)
          }
          if (savedSize && selectedProduct.variants.sizes.includes(savedSize)) {
            setSelectedSize(savedSize)
          }
          if (savedCep) setCep(savedCep)
          if (savedShippingInfo) setShippingInfo(savedShippingInfo)
        } else {
          localStorage.removeItem(STORAGE_KEY)
        }
      }
    } catch (error) {
      console.error("Falha ao carregar estado do localStorage:", error)
      localStorage.removeItem(STORAGE_KEY)
    } finally {
      setHasLoadedSavedState(true)
    }
  }, [selectedProduct])

  // Salva informações selecionadas pelo usuário
  useEffect(() => {
    if (typeof window === "undefined" || !selectedProduct) {
      return
    }

    if (!mainImage && colorFilteredImages.length > 0) {
      return
    }

    try {
      const stateToSave = {
        mainImage: mainImage,
        productId: selectedProduct.id,
        selectedColorValue: selectedColor.value,
        selectedSize: selectedSize,
        cep: cep,
        shippingInfo: shippingInfo,
        timestamp: Date.now(),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave))
    } catch (error) {
      console.error("Falha ao salvar estado no localStorage:", error)
    }
  }, [
    selectedColor,
    selectedSize,
    cep,
    shippingInfo,
    selectedProduct,
    mainImage,
    colorFilteredImages,
  ])

  useEffect(() => {
    if (selectedProduct && selectedColor) {
      const filtered: ProductImage[] = selectedProduct.images.filter(
        (img: ProductImage) => img.url.includes(`/${selectedColor.value}/`)
      )
      setColorFilteredImages(filtered)

      if (filtered.length > 0) {
        const mainImageStillExists =
          mainImage && filtered.some((img) => img.url === mainImage)

        if (mainImage && mainImageStillExists) {
          setMainImage(mainImage)
        } else if (hasLoadedSavedState) {
          setMainImage(filtered[0].url)
        }
      } else {
        setMainImage("")
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor, selectedProduct, hasLoadedSavedState])

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
  }

  const handleColorSelect = (color: ProductColorVariant) => {
    setSelectedColor(color)
  }

  const handleThumbnailClick = (imageUrl: string) => {
    setMainImage(imageUrl)
  }

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    setCep(value)
    if (value.length !== 8) {
      setShippingInfo(null)
      setCepError("CEP deve conter 8 dígitos.")
    } else {
      setCepError("")
    }
  }

  const fetchShippingInfo = async () => {
    if (cep.length !== 8) {
      setCepError("Por favor, insira um CEP válido com 8 dígitos.")
      setShippingInfo(null)
      return
    }
    setIsLoadingCep(true)
    setCepError("")
    setShippingInfo(null)
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()
      if (data.erro) {
        setCepError("CEP não encontrado ou inválido.")
        setShippingInfo(null)
      } else {
        setShippingInfo(data)
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error)
      setCepError("Erro ao consultar o CEP. Tente novamente.")
      setShippingInfo(null)
    } finally {
      setIsLoadingCep(false)
    }
  }

  if (!selectedProduct) {
    return <div>Carregando produto...</div>
  }

  return (
    <div className="container flex flex-col lg:flex-row gap-8 mx-auto p-4 lg:p-8 min-h-screen">
      <div className="w-full lg:w-2/5">
        <ProductImageGallery
          mainImage={mainImage}
          colorFilteredImages={colorFilteredImages}
          selectedColor={selectedColor}
          productTitle={selectedProduct.title}
          handleThumbnailClick={handleThumbnailClick}
        />
      </div>
      <div className="w-full lg:w-3/5 lg:p-4 animate__animated animate__fadeInUp">
        <ul className="text-zinc-400 flex text-xs lg:text-base">
          <li>
            <a href="#" className="hover:underline">
              INÍCIO
            </a>
          </li>
          <li>/</li>
          <li>
            <a href="#" className="hover:underline">
              CAMISETAS
            </a>
          </li>
          <li>/</li>
          <li>
            <a href="#" className="hover:underline">
              <span aria-current="page" className="font-semibold uppercase">
                {selectedProduct.title}
              </span>
            </a>
          </li>
        </ul>
        <h1 className="text-3xl text-zinc-900">{selectedProduct.title}</h1>
        <p className="text-3xl font-extrabold text-zinc-900 mt-3">
          R${selectedProduct.price.toFixed(2).replace(".", ",")}
        </p>

        <div className="w-full h-0.5 bg-zinc-300 my-6"></div>

        <SizeSelector
          sizes={selectedProduct.variants.sizes}
          selectedSize={selectedSize}
          onSelectSize={handleSizeSelect}
        />

        <ColorSelector
          colors={selectedProduct.variants.colors}
          selectedColor={selectedColor}
          onSelectColor={handleColorSelect}
        />

        <button
          type="submit"
          className="mt-10 w-full py-3 border bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900"
        >
          COMPRAR
        </button>

        <p className="text-center my-4">
          Peça em estoque com{" "}
          <span className="font-semibold">envio imediato</span>
        </p>

        <ShippingCalculator
          cep={cep}
          shippingInfo={shippingInfo}
          cepError={cepError}
          isLoadingCep={isLoadingCep}
          onCepChange={handleCepChange}
          onCalculateShipping={fetchShippingInfo}
        />
      </div>
    </div>
  )
}
