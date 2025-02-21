export default function HomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Bem-vindo ao Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Selecione uma opção no menu para começar.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-900">Card {i + 1}</h3>
            <p className="text-gray-500 mt-2">
              Informações relevantes serão exibidas aqui.
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}