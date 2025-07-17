import logo from '../assets/logowhite.png';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-purple-900 to-purple-800 text-white mt-8">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:flex sm:items-center sm:justify-between">
                <a href="#" className="flex items-center space-x-3">
                    <img src={logo} className="h-10" alt="Logo Lorrayne" />
                </a>
                <p className="text-sm text-white/80 mt-4 sm:mt-0 text-center sm:text-right">
                    © 2025{' '}
                    <a
                        href="#"
                        className="hover:text-white underline transition"
                    >
                        Lorrayne Amorim
                    </a>{' '}
                    – Todos os direitos reservados.
                </p>
            </div>
            <hr className="border-white/20" />
        </footer>
    );
}
