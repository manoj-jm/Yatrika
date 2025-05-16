import { Header, StatsCards, TripCards } from "components"

const Dashboard = () => {
  const user = {name : "Manoj"}
  const dashboardStats = {
    totalUsers:1230,
    userJoined : { currentMonth : 448, lastMonth : 782},
    totalTrips : 27,
    tripsCreated : {currentMonth : 12 , lastMonth : 15},
    userRole : {total : 62 , currentMonth : 25 , lastMonth : 15}
  }

  // dumy trips data 
    const allTrips = [{
      id: 1,
      name: "Tropical Rewind",
      imageUrls: ["/assets/images/sample1.jpg"],
      itinerary: [{ location: "Thailand" }],
      tags: ["Adventure", "Culture"],
      travelStyle: "Solo",
      estimatedPrice: "$1,000",
    },
    {
      id: 2,
      name: "French Reverie",
      imageUrls: ["/assets/images/sample2.jpg"],
      itinerary: [{ location: "Paris" }],
      tags: ["Relaxation", "Culinary"],
      travelStyle: "Family",
      estimatedPrice: "$2,000",
    },
    {
      id: 3,
      name: "Zen Break",
      imageUrls: ["/assets/images/sample3.jpg"],
      itinerary: [{ location: "Japan" }],
      tags: ["Shopping", "Luxury"],
      travelStyle: "Couple",
      estimatedPrice: "$3,000",
    },
    {
      id: 4,
      name: "Adventure in Westeros",
      imageUrls: ["/assets/images/sample4.jpg"],
      itinerary: [{ location: "Croatia" }],
      tags: ["Historical", "Culture"],
      travelStyle: "Friends",
      estimatedPrice: "$4,000",
    },
    ];

  
  return (
    <main className="dashboard wrapper">
      <Header 
      // @ts-ignore
      title={`Welcome ${user?.name ?? 'user'} 👋`}
      description = "Track activities , trends and popular destination"
      />

      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

          <StatsCards 
          headerTitle="Total Users" 
          total={dashboardStats.totalUsers}
          currentMonthCount={dashboardStats.userJoined.currentMonth }
          lastMonthCount={dashboardStats.userJoined.lastMonth}
          />
          <StatsCards 
          headerTitle="Total Trips" 
          total={dashboardStats.totalTrips}
          currentMonthCount={dashboardStats.tripsCreated.currentMonth }
          lastMonthCount={dashboardStats.tripsCreated.lastMonth}
          />
          <StatsCards 
          headerTitle="Active Users" 
          total={dashboardStats.userRole.total}
          currentMonthCount={dashboardStats.userRole.currentMonth }
          lastMonthCount={dashboardStats.userRole.lastMonth}
          />
        </div>
      </section>

      {/* for trip section  */}
      <TripCards  
      
      />

    </main>
  )
}

export default Dashboard
