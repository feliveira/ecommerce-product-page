export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-200 text-sm pt-8 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="text-white font-semibold mb-3">NAVEGAÇÃO</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Início
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Camisetas
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Sobre
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contato
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Trocas e Devoluções
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Política de Privacidade
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">CONTATO</h4>
          <p>contato@dinostore.com</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">NEWSLETTER</h4>
          <form className="flex">
            <input
              type="email"
              placeholder="E-mail"
              className="w-full px-3 py-2 bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none"
            />
            <button
              type="submit"
              className="ml-2 px-4 bg-zinc-700 hover:bg-zinc-600 text-white"
            >
              ✉️
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 py-4 text-center lg:text-right text-xs text-zinc-500 px-4 border-t border-zinc-800">
        <h5>© {new Date().getFullYear()} Dino Store. Todos os direitos reservados.</h5>
      </div>
    </footer>
  )
}
