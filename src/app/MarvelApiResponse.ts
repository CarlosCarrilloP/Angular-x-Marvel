import { Character, Character2 } from "./character";

export interface MarvelApiResponse {
  data: {
    results: Character[];
    total: number;
  };
}

export interface MarvelApiResponse2 {
  code: number;
  status: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Character2[];
  };
}

