import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="shrink-0">
                <Header />
            </header>

            <main className="flex-1 px-4 sm:px-6 lg:px-8">
                {children}
            </main>

            <footer className="shrink-0">
                <Footer />
            </footer>
        </div>
    );
}
