'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type User = {
  id: number
  name: string
}

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase.from('users').select('*')
      if (error) {
        console.error('Erreur Supabase :', error)
      } else {
        setUsers(data || [])
      }
    }

    fetchUsers()
  }, [])

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Liste des utilisateurs</h1>
      {users.length === 0 ? (
        <p>Aucun utilisateur trouvé.</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u.id}>{u.name}</li>
          ))}
        </ul>
      )}
    </main>
  )
}

