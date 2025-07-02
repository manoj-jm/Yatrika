import { Header, TripCards } from "components";
import { useSearchParams, type LoaderFunctionArgs } from "react-router";
import { getAllTrips } from "~/appwrite/trips";
import { parseTripData } from "~/lib/utils";
import type { Route } from "./+types/trips";
import { useState } from "react";
import { PagerComponent } from "@syncfusion/ej2-react-grids";
// import { URL } from "url";.

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const limit = 5;
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const offset = (page - 1) * limit;
  // optimizaiton : parallel fetching
  const { allTrips, total } = await getAllTrips(limit, offset);

  return {
    trips: allTrips.map(({ $id, tripdetail, imageUrl }) => ({
      id: $id,
      ...parseTripData(tripdetail),
      imageUrls: imageUrl ?? [],
    })),
    total,
  };
};

const Trips = ({ loaderData }: Route.ComponentProps) => {
  const trips = loaderData.trips as Trip[] | [];
  const [searchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page") || "1");
  const [currentPage, setCurrentPage] = useState(initialPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.location.search = `?page=${page}`;
  };
  return (
    <main className="all-users wrapper">
      <Header
        //@ts-ignore
        title={`Trips`}
        description="view and edite AI-generator travel plans "
        ctaText="create a trip"
        ctaUrl="./create"
      />
      <section>
        <h1 className="p-24-semibold text-dark-100 m-2">
          Manage Created Trips
        </h1>
        <div className="trip-grid">
          {trips.map((trip) => (
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

        <PagerComponent
          totalRecordsCount={loaderData.total} 
          pageSize={5}
          currentPage={currentPage}
          click={(args) => handlePageChange(args.currentPage)}
          cssClass="!mb-4"
        />
      </section>
    </main>
  );
};

export default Trips;
