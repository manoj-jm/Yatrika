import { Header, StatsCards, TripCards } from "components";
import { getAllUsers, getUser } from "~/appwrite/auth";
import type { Route } from "./+types/dashboard";
import {
  getTripsCreatedPerDay,
  getUserGrowthPerDay,
  getUsersAndTripsStats,
} from "~/appwrite/dashboard";
import { getAllTrips } from "~/appwrite/trips";
import { parseTripData } from "~/lib/utils";
import {
  Category,
  ChartComponent,
  ColumnDirective,
  ColumnsDirective,
  ColumnSeries,
  DataLabel,
  Inject,
  SeriesCollectionDirective,
  SeriesDirective,
  SplineAreaSeries,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import { tripXAxis, tripyAxis, userXAxis, useryAxis } from "~/constants";
import { GridComponent } from "@syncfusion/ej2-react-grids";

export const clientLoader = async () => {
  const [
    user,
    dashboardStats,
    trips,
    userGrowth,
    tripsByTravelStyle,
    allUsers,
  ] = await Promise.all([
    await getUser(),
    await getUsersAndTripsStats(),
    await getAllTrips(4, 0),
    await getUserGrowthPerDay(),
    await getTripsCreatedPerDay(),
    await getAllUsers(4, 0),
  ]);

  const allTrips = trips.allTrips.map(({ $id, tripdetail, imageUrl }) => ({
    id: $id,
    ...parseTripData(tripdetail),
    imageUrls: imageUrl ?? [],
  }));

  const mappedUsers: UsersItineraryCount[] = allUsers.users.map((user) => ({
    imageUrl: user.imageUrl,
    name: user.name,
    count: user.itineraryCount ?? Math.floor(Math.random() * 10),
  }));

  return {
    user,
    dashboardStats,
    allTrips,
    userGrowth,
    tripsByTravelStyle,
    allUsers: mappedUsers,
  };
};

const Dashboard = ({ loaderData }: Route.ComponentProps) => {
  const user = loaderData.user as User | null;
  const { dashboardStats, allTrips, userGrowth, tripsByTravelStyle, allUsers } =
    loaderData;

  const trips = allTrips.map((trip) => ({
    imageUrl: trip.imageUrls,
    name: trip.name,
    interest: trip.interests,
  }));
  const usersAndTrips = [
    {
      title: "Latest user signups",
      dataSource: allUsers,
      field: "count",
      headerText: "Trips Created",
    },
    {
      title: "Trips based on interests",
      dataSource: trips,
      field: "count",
      headerText: "Trips Created",
    },
  ];

  return (
    <main className="dashboard wrapper">
      <Header
        // @ts-ignore
        title={`Welcome ${user?.name ?? "user"} 👋`}
        description="Track activities , trends and popular destination"
      />

      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <StatsCards
            headerTitle="Total Users"
            total={dashboardStats.totalUsers}
            currentMonthCount={dashboardStats.usersJoined.currentMonth}
            lastMonthCount={dashboardStats.usersJoined.lastMonth}
          />
          <StatsCards
            headerTitle="Total Trips"
            total={dashboardStats.totalTrips}
            currentMonthCount={dashboardStats.tripsCreated.currentMonth}
            lastMonthCount={dashboardStats.tripsCreated.lastMonth}
          />
          <StatsCards
            headerTitle="Active Users"
            total={dashboardStats.userRole.total}
            currentMonthCount={dashboardStats.userRole.currentMonth}
            lastMonthCount={dashboardStats.userRole.lastMonth}
          />
        </div>
      </section>

      {/* for trip section  */}

      <section className="container">
        <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>
        <div className="trip-grid">
          {allTrips.map((trip) => (
            // @ts-ignore
            <TripCards
              key={trip.id}
              // @ts-ignore
              id={trip.id.toString()}
              name={trip.name!}
              imageUrl={trip.imageUrls[0]}
              location={trip.itinerary?.[0]?.location ?? ""}
              tags={[trip.interests!, trip.travelStyle!]}
              price={trip.estimatedPrice!}
            />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartComponent
          id="chat-1"
          primaryXAxis={userXAxis}
          primaryYAxis={useryAxis}
          title="User Growth"
          tooltip={{ enable: true }}
        >
          <Inject
            services={[
              ColumnSeries,
              SplineAreaSeries,
              Category,
              DataLabel,
              Tooltip,
            ]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={userGrowth}
              xName="day"
              yName="count"
              type="Column"
              name="Column"
              columnWidth={0.3}
              cornerRadius={{ topLeft: 10, topRight: 10 }}
            />
            <SeriesDirective
              dataSource={userGrowth}
              xName="day"
              yName="count"
              type="SplineArea"
              name="Wave"
              fill="rgba(71,132,238,0.3)"
              border={{ width: 2, color: "#4784EE" }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
        {/* chart-2 */}
        <ChartComponent
          id="chat-2"
          primaryXAxis={tripXAxis}
          primaryYAxis={tripyAxis}
          title="Trip Trends"
          tooltip={{ enable: true }}
        >
          <Inject
            services={[
              ColumnSeries,
              SplineAreaSeries,
              Category,
              DataLabel,
              Tooltip,
            ]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={tripsByTravelStyle}
              xName="travelStyle" // ✅ fixed key
              yName="count"
              type="Column"
              name="day"
              columnWidth={0.3}
              cornerRadius={{ topLeft: 10, topRight: 10 }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </section>

      <section className="user-trip wrapper">
        {usersAndTrips.map(({ title, dataSource, field, headerText }, i) => (
          <div key={i} className="flex flex-col gap-5">
            <h3 className="p-20-semibold text-dark-100">{title}</h3>
            <GridComponent dataSource={dataSource} gridLines="None">
              <ColumnsDirective>
                <ColumnDirective
                  //@ts-ignore
                  field={field}
                  headerText="Name"
                  width="200"
                  textAlign="Left"
                  template={(props: UserData) => (
                    <div className="flex items-center gap-1.5 px-4">
                      <img
                        src={props.imageUrl}
                        alt="user"
                        className="rounded-full size-8 aspect-square"
                        referrerPolicy="no-referrer"
                      />
                      <span>{props.name}</span>
                    </div>
                  )}
                />

                <ColumnDirective
                  //@ts-ignore
                  field={field}
                  headerText={headerText}
                  width="150"
                  textAlign="Left"
                />
              </ColumnsDirective>
            </GridComponent>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Dashboard;
