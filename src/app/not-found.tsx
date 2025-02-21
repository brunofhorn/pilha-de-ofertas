/* eslint-disable @next/next/no-html-link-for-pages */
export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-4">Oops! Página não encontrada</p>
                <a href="/" className="text-blue-500 hover:text-blue-700 underline">
                    Voltar para Home
                </a>
            </div>
        </div>
    );
}