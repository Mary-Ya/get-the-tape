
export interface IRecommendationSettings {
  market: string,
  // limit: number,

  seed_genres?: string | null,
  seed_tracks?: string | null,
  seed_artists?: string | null,
  
  min_tempo?: number | null,
  max_tempo?: number | null,
  target_tempo?: number | null,
  
  min_instrumentalness?: number | null,
  max_instrumentalness?: number | null,
  target_instrumentalness?: number | null,
  
  min_popularity?: number | null,
  max_popularity?: number | null,
  target_popularity?: number | null,
}

export interface IPossibleSettings {
  market?: string
  seed_genres?: string
  seed_tracks?: string
  seed_artists?: string
  min_tempo?: number
  max_tempo?: number
  min_instrumentalness?: number
  max_instrumentalness?: number
  min_popularity?: number
  max_popularity?: number
}