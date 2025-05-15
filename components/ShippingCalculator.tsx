import { ShippingInfo } from "@/types";

interface ShippingCalculatorProps {
  cep: string;
  shippingInfo: ShippingInfo | null;
  cepError: string;
  isLoadingCep: boolean;
  onCepChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCalculateShipping: () => void;
}

export default function ShippingCalculator({
  cep,
  shippingInfo,
  cepError,
  isLoadingCep,
  onCepChange,
  onCalculateShipping,
}: ShippingCalculatorProps) {
  return (
    <div className="mt-10">
      <h3 className="text-lg font-medium text-zinc-900">Consultar Frete</h3>
      <div className="mt-4 flex gap-x-4">
        <input
          type="text"
          name="cep"
          id="cep"
          maxLength={9}
          value={cep.replace(/^(\d{5})(\d{3})$/, "$1-$2")}
          onChange={onCepChange}
          placeholder="Digite seu CEP"
          className="block w-full max-w-xs outline outline-zinc-300 shadow rounded-lg sm:text-sm p-2"
        />
        <button
          onClick={onCalculateShipping}
          disabled={isLoadingCep || cep.length !== 8}
          className="rounded-lg bg-zinc-900 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 disabled:opacity-50"
        >
          {isLoadingCep ? "Calculando..." : "Calcular"}
        </button>
      </div>
      {cepError && <p className="mt-2 text-sm text-red-600">{cepError}</p>}
      {shippingInfo && (
        <div className="mt-4 p-4 outline-zinc-300 shadow rounded-lg bg-zinc-50">
          <h4 className="text-sm font-semibold text-zinc-900">
            Endereço de Entrega:
          </h4>
          <p className="text-sm text-zinc-700">
            {shippingInfo.logradouro}, {shippingInfo.bairro}
          </p>
          <p className="text-sm text-zinc-700">
            {shippingInfo.localidade} - {shippingInfo.uf}
          </p>
          <p className="text-sm text-zinc-700">CEP: {shippingInfo.cep}</p>
          <p className="mt-2 text-sm text-green-600">
            Frete disponível para este endereço.
          </p>
          <p className="mt-2 text-sm font-semibold">🚚 Frete Normal: <span className="font-bold">R$9,90</span></p>
        </div>
      )}
    </div>
  );
}
