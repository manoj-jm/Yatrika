import type { LoaderFunctionArgs } from "react-router";
import { getAllTrips, getTripById } from "~/appwrite/trips";
import type { Route } from "./+types/trip-detail";
import { cn, parseTripData } from "~/lib/utils";
import { Header, InfoPill, TripCards } from "components";
import {
  ChipDirective,
  ChipListComponent,
  ChipsDirective,
} from "@syncfusion/ej2-react-buttons";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { tripId } = params;

  if (!tripId) throw new Error("Trip Id is required");
  // optimizaiton : parallel fetching
  const [trip, trips] = await Promise.all([
    //@ts-ignore
    getTripById(tripId),
    getAllTrips(4, 0),
  ]);

  return {
    trip,
    allTrips: trips.allTrips.map(({ $id, tripdetail, imageUrl }) => ({
      id: $id,
      ...parseTripData(tripdetail),
      imageUrls: imageUrl ?? [],
    })),
  };
};

const TripDetail = ({ loaderData }: Route.ComponentProps) => {
  const imageUrls = loaderData?.trip?.imageUrl || [];

  const tripData = parseTripData(loaderData?.trip?.tripdetail);
  const {
    bestTimeToVisit,
    budget,
    country,
    description,
    duration,
    estimatedPrice,
    groupType,
    interests,
    itinerary,
    location,
    name,
    travelStyle,
    weatherInfo,
  } = tripData || {};

  const allTrips = loaderData.allTrips as Trip[] | [];
  console.log("trip 0 :  ", allTrips[0]);
  const pillItems = [
    { text: travelStyle, bg: "!bg-pink-50 !text-pink-500" },
    { text: groupType, bg: "!bg-primary-50 !text-primary-500" },
    { text: budget, bg: "!bg-success-50 !text-success-700" },
    { text: interests, bg: "!bg-navy-50 !text-navy-500" },
  ];

  const visitTimeAndWeather = [
    { title: "Best time to Visit: ", items: bestTimeToVisit },
    { title: "Weather Info", items: weatherInfo },
  ];

  return (
    <main className="travel-detail wrapper">
      <Header
        title="Trip Details"
        description="View and edit AI-generated travel plans"
      />

      <section className="container wrapper-md">
        <header>
          <h1 className="p-40-semibold text-dark-100">{name}</h1>
          <div className="flex item-center size-4">
            <InfoPill
              text={`${duration} day plan`}
              image="/assets/icons/calendar.svg"
            />
            <InfoPill
              text={
                itinerary
                  ?.slice(0, 5)
                  .map((item) => item.location)
                  .join(", ") || ""
              }
              image="/assets/icons/location-mark.svg"
            />
          </div>
        </header>
        {/* gallery section */}
        <section className="gallery">
          {imageUrls.map((url: string, i: number) => (
            <img
              src={url}
              key={i}
              className={cn(
                "w-full rounded-xl object-cover",
                i == 0
                  ? "md:col-span-2 md:row-span-2 h-[330px]"
                  : "md:row-span-1 h-[150px]"
              )}
            />
          ))}
        </section>
        {/* trip description */}
        <section className="flex gap-3 md:gap-5 items-center flex-wrap">
          <ChipListComponent id="travel-chip">
            <ChipsDirective>
              {pillItems.map((pill, i) => (
                <ChipDirective
                  key={i}
                  text={pill.text}
                  cssClass={`${pill.bg} !text-base !font-medium !px-4`}
                />
              ))}
            </ChipsDirective>
          </ChipListComponent>

          <ul className="flex gap-1 item-center ml-2">
            {Array(5)
              .fill("null")
              .map((_, index) => (
                <li key={index} className="mt-3">
                  <img
                    src="/assets/icons/star.svg"
                    alt="star"
                    className="size-5"
                  />
                </li>
              ))}
            <li>
              <ChipListComponent>
                <ChipsDirective>
                  <ChipDirective
                    text="4/5"
                    cssClass="!bg-yellow-50  !text-yellow-700"
                  />
                </ChipsDirective>
              </ChipListComponent>
            </li>
          </ul>
        </section>
        {/* title */}
        <section className="title">
          <article>
            <h3>
              {duration}-day {country} {travelStyle}
            </h3>
            <p>
              {budget} , {groupType} and {interests}
            </p>
          </article>

          <h2>{estimatedPrice}</h2>
        </section>

        <p className="text-sm md:text-lg font-normal text-dark-400">
          {description}
        </p>

        {/* itinerary section  */}
        <ul className="itinerary">
          {itinerary?.map((dayplan: DayPlan, index: number) => (
            <li key={index}>
              <h3>
                Day {dayplan.day}: {dayplan.location}
              </h3>
              <ul className="mt-2 space-y-2">
                {dayplan.activities.map((activity, index: number) => (
                  <li key={index} className="flex gap-2 items-start">
                    <span className="min-w-[95px] font-semibold text-dark-600 mr-3">
                      {activity.time + " :"}
                    </span>
                    <p className="text-dark-400">{activity.description}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* weather into */}
        {visitTimeAndWeather.map((sec) => (
          <section key={sec.title} className="visit">
            <div>
              <h3>{sec.title}</h3>
              <ul>
                {sec.items?.map((item) => (
                  <li key={item}>
                    <p className="flex-grow">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </section>
      <section className="flex flex-col gap-6">
        <h2 className="p-24-semibold text-dark-100">Popular Trips</h2>
        <div className="trip-grid ">
          {allTrips.map((trip) => (
            <TripCards
              key={trip.id}
              id={trip.id}
              name={trip.name}
              imageUrl={trip.imageUrls[0]}
              location={trip.itinerary?.[0].location ?? "N/A"}
              tags={[trip.interests, trip.travelStyle].filter(
                (tag): tag is string => typeof tag === "string"
              )}
              price={trip.estimatedPrice ?? ""}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default TripDetail;
