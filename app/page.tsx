"use client"

import { useState, useEffect } from "react"
import products from "@/mocks/products"
import Image from "next/image"
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"
import "animate.css"
import { ProductColorVariant, ProductImage, ShippingInfo } from "@/types"
import ShippingCalculator from "@/components/ShippingCalculator"

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

  useEffect(() => {
    if (typeof window === "undefined" || !selectedProduct) {
      return
    }

    try {
      const savedState = localStorage.getItem(STORAGE_KEY)
      if (savedState) {
        const {
          productId,
          selectedColorValue,
          selectedSize: savedSize,
          cep: savedCep,
          shippingInfo: savedShippingInfo,
          timestamp,
        } = JSON.parse(savedState)

        if(selectedProduct && selectedProduct.id != productId) {
          localStorage.removeItem(STORAGE_KEY)
        }

        const now = Date.now()

        if (now - timestamp < EXPIRATION_TIME_MS) {
          
          if (selectedColorValue) {
            const colorToRestore = selectedProduct.variants.colors.find(
              (color) => color.value === selectedColorValue
            )
            if (colorToRestore) {
              setSelectedColor(colorToRestore)
            }
          } 

          if (savedSize && selectedProduct.variants.sizes.includes(savedSize)) {
            setSelectedSize(savedSize)
          } 
          if (savedCep) {
            setCep(savedCep)
          } 
          if (savedShippingInfo) {
            setShippingInfo(savedShippingInfo)
          }
        } else {
          localStorage.removeItem(STORAGE_KEY)
        }
      }
    } catch (error) {
      console.error("Falha ao carregar estado do localStorage:", error)
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [selectedProduct])

  useEffect(() => {
    if (typeof window === "undefined" || !selectedProduct) {
      return
    }

    try {
      const stateToSave = {
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
  }, [selectedColor, selectedSize, cep, shippingInfo, selectedProduct])

  useEffect(() => {
    if (selectedProduct && selectedColor) {
      const filtered: ProductImage[] = selectedProduct.images.filter(
        (img: ProductImage) => img.url.includes(`/${selectedColor.value}/`)
      )
      setColorFilteredImages(filtered)
      if (filtered.length > 0) {
        setMainImage(filtered[0].url)
      } else {
        setMainImage("")
      }
    }
  }, [selectedColor, selectedProduct])

  useEffect(() => {
    if (selectedProduct && selectedColor) {
      const filtered: ProductImage[] = selectedProduct.images.filter(
        (img: ProductImage) => img.url.includes(`/${selectedColor.value}/`)
      )
      setColorFilteredImages(filtered)
      if (filtered.length > 0) {
        setMainImage(filtered[0].url)
      } else {
        setMainImage("")
      }
    }
  }, [selectedColor, selectedProduct])

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
      <div className="w-full flex flex-col lg:w-2/5 animate__animated animate__fadeInDown">
        <div className="w-full h-auto aspect-square bg-zinc-200 max-w-[600px] max-h-[600px] outline outline-zinc-300 shadow rounded-lg overflow-hidden flex items-center justify-center">
          {mainImage ? (
            <Zoom zoomMargin={40}>
              <Image
                src={mainImage}
                alt={`${selectedProduct.title} - ${selectedColor.name}`}
                width={600}
                height={600}
                className="object-cover w-full h-full cursor-zoom-in"
                priority
              />
            </Zoom>
          ) : (
            <div className="text-zinc-500">Image not available</div>
          )}
        </div>

        <div className="w-full mt-4 grid grid-cols-4 gap-2 sm:gap-4 max-w-[600px] max-h-[600px]">
          {colorFilteredImages.map((image) => (
            <button
              key={image.id}
              onClick={() => handleThumbnailClick(image.url)}
              className={`w-full aspect-square bg-zinc-200 rounded-lg overflow-hidden cursor-pointer outline-zinc-300 shadow ${
                mainImage === image.url
                  ? "ring-2 ring-zinc-900 ring-offset-2"
                  : "border-zinc-300 hover:border-zinc-500"
              }`}
              aria-label={`View image ${image.id.replace("img", "")} for ${
                selectedColor.name
              }`}
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

        <div className="mt-2 flex flex-col">
          <p className="text-lg text-zinc-900">
            Tamanho: <span className="font-bold">{selectedSize}</span>
          </p>
          <div className="flex items-center gap-3 mt-3">
            {selectedProduct.variants.sizes.map((size: string) => (
              <button
                key={size}
                onClick={() => handleSizeSelect(size)}
                className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors delay-100 cursor-pointer
                            ${
                              selectedSize === size
                                ? "bg-zinc-900 text-zinc-100"
                                : "bg-zinc-100 text-zinc-900"
                            }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col">
          <p className="text-lg text-zinc-900">
            Cor: <span className="font-bold">{selectedColor.name}</span>
          </p>
          <div className="flex items-center gap-3 mt-3">
            {selectedProduct.variants.colors.map(
              (color: ProductColorVariant) => (
                <button
                  key={color.value}
                  onClick={() => handleColorSelect(color)}
                  className={`relative -m-0.5 flex items-center justify-center rounded-full p-0.5 focus:outline-none transition-all duration-150 ease-in-out
                            ${
                              selectedColor.value === color.value
                                ? "ring-2 ring-offset-1 ring-zinc-900"
                                : "hover:ring-1 hover:ring-zinc-400"
                            }`}
                  title={color.name}
                  aria-label={`Select color ${color.name}`}
                  aria-pressed={selectedColor.value === color.value}
                >
                  <span
                    style={{ backgroundColor: color.hex }}
                    className="h-8 w-8 rounded-full border border-black border-opacity-10"
                  />
                </button>
              )
            )}
          </div>
        </div>

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
