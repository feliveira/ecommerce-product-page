export default function Navbar() {
    return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-zinc-900/70 border-b border-zinc-800 shadow-sm">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-center md:justify-between">
            <span className="text-xl font-bold text-zinc-50">Dino Store</span>
            <ul className="flex space-x-6 text-sm text-zinc-300">
            <li><a href="#">Início</a></li>
            <li><a href="#">Camisetas</a></li>
            <li><a href="#">Sobre</a></li>
            <li><a href="#">Contato</a></li>
            </ul>
        </nav>
    </header>
    )
}