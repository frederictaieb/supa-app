'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { UserProfile, ProfileFormData, PROFILE_CONSTRAINTS } from '@/types/supabase'

export default function Profile() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [formData, setFormData] = useState<ProfileFormData>({
    firstname: '',
    lastname: '',
    description: '',
    date_of_birth: '',
    broadcasting: false,
    level: PROFILE_CONSTRAINTS.MIN_LEVEL
  })

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) throw error

        if (data) {
          setProfile(data as UserProfile)
          setFormData({
            firstname: data.firstname || '',
            lastname: data.lastname || '',
            description: data.description || '',
            date_of_birth: data.date_of_birth || '',
            broadcasting: data.broadcasting || false,
            level: data.level || PROFILE_CONSTRAINTS.MIN_LEVEL
          })
        }
      } catch (error) {
        console.error('Erreur:', error)
      } finally {
        setLoading(false)
      }
    }

    getProfile()
  }, [router])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : type === 'number'
        ? parseInt(value)
        : value
    }))
  }

  const updateProfile = async () => {
    try {
      setSaving(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Non authentifié')

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email,
          ...formData,
          updated_at: new Date().toISOString()
        })

      if (error) throw error
      alert('Profil mis à jour!')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
          Profil
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1 p-2 bg-gray-100 rounded">
              {profile?.email}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Prénom
            </label>
            <input
              type="text"
              name="firstname"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.firstname}
              onChange={handleChange}
              minLength={PROFILE_CONSTRAINTS.NAME_MIN_LENGTH}
              maxLength={PROFILE_CONSTRAINTS.NAME_MAX_LENGTH}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom
            </label>
            <input
              type="text"
              name="lastname"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.lastname}
              onChange={handleChange}
              minLength={PROFILE_CONSTRAINTS.NAME_MIN_LENGTH}
              maxLength={PROFILE_CONSTRAINTS.NAME_MAX_LENGTH}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.description}
              onChange={handleChange}
              maxLength={PROFILE_CONSTRAINTS.DESCRIPTION_MAX_LENGTH}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date de naissance
            </label>
            <input
              type="date"
              name="date_of_birth"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.date_of_birth}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="broadcasting"
              id="broadcasting"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={formData.broadcasting}
              onChange={handleChange}
            />
            <label htmlFor="broadcasting" className="ml-2 block text-sm text-gray-900">
              Activer la diffusion
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Niveau
            </label>
            <input
              type="number"
              name="level"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.level}
              onChange={handleChange}
              min={PROFILE_CONSTRAINTS.MIN_LEVEL}
              max={PROFILE_CONSTRAINTS.MAX_LEVEL}
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={updateProfile}
              disabled={saving}
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {saving ? 'Enregistrement...' : 'Mettre à jour'}
            </button>

            <button
              onClick={handleLogout}
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}