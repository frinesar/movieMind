export interface ITrendingPeople {
  page: number;
  results: ITrendingPerson[];
  total_pages: number;
  total_results: number;
}

export interface ITrendingPerson {
  id: number;
  name: string;
  original_name: string;
  media_type: string;
  adult: boolean;
  popularity: number;
  gender: number;
  known_for_department: null | string;
  profile_path: null | string;
}
