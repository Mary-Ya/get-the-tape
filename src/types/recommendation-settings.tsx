
export interface IRecommendationSettings {
    market: string,
    limit: number,
  
    seed_genres?: Array<string>,
    
    min_tempo?: number,
    max_tempo?: number,
    target_tempo?: number,
  }