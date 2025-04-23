'use client'
import { useEffect, useState, useRef, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    checkUser()
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      subscription.unsubscribe()
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase()
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              MonApp
            </Link>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="relative" ref={modalRef}>
                <button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  {getInitials(user.email || '')}
                </button>

                {isModalOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                      <ProfileContent 
                        user={user} 
                        onClose={() => setIsModalOpen(false)}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                href="/login"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

function ProfileContent({ user, onClose }: { user: User, onClose: () => void }) {
  const [profile, setProfile] = useState({
    firstname: '',
    lastname: '',
    description: '',
    date_of_birth: '',
    broadcasting: false,
    level: 1
  })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Utilisation de useCallback pour fetchProfile
  const fetchProfile = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error
      if (data) setProfile(data)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }, [user.id])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  if (loading) {
    return <div className="p-6">Chargement...</div>
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Mon Profil</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <form onSubmit={async (e) => {
        e.preventDefault()
        try {
          const { error } = await supabase
            .from('profiles')
            .upsert({
              id: user.id,
              ...profile,
              updated_at: new Date().toISOString()
            })

          if (error) throw error
          alert('Profil mis à jour!')
        } catch (error) {
          console.error('Erreur:', error)
        }
      }} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            type="text"
            value={profile.firstname}
            onChange={e => setProfile({...profile, firstname: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* ... autres champs du formulaire ... */}

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Mettre à jour
          </button>
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut()
              onClose()
              router.push('/')
            }}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Déconnexion
          </button>
        </div>
      </form>
    </div>
  )
}