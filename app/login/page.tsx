'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetMode, setResetMode] = useState(false)  // Pour basculer entre login et reset
  const router = useRouter()

  // Fonction pour la connexion normale
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      router.push('/profile')
    }
    setLoading(false)
  }

  // Nouvelle fonction pour réinitialiser le mot de passe
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Vérifiez votre email pour réinitialiser votre mot de passe')
      setResetMode(false)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-bold">
          {resetMode ? 'Réinitialiser le mot de passe' : 'Connexion'}
        </h2>
        
        <form className="mt-8 space-y-6" onSubmit={resetMode ? handleResetPassword : handleLogin}>
          <div>
            <label>Email</label>
            <input
              type="email"
              required
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Afficher le champ mot de passe uniquement en mode connexion */}
          {!resetMode && (
            <div>
              <label>Mot de passe</label>
              <input
                type="password"
                required
                className="w-full p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {loading 
              ? 'Chargement...' 
              : resetMode 
                ? 'Envoyer le lien de réinitialisation'
                : 'Se connecter'
            }
          </button>

          {/* Bouton pour basculer entre les modes */}
          <button
            type="button"
            onClick={() => setResetMode(!resetMode)}
            className="w-full text-blue-500 hover:text-blue-600"
          >
            {resetMode 
              ? 'Retour à la connexion' 
              : 'Mot de passe oublié ?'
            }
          </button>

          <Link href="/signup" className="block text-center text-blue-500 hover:text-blue-600">
            Pas de compte ? S&apos;inscrire
          </Link>
        </form>
      </div>
    </div>
  )
}