export interface ProductImage {
  id: string,
  url: string
}

export interface ProductColorVariant {
  name: string,
  value: string,
  hex: string
}

export interface ShippingInfo {
  logradouro: string,
  localidade: string,
  bairro: string,
  cep: string,
  uf: string
}
