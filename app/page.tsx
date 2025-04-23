import MainLayout from './layouts/MainLayout'

export default function Home() {
  return (
    <MainLayout>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Bienvenue sur MonApp
        </h1>
        
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">
            Une application moderne pour gérer vos projets
          </p>
        </div>
      </main>
    </MainLayout>
  )
}