export interface record {
    id: number,
    created_at: Date,
    updated_at: Date,
    user_name: string,
    streak: number,
    max_len: number,
}

export interface gameStats {
    fieldTile: string,
    history: string[],
    streak: number,
    longest: string[],
    playerTiles: string[]
}