import { GenreEnum } from "../constants/Genres";

const genreMap = new Map<number, string>(
  Object.keys(GenreEnum)
    .filter((key) => isNaN(Number(key)))
    .map((key) => [GenreEnum[key as keyof typeof GenreEnum], key])
);

export function getGenreById(id: number): string | undefined {
  return genreMap.get(id);
}
