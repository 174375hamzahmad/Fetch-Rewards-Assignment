export interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

export interface DogSearch {
    breeds?: string[];
    zipCodes?: string[];
    ageMin?: number;
    ageMax?: number;
    size?: number;
    from?: string;
    sort?: string;
}

export interface DogSearchResponse {
    resultIds: string[];
    total: number;
    next?: string;
    prev?: string;
  }

 export interface MatchResponse {
    match: string
}