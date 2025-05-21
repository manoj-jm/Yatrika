import { Link, useLocation } from "react-router";
import {
  ChipDirective,
  ChipListComponent,
  ChipsDirective,
} from "@syncfusion/ej2-react-buttons";
import { cn, getFirstWord } from "~/lib/utils";

const TripCards = ({
  id,
  name,
  imageUrl,
  location,
  tags,
  price,
}: TripCardProps) => {
  const path = useLocation();
  return (
    // @ts-ignore
    <Link
      to={
        path.pathname === "/" || path.pathname.startsWith("/travel")
          ? `/travel/${id}`
          : `/trips/${id}`
      }
      className="trip-card"
    >
      <img src={imageUrl} alt={name} />
      <article>
        <h2>{name}</h2>
        <figure>
          <img
            src="/assets/icons/location-mark.svg"
            alt="location-mark"
            className="size-4"
          />
          <figcaption>{location}</figcaption>
        </figure>
      </article>

      <div className="mt-5 pl-[18px] pr-3.5 pb-5">
        <ChipListComponent>
          <ChipsDirective>
            {tags.map((tag, id) => (
              <ChipDirective
                key={id}
                text={getFirstWord(tag)}
                cssClass={cn(
                  id === 1
                    ? `!bg-pink-50 !text-pink-500`
                    : `!bg-success-50 !text-success-700`
                )}
              />
            ))}
          </ChipsDirective>
        </ChipListComponent>
      </div>
      <article className="tripCard-pill">{price}</article>
    </Link>
  );
};

export default TripCards;
