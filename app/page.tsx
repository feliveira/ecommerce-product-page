import products from "@/mocks/products";

export default function Home() {
  const selectedProduct = products[0];

  return (
    <div className="container flex flex-col lg:flex-row gap-8 mx-auto p-4 lg:p-8 min-h-screen">
      <div className="w-full flex flex-col lg:w-2/5">
        <div className="w-full h-full aspect-square bg-red-500 max-w-[600px] max-h-[600px] border rounded-lg"></div>
        <div className="w-full mt-4 grid grid-cols-4 gap-2 sm:gap-4">
          <div className="w-full aspect-square bg-red-500 border rounded-lg"></div>
          <div className="w-full aspect-square bg-red-500 border rounded-lg"></div>
          <div className="w-full aspect-square bg-red-500 border rounded-lg"></div>
          <div className="w-full aspect-square bg-red-500 border rounded-lg"></div>
        </div>
      </div>
      <div className="w-full lg:w-3/5 lg:p-4">
        <h1 className="text-3xl text-gray-900">{selectedProduct.title}</h1>
        <p className="text-3xl font-extrabold text-gray-900 mt-3">
          R${selectedProduct.price}
        </p>

        <div className="w-full h-0.5 bg-gray-500 my-4"></div>

        <div className="mt-2 flex flex-col">
          <p className="text-lg text-gray-900">Tamanho: <span className="font-bold">P</span></p>
          <div className="flex items-center gap-3 mt-2">
            {selectedProduct.variants.sizes.map((size) => (
              <button
                key={size}
                className="flex border items-center justify-center px-4 py-1 rounded-lg"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-2 flex flex-col">
          <p className="text-lg text-gray-900">Cor: <span className="font-bold">Branca</span></p>
          <div className="flex items-center gap-3 mt-2">
            {selectedProduct.variants.colors.map((color) => (
              <button
                key={color.value}
               
                className="relative -m-0.5 flex items-center justify-center rounded-full p-0.5 focus:outline-none"
                title={color.name}
                aria-label={color.name}
              >
                <span
                  style={{ backgroundColor: color.hex }}
                  className="h-8 w-8 rounded-full border border-black border-opacity-10"
                />
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="mt-10 w-full py-3 border bg-gray-900 text-white rounded-lg"
        >
          COMPRAR
        </button>

      </div>
    </div>
  );
}
