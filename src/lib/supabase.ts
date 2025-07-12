import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Driver {
  id: string
  driver_id: string
  permanent_number: number
  code: string
  given_name: string
  family_name: string
  date_of_birth: string
  nationality: string
  url: string
  team_id?: string
  created_at: string
  updated_at: string
}

export interface Team {
  id: string
  constructor_id: string
  name: string
  nationality: string
  url: string
  color: string
  created_at: string
  updated_at: string
}

export interface Race {
  id: string
  season: number
  round: number
  race_name: string
  circuit_id: string
  circuit_name: string
  locality: string
  country: string
  date: string
  time?: string
  url: string
  created_at: string
  updated_at: string
}

export interface UserFavorite {
  id: string
  user_id: string
  type: 'driver' | 'team'
  entity_id: string
  created_at: string
}

export interface NewsArticle {
  id: string
  title: string
  description: string
  content: string
  url: string
  image_url?: string
  source: string
  published_at: string
  category: string
  tags: string[]
  created_at: string
}

export interface GalleryImage {
  id: string
  title: string
  description?: string
  url: string
  thumbnail_url: string
  category: string
  tags: string[]
  race_id?: string
  driver_id?: string
  team_id?: string
  created_at: string
}

// Helper functions for database operations
export const db = {
  // Drivers
  async getDrivers() {
    const { data, error } = await supabase
      .from('drivers')
      .select('*')
      .order('family_name')
    
    if (error) throw error
    return data as Driver[]
  },

  async getDriver(driverId: string) {
    const { data, error } = await supabase
      .from('drivers')
      .select('*')
      .eq('driver_id', driverId)
      .single()
    
    if (error) throw error
    return data as Driver
  },

  // Teams
  async getTeams() {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data as Team[]
  },

  async getTeam(teamId: string) {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('constructor_id', teamId)
      .single()
    
    if (error) throw error
    return data as Team
  },

  // Races
  async getRaces(season: number) {
    const { data, error } = await supabase
      .from('races')
      .select('*')
      .eq('season', season)
      .order('round')
    
    if (error) throw error
    return data as Race[]
  },

  async getUpcomingRaces() {
    const { data, error } = await supabase
      .from('races')
      .select('*')
      .gte('date', new Date().toISOString().split('T')[0])
      .order('date')
      .limit(10)
    
    if (error) throw error
    return data as Race[]
  },

  // News
  async getNews(limit = 20) {
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data as NewsArticle[]
  },

  // Gallery
  async getGalleryImages(category?: string, limit = 50) {
    let query = supabase
      .from('gallery_images')
      .select('*')
    
    if (category) {
      query = query.eq('category', category)
    }
    
    const { data, error } = await query
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data as GalleryImage[]
  },

  // User Favorites
  async getUserFavorites(userId: string) {
    const { data, error } = await supabase
      .from('user_favorites')
      .select('*')
      .eq('user_id', userId)
    
    if (error) throw error
    return data as UserFavorite[]
  },

  async addFavorite(userId: string, type: 'driver' | 'team', entityId: string) {
    const { data, error } = await supabase
      .from('user_favorites')
      .insert({
        user_id: userId,
        type,
        entity_id: entityId,
      })
      .select()
      .single()
    
    if (error) throw error
    return data as UserFavorite
  },

  async removeFavorite(userId: string, type: 'driver' | 'team', entityId: string) {
    const { error } = await supabase
      .from('user_favorites')
      .delete()
      .eq('user_id', userId)
      .eq('type', type)
      .eq('entity_id', entityId)
    
    if (error) throw error
  },
}
