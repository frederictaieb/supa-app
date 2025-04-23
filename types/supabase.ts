// types/supabase.ts
export type UserProfile = {
  id: string
  email: string | undefined
  lastname: string
  firstname: string
  description: string
  date_of_birth: string
  broadcasting: boolean
  level: number
  updated_at?: string
}

export type ProfileFormData = {
  firstname: string
  lastname: string
  description: string
  date_of_birth: string
  broadcasting: boolean
  level: number
}

export const PROFILE_CONSTRAINTS = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 500,
  MIN_LEVEL: 1,
  MAX_LEVEL: 100
} as const