
export interface ApiResponse {
  code: number;
  status: string;
  data: {
    total: number;
    results: {
      series: any;
      id: number;
      name: string;
      comics: {
        items: any; available: number 
};
      thumbnail: { path: string; extension: string };
      description: string;
    }[];
  };
}

export interface ApiResponse2{
  data: {
    results: {
      title: string;
      thumbnail: {
        path: string;
        extension: string;
      };
    }[];
  };
}