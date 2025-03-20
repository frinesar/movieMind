import { ICast } from "../types/ICredits";
import { ITrendingPerson } from "../types/ITrendingPeople";

function PersonCard({ person }: { person: ICast | ITrendingPerson }) {
  const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE;

  return (
    <div className="rounded-xl max-w-[185px] hover:ring-2 ring-accent ring-0 transition-all group overflow-hidden shadow shrink-0 grow-0 snap-start">
      <div className="flex justify-center p-2.5 bg-itemBackground dark:bg-itemBackgroundDark">
        <div
          className="relative bg-itemBackground dark:bg-itemBackgroundDark h-36 aspect-[3/4] rounded-full"
          style={{
            backgroundImage: person.profile_path
              ? `url(${IMAGE_URL}/w185/${person.profile_path})`
              : "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg",

            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
      </div>
      <div className="bg-itemBackground dark:bg-itemBackgroundDark rounded-b-xl px-2.5 py-1 relative z-20 text-center">
        <p className="font-medium line-clamp-1">{person.name}</p>
        <p className="text-mainSecondary dark:text-mainSecondaryDark text-xs line-clamp-1 ">
          {"character" in person && person.character}
          {"job" in person && person.job}
        </p>
      </div>
    </div>
  );
}

export default PersonCard;
