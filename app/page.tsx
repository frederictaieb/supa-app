'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import MainLayout from './layouts/MainLayout'

// Type pour un utilisateur
type UserProfile = {
  id: string
  email: string
  firstname: string
  lastname: string
  description: string
  date_of_birth: string
  broadcasting: boolean
  level: number
}

export default function Home() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('broadcasting', true) // Ne récupère que les utilisateurs qui ont activé la diffusion

      if (error) throw error

      setUsers(data || [])
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Utilisateurs
        </h1>

        {loading ? (
          <div className="text-center">Chargement...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div 
                key={user.id} 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {user.firstname ? user.firstname[0] : 'U'}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      {user.firstname} {user.lastname}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Niveau {user.level}
                    </p>
                  </div>
                </div>

                {user.description && (
                  <p className="mt-4 text-gray-600">
                    {user.description}
                  </p>
                )}

                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                      {new Date(user.date_of_birth).toLocaleDateString()}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      En ligne
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && users.length === 0 && (
          <div className="text-center text-gray-500">
            Aucun utilisateur trouvé
          </div>
        )}
      </main>
    </MainLayout>
  )
}