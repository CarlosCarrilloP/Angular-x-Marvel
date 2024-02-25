export interface MarvelResponse {
  data: {
    results: {
      id: number;
      name: string;
      thumbnail: {
        extension: string;
        path: string;
      };
    }[];
  };
}
export interface MarvelCharacter {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}