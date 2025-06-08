import { Header, StatsCards, TripCards } from "components";
import { useLoaderData } from "react-router";
// import { getUser } from "~/appwrite/auth";
import { dashboardStats, user, allTrips } from "~/constants";

const Dashboard = async () => {
const user = useLoaderData();
// const user = await getUser();
// console.log("in dashboard User : ", user);

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
            currentMonthCount={dashboardStats.userJoined.currentMonth}
            lastMonthCount={dashboardStats.userJoined.lastMonth}
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
          {allTrips
            .slice(0, 4)
            .map(({ id, name, imageUrls, itinerary, tags, estimatedPrice }) => (
              // @ts-ignore
              <TripCards
                key={id}
                // @ts-ignore
                id={id.toString()}
                name={name}
                imageUrl={imageUrls[0]}
                location={itinerary?.[0]?.location ?? ""}
                tags={tags}
                price={estimatedPrice}
              />
            ))}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
