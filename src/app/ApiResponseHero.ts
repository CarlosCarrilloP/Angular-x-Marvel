interface Hero {
  id: number;
  name: string;
  thumbnail: string;
}

interface ApiResponseHero {
  data: {
    results: {
      id: number;
      name: string;
      thumbnail: {
        path: string;
        extension: string;
      };
    }
  }
};