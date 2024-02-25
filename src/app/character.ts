export interface Character {
  id: number;
  name: string;
  comics: number;
  series: number;
  thumbnail: string;
  description: string;
}

export interface Character2 {

    id: number;
    name: string;
    comics: {
      available: number;
      collectionURI: string;
      items: { resourceURI: string; name: string }[];
      returned: number;
    };
    series: {
      available: number;
      collectionURI: string;
      items: { resourceURI: string; name: string }[];
      returned: number;
    };
    thumbnail: {
      path: string;
      extension: string;
    };
    description: string;
  }
  

